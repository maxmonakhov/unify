/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  StorageAccessible,
  StorageAccessibleInterface,
} from "../../../../../@gnosis.pm/safe-contracts/contracts/common/StorageAccessible";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offset",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "getStorageAt",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "targetContract",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "calldataPayload",
        type: "bytes",
      },
    ],
    name: "simulateAndRevert",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610390806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80635624b25b1461003b578063b4faba0914610064575b600080fd5b61004e610049366004610124565b610079565b60405161005b9190610146565b60405180910390f35b6100776100723660046101e1565b610101565b005b6060600061008883602061030b565b67ffffffffffffffff8111156100a0576100a06101b2565b6040519080825280601f01601f1916602001820160405280156100ca576020820181803683370190505b50905060005b838110156100f75784810154602080830284010152806100ef81610322565b9150506100d0565b5090505b92915050565b600080825160208401855af480600052503d6020523d600060403e60403d016000fd5b6000806040838503121561013757600080fd5b50508035926020909101359150565b600060208083528351808285015260005b8181101561017357858101830151858201604001528201610157565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080604083850312156101f457600080fd5b823573ffffffffffffffffffffffffffffffffffffffff8116811461021857600080fd5b9150602083013567ffffffffffffffff8082111561023557600080fd5b818501915085601f83011261024957600080fd5b81358181111561025b5761025b6101b2565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019083821181831017156102a1576102a16101b2565b816040528281528860208487010111156102ba57600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b80820281158282048414176100fb576100fb6102dc565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610353576103536102dc565b506001019056fea2646970667358221220ee089a46c0d9a6057c9ee797999ccce2040d45f823eb26f215d9ae48b2af225064736f6c63430008130033";

type StorageAccessibleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StorageAccessibleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StorageAccessible__factory extends ContractFactory {
  constructor(...args: StorageAccessibleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<StorageAccessible> {
    return super.deploy(overrides || {}) as Promise<StorageAccessible>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): StorageAccessible {
    return super.attach(address) as StorageAccessible;
  }
  override connect(signer: Signer): StorageAccessible__factory {
    return super.connect(signer) as StorageAccessible__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StorageAccessibleInterface {
    return new utils.Interface(_abi) as StorageAccessibleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StorageAccessible {
    return new Contract(address, _abi, signerOrProvider) as StorageAccessible;
  }
}
