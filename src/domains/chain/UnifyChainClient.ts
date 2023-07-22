import SafeAppsSDK from "@safe-global/safe-apps-sdk";

import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import { GelatoRelay } from "@gelatonetwork/relay-sdk";
import { MainUnifySafeModule__factory, UniversalFactory__factory } from "./typechain-types";
import { SafeAppProvider } from "@safe-global/safe-apps-provider";
import { SafeInfo } from "@safe-global/safe-apps-sdk";

const POLYGONZK_RPC = "https://rpc.public.zkevm-test.net";
const ETHEREUM_RPC = "https://rpc.ankr.com/eth_goerli";
const POLYGONZK_FACTORY = "0x7Ea090bd1E7165dCE45FF4510DcbB97EE87038e9";
const GELATO_RELAY_PZKEVM_KEY = "ZDw0hoNePTDvLNnastgVmz5iXYDiLjQEyJqWMT07vjE_"; //TODO: to env
const POLYGONZK_BRIDGE = "0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7";

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

  public async getModuleAddress(safeAddress: string): Promise<string | undefined> {
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
        moduleAddress = await MainUnifySafeModule__factory.connect(safeModule, this.ethProvider).polygonZkEVMReceiverModule();
        if (moduleAddress != undefined && moduleAddress != ethers.constants.AddressZero) {
          return;
        }
      } catch (e) {
        continue;
      }
    }

    return moduleAddress;
  }

  public async installModule(subAccountModuleAddress: string): Promise<void> {
    const safe = await Safe.create({
      ethAdapter: new EthersAdapter({
        ethers: ethers,
        signerOrProvider: this.ethProvider,
      }),
      safeAddress: this.safeInfo.safeAddress
    });

    const data = MainUnifySafeModule__factory.createInterface().encodeDeploy([this.safeInfo.safeAddress, POLYGONZK_BRIDGE, subAccountModuleAddress])

    const createModuleTx = await safe.createTransaction({
      safeTransactionData: {
        to: ethers.constants.AddressZero,
        value: "0",
        data: data,
        operation: 0,
        gasToken: ethers.constants.AddressZero,
        refundReceiver: ethers.constants.AddressZero
      }
    });

    const txs = this.sdk.txs.send({
      txs: [
        {
          to: ethers.constants.AddressZero,
          value: "0",
          data: data
        }
      ]
    });

return;
    const createEnableModuleTx = await safe.createEnableModuleTx(subAccountModuleAddress);

    await safe.signTransaction(createEnableModuleTx);
    await safe.executeTransaction(createEnableModuleTx);
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

    let relayerTx;
    while (true) {
      relayerTx = await this.gelatoRelay.getTaskStatus(pzkEVMRelayResponse.taskId);

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

    let subAccountModuleAddress;
    let subAccountAddress;

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
}
