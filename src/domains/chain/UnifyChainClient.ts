import SafeAppsSDK from "@safe-global/safe-apps-sdk";

import Safe, { EthersAdapter, getCreateCallContract } from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import { GelatoRelay, TransactionStatusResponse } from "@gelatonetwork/relay-sdk";
import { GnosisSafe__factory, IPolygonZkEVMBridge__factory, MainUnifySafeModule__factory, PZkVMReceiverUnifySafeModule__factory, UniversalFactory__factory } from "./typechain-types";
import { SafeAppProvider } from "@safe-global/safe-apps-provider";
import { SafeInfo } from "@safe-global/safe-apps-sdk";
import { CreateCall__factory } from "./typechain-types/factories/@gnosis.pm/safe-contracts/contracts/libraries";
import axios from "axios";

const POLYGONZK_RPC = "https://rpc.public.zkevm-test.net";
const ETHEREUM_RPC = "https://rpc.ankr.com/eth_goerli";
const POLYGONZK_FACTORY = "0x5147DaEbF0b779927c51c2527112A69d53cBCD67";
const GELATO_RELAY_PZKEVM_KEY = "ZDw0hoNePTDvLNnastgVmz5iXYDiLjQEyJqWMT07vjE_"; //TODO: to env
const POLYGONZK_BRIDGE = "0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7";

interface PolygonBridgeResponse {
  deposits: Deposit[]
  total_cnt: string
}

export interface Deposit {
  leaf_type: number
  orig_net: number
  orig_addr: string
  amount: string
  dest_net: number
  dest_addr: string
  block_num: string
  deposit_cnt: string
  network_id: number
  tx_hash: string
  claim_tx_hash: string
  metadata: string
  ready_for_claim: boolean
}


enum TaskState {
  CheckPending = "CheckPending",
  ExecPending = "ExecPending",
  ExecSuccess = "ExecSuccess",
  ExecReverted = "ExecReverted",
  WaitingForConfirmation = "WaitingForConfirmation",
  Blacklisted = "Blacklisted",
  Cancelled = "Cancelled",
  NotFound = "NotFound"
}

type Info = {
  safeAddress: string;
  owners: string[];
  threshold: number;
  module: string;
}

type SystemStatus = {
  status: Status;
  ethereum: Info,
  polygonZKVM: Info,
}

export enum Status {
  OutOfSync,
  Pending,
  Synced,
}

export class UnifyChainClient {
  private polygonZKVMProvider: ethers.providers.JsonRpcProvider;
  private ethProvider: ethers.providers.JsonRpcProvider;
  private gelatoRelay: GelatoRelay;
  private sdk: SafeAppsSDK;
  private safeInfo: SafeInfo;

  constructor(sdk: SafeAppsSDK, safeInfo: SafeInfo) {
    this.polygonZKVMProvider = new ethers.providers.JsonRpcProvider(POLYGONZK_RPC);

    this.ethProvider = new ethers.providers.JsonRpcProvider(ETHEREUM_RPC);

    this.gelatoRelay = new GelatoRelay();

    this.sdk = sdk;
    this.safeInfo = safeInfo;
  }

  public async getModuleAddress(): Promise<string | undefined> {
    const safe = await Safe.create({
      ethAdapter: new EthersAdapter({
        ethers: ethers,
        signerOrProvider: this.ethProvider,
      }),
      safeAddress: this.safeInfo.safeAddress
    });
    const modules = await safe.getModules();

    let moduleAddress = undefined;
    for (const safeModule of modules) {
      try {
        await MainUnifySafeModule__factory.connect(safeModule, this.ethProvider).polygonZkEVMReceiverModule();

        moduleAddress = safeModule;
        if (moduleAddress != undefined && moduleAddress != ethers.constants.AddressZero) {
          break;
        }
      } catch (e) {
        continue;
      }
    }

    return moduleAddress;
  }

