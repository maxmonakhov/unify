/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  PZkVMReceiverUnifySafeModule,
  PZkVMReceiverUnifySafeModuleInterface,
} from "../../../contracts/receiverModules/PZkVMReceiverUnifySafeModule";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract GnosisSafe",
        name: "safe_",
        type: "address",
      },
      {
        internalType: "address",
        name: "originSender_",
        type: "address",
      },
      {
        internalType: "address",
        name: "polygonZkEVMBridge_",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "originAddress_",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "originNetwork_",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "data_",
        type: "bytes",
      },
    ],
    name: "onMessageReceived",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "originSender",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "polygonZkEVMBridge",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "safe",
    outputs: [
      {
        internalType: "contract GnosisSafe",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a0604052604051610ca1380380610ca183398101604081905261002291610073565b600080546001600160a01b03199081166001600160a01b03958616179091556001805490911692841692909217909155166080526100c0565b6001600160a01b038116811461007057600080fd5b50565b60008060006060848603121561008857600080fd5b83516100938161005b565b60208501519093506100a48161005b565b60408501519092506100b58161005b565b809150509250925092565b608051610bc06100e16000396000818160ee01526101280152610bc06000f3fe60806040526004361061003f5760003560e01c80631806b5f214610044578063186f0354146100595780632b59241f146100af5780635d43792c146100dc575b600080fd5b6100576100523660046107f5565b610110565b005b34801561006557600080fd5b506000546100869073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b3480156100bb57600080fd5b506001546100869073ffffffffffffffffffffffffffffffffffffffff1681565b3480156100e857600080fd5b506100867f000000000000000000000000000000000000000000000000000000000000000081565b3373ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016146101da576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f6f6e4d65737361676552656365697665643a204e6f7420506f6c79676f6e5a6b60448201527f45564d427269646765000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b60015473ffffffffffffffffffffffffffffffffffffffff84811691161461025e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f6f6e4d65737361676552656365697665643a204e6f742053656e64657200000060448201526064016101d1565b63ffffffff8216156102cc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f6f6e4d65737361676552656365697665643a204e6f742066726f6d204c31000060448201526064016101d1565b600080828060200190518101906102e3919061095f565b915091506102f182826102f8565b5050505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a0e67e2b6040518163ffffffff1660e01b8152600401600060405180830381865afa158015610366573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526103ac91908101906109a6565b905060005b815181101561059b5760008282815181106103ce576103ce6109e3565b602002602001015190506000600190508260001461040d57836103f2600185610a41565b81518110610402576104026109e3565b602002602001015190505b600080546040805173ffffffffffffffffffffffffffffffffffffffff8581166024830152868116604483015260648083018b905283518084039091018152608490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167ff8dc5dd90000000000000000000000000000000000000000000000000000000017905291517f468721a7000000000000000000000000000000000000000000000000000000008152919092169263468721a7926104dd92859291908290600401610a5a565b6020604051808303816000875af11580156104fc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105209190610b29565b610586576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f52656d6f7665206f776e6572206661696c65640000000000000000000000000060448201526064016101d1565b5050808061059390610b52565b9150506103b1565b5060005b835181101561074c5760008482815181106105bc576105bc6109e3565b602090810291909101810151600080546040805173ffffffffffffffffffffffffffffffffffffffff808616602483015260448083018c9052835180840390910181526064909201835295810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f0d582f130000000000000000000000000000000000000000000000000000000017905290517f468721a700000000000000000000000000000000000000000000000000000000815293955093169263468721a79261069092859290918290600401610a5a565b6020604051808303816000875af11580156106af573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106d39190610b29565b610739576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f416464206f776e6572206661696c65640000000000000000000000000000000060448201526064016101d1565b508061074481610b52565b91505061059f565b50505050565b73ffffffffffffffffffffffffffffffffffffffff8116811461077457600080fd5b50565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156107ed576107ed610777565b604052919050565b60008060006060848603121561080a57600080fd5b833561081581610752565b925060208481013563ffffffff8116811461082f57600080fd5b9250604085013567ffffffffffffffff8082111561084c57600080fd5b818701915087601f83011261086057600080fd5b81358181111561087257610872610777565b6108a2847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016107a6565b915080825288848285010111156108b857600080fd5b80848401858401376000848284010152508093505050509250925092565b600082601f8301126108e757600080fd5b8151602067ffffffffffffffff82111561090357610903610777565b8160051b6109128282016107a6565b928352848101820192828101908785111561092c57600080fd5b83870192505b8483101561095457825161094581610752565b82529183019190830190610932565b979650505050505050565b6000806040838503121561097257600080fd5b825167ffffffffffffffff81111561098957600080fd5b610995858286016108d6565b925050602083015190509250929050565b6000602082840312156109b857600080fd5b815167ffffffffffffffff8111156109cf57600080fd5b6109db848285016108d6565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b81810381811115610a5457610a54610a12565b92915050565b73ffffffffffffffffffffffffffffffffffffffff8516815260006020858184015260806040840152845180608085015260005b81811015610aaa5786810183015185820160a001528201610a8e565b50600060a0828601015260a07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505060028310610b1a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b82606083015295945050505050565b600060208284031215610b3b57600080fd5b81518015158114610b4b57600080fd5b9392505050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610b8357610b83610a12565b506001019056fea264697066735822122044d52bdbd6d3b935f43c4cb8fb3885ea00fda86e4eb42793e79c94579f602d1564736f6c63430008130033";

type PZkVMReceiverUnifySafeModuleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PZkVMReceiverUnifySafeModuleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PZkVMReceiverUnifySafeModule__factory extends ContractFactory {
  constructor(...args: PZkVMReceiverUnifySafeModuleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    safe_: PromiseOrValue<string>,
    originSender_: PromiseOrValue<string>,
    polygonZkEVMBridge_: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<PZkVMReceiverUnifySafeModule> {
    return super.deploy(
      safe_,
      originSender_,
      polygonZkEVMBridge_,
      overrides || {}
    ) as Promise<PZkVMReceiverUnifySafeModule>;
  }
  override getDeployTransaction(
    safe_: PromiseOrValue<string>,
    originSender_: PromiseOrValue<string>,
    polygonZkEVMBridge_: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      safe_,
      originSender_,
      polygonZkEVMBridge_,
      overrides || {}
    );
  }
  override attach(address: string): PZkVMReceiverUnifySafeModule {
    return super.attach(address) as PZkVMReceiverUnifySafeModule;
  }
  override connect(signer: Signer): PZkVMReceiverUnifySafeModule__factory {
    return super.connect(signer) as PZkVMReceiverUnifySafeModule__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PZkVMReceiverUnifySafeModuleInterface {
    return new utils.Interface(_abi) as PZkVMReceiverUnifySafeModuleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PZkVMReceiverUnifySafeModule {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as PZkVMReceiverUnifySafeModule;
  }
}