  public async getSystemStatus(mainModuleAddress: string): Promise<SystemStatus> {
    const safe = await Safe.create({
      ethAdapter: new EthersAdapter({
        ethers: ethers,
        signerOrProvider: this.ethProvider,
      }),
      safeAddress: this.safeInfo.safeAddress
    });

    const subModuleAddress = await MainUnifySafeModule__factory.connect(mainModuleAddress, this.ethProvider).polygonZkEVMReceiverModule();
    const subAccountAddress = await PZkVMReceiverUnifySafeModule__factory.connect(subModuleAddress, this.polygonZKVMProvider).safe();

    const subAccountSafe = await GnosisSafe__factory.connect(subAccountAddress, this.polygonZKVMProvider);

    const subOwners = await subAccountSafe.getOwners();
    const mainOwners = await safe.getOwners();

    const subThreshold = await subAccountSafe.getThreshold();
    const mainThreshold = await safe.getThreshold();

    const systemStatus: SystemStatus = {
      status: Status.Synced,
      ethereum: {
        safeAddress: this.safeInfo.safeAddress,
        owners: mainOwners,
        threshold: mainThreshold,
        module: mainModuleAddress
      },
      polygonZKVM: {
        safeAddress: subAccountAddress,
        owners: subOwners,
        threshold: subThreshold.toNumber(),
        module: subModuleAddress
      }
    };

    const zkBridgeResponse = await axios.get(`https://bridge-api.public.zkevm-test.net/bridges/${subModuleAddress}`);

    if (zkBridgeResponse.status == 200) {
      const polygonBridgeResponse: PolygonBridgeResponse = zkBridgeResponse.data;

      for (const deposit of polygonBridgeResponse.deposits) {
        if (!deposit.ready_for_claim) {
          continue;
        }

        const proofAxios = await axios.get(`https://bridge-api.public.zkevm-test.net/merkle-proof`, {
          params: { deposit_cnt: deposit.deposit_cnt, net_id: deposit.orig_net },
        });

        const { proof } = proofAxios.data;
        const claimTx = await IPolygonZkEVMBridge__factory.connect(POLYGONZK_BRIDGE, this.polygonZKVMProvider).populateTransaction.claimMessage(
          proof.merkle_proof,
          deposit.deposit_cnt,
          proof.main_exit_root,
          proof.rollup_exit_root,
          deposit.orig_net,
          deposit.orig_addr,
          deposit.dest_net,
          deposit.dest_addr,
          deposit.amount,
          deposit.metadata,
        );

        const pzkEVMRelayResponse = await this.gelatoRelay.sponsoredCall(
          {
            chainId: 1442,
            target: POLYGONZK_BRIDGE,
            data: claimTx.data!
          },
          GELATO_RELAY_PZKEVM_KEY
        );

        await this._waitTask(pzkEVMRelayResponse.taskId);
      }

      if (polygonBridgeResponse.deposits.length > 0) {
        systemStatus.status = Status.Pending;
        return systemStatus;
      }
    }

    if (subOwners.length != mainOwners.length) {
      systemStatus.status = Status.OutOfSync;
    } else if (subThreshold.toNumber() != mainThreshold) {
      systemStatus.status = Status.OutOfSync;
    }

    for (const subOwner of subOwners) {
      if (!mainOwners.includes(subOwner)) {
        systemStatus.status = Status.OutOfSync;
      }
    }

    return systemStatus;
  }

  public async sync(mainModuleAddress: string): Promise<void> {
    const { data } = await MainUnifySafeModule__factory.connect(
      mainModuleAddress,
      this.ethProvider
    ).populateTransaction.upgradeSettings();

    const txs = await this.sdk.txs.send({
      txs: [
        {
          to: mainModuleAddress,
          value: "0",
          data: data!
        }
      ]
    });

    await this._waitSafeTx(txs.safeTxHash);
  }

  public async installModule(subAccountModuleAddress: string): Promise<void> {
    const safe = await Safe.create({
      ethAdapter: new EthersAdapter({
        ethers: ethers,
        signerOrProvider: this.ethProvider,
      }),
      safeAddress: this.safeInfo.safeAddress
    });

    const { data } = new MainUnifySafeModule__factory().getDeployTransaction(this.safeInfo.safeAddress, POLYGONZK_BRIDGE, subAccountModuleAddress)


    const firstTxs = await this.sdk.txs.send({
      txs: [
        {
          to: "0x7cbB62EaA69F79e6873cD1ecB2392971036cFAa4",
          value: "0",
          data: (await CreateCall__factory.connect("0x7cbB62EaA69F79e6873cD1ecB2392971036cFAa4", this.ethProvider).populateTransaction.performCreate(
            "0",
            data!
          )).data!
        }
      ]
    });

    await this._waitSafeTx(firstTxs.safeTxHash);

    const firstTxsInfo = await this.sdk.txs.getBySafeTxHash(firstTxs.safeTxHash);

    console.log(firstTxsInfo);
    const createModuleTx = await this.ethProvider.getTransactionReceipt(firstTxsInfo.txHash!);

    let moduleAddress;
    createModuleTx.logs.map((log) => {
      if (log.topics[0] === MainUnifySafeModule__factory.createInterface().getEventTopic("MainUnifySafeModuleDeployed")) {
        const parsedLog = MainUnifySafeModule__factory.createInterface().parseLog(log);
        moduleAddress = parsedLog.args[0];
      }
    });

    const enableModuleTx = await safe.createEnableModuleTx(moduleAddress!);
    const txs = await this.sdk.txs.send({
      txs: [
        {
          to: enableModuleTx.data.to,
          value: "0",
          data: enableModuleTx.data.data,
        }
      ]
    });

    await this._waitSafeTx(txs.safeTxHash);
  }

  public async createSubAccount(): Promise<{
    subAccountAddress: string;
    subAccountModuleAddress: string;
  }> {
    const safe = await Safe.create({
      ethAdapter: new EthersAdapter({
        ethers: ethers,
        signerOrProvider: this.ethProvider,
      }),
      safeAddress: this.safeInfo.safeAddress
    });

    const { data } = await UniversalFactory__factory.connect(
      POLYGONZK_FACTORY,
      this.ethProvider
    ).populateTransaction.deploy(
      await safe.getAddress(),
      await safe.getOwners(),
      await safe.getThreshold()
    );

    const pzkEVMRelayResponse = await this.gelatoRelay.sponsoredCall(
      {
        chainId: 1442,
        target: POLYGONZK_FACTORY,
        data: data!
      },
      GELATO_RELAY_PZKEVM_KEY
    );

    let subAccountModuleAddress;
    let subAccountAddress;

    const relayerTx = await this._waitTask(pzkEVMRelayResponse.taskId);
    const pzkEVMTx = await this.polygonZKVMProvider.getTransactionReceipt(relayerTx!.transactionHash!);

    const deployedTopic = UniversalFactory__factory.createInterface().getEventTopic("Deployed");
    pzkEVMTx.logs.map((log) => {
      if (log.topics[0] === deployedTopic) {
        const parsedLog = UniversalFactory__factory.createInterface().parseLog(log);

        subAccountAddress = parsedLog.args[0];
        subAccountModuleAddress = parsedLog.args[1];
      }
    });

    return {
      subAccountAddress: subAccountAddress!,
      subAccountModuleAddress: subAccountModuleAddress!
    };
  }

  private async _waitTask(taskId: string): Promise<TransactionStatusResponse> {
    let relayerTx;
    while (true) {
      relayerTx = await this.gelatoRelay.getTaskStatus(taskId);

      const taskStatus = String(relayerTx!.taskState);
      if (taskStatus === TaskState.ExecSuccess || taskStatus === TaskState.WaitingForConfirmation) {
        break;
      } else {
        switch (taskStatus) {
          case TaskState.ExecReverted:
          case TaskState.Blacklisted:
          case TaskState.Cancelled:
          case TaskState.NotFound:
            console.log("Task failed with state: ", relayerTx!.taskState);
            throw new Error("Task failed");
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return relayerTx!;
  }

  private async _waitSafeTx(txHash: string): Promise<void> {
    let tx;

    while (true) {
      try {
        tx = await this.sdk.txs.getBySafeTxHash(txHash);
        switch (tx.txStatus) {
          case "AWAITING_EXECUTION":
            break;
          case "CANCELLED":
          case "FAILED":
            throw new Error("Safe tx failed");
          case "AWAITING_CONFIRMATIONS":
            break;
          case "SUCCESS":
            return;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
      }
    }
  }
}
