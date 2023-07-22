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
  LineaReceiverUnifySafeModule,
  LineaReceiverUnifySafeModuleInterface,
} from "../../../contracts/receiverModules/LineaReceiverUnifySafeModule";

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
        name: "lineaBridge_",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "lineaBridge",
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
    inputs: [
      {
        internalType: "address[]",
        name: "newOwners",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "threshold",
        type: "uint256",
      },
    ],
    name: "receiveSettingUpdates",
    outputs: [],
    stateMutability: "nonpayable",
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
  "0x60a0604052604051610c00380380610c0083398101604081905261002291610073565b600080546001600160a01b03199081166001600160a01b03958616179091556001805490911692841692909217909155166080526100c0565b6001600160a01b038116811461007057600080fd5b50565b60008060006060848603121561008857600080fd5b83516100938161005b565b60208501519093506100a48161005b565b60408501519092506100b58161005b565b809150509250925092565b608051610b186100e86000396000818160d40152818161010e01526101e10152610b186000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063186f0354146100515780632b59241f1461009a578063606fe93a146100ba578063e6b8fbf0146100cf575b600080fd5b6000546100719073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b6001546100719073ffffffffffffffffffffffffffffffffffffffff1681565b6100cd6100c836600461076a565b6100f6565b005b6100717f000000000000000000000000000000000000000000000000000000000000000081565b3373ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000161461019a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f4e6f74204d616e746c654272696467650000000000000000000000000000000060448201526064015b60405180910390fd5b600154604080517f67e404ce000000000000000000000000000000000000000000000000000000008152905173ffffffffffffffffffffffffffffffffffffffff928316927f000000000000000000000000000000000000000000000000000000000000000016916367e404ce9160048083019260209291908290030181865afa15801561022c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610250919061080e565b73ffffffffffffffffffffffffffffffffffffffff16146102cd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f4e6f74206f726967696e53656e646572000000000000000000000000000000006044820152606401610191565b61030b838380806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250859250610310915050565b505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a0e67e2b6040518163ffffffff1660e01b8152600401600060405180830381865afa15801561037e573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526103c4919081019061085f565b905060005b81518110156105b35760008282815181106103e6576103e6610942565b6020026020010151905060006001905082600014610425578361040a6001856109a0565b8151811061041a5761041a610942565b602002602001015190505b600080546040805173ffffffffffffffffffffffffffffffffffffffff8581166024830152868116604483015260648083018b905283518084039091018152608490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167ff8dc5dd90000000000000000000000000000000000000000000000000000000017905291517f468721a7000000000000000000000000000000000000000000000000000000008152919092169263468721a7926104f5928592919082906004016109b9565b6020604051808303816000875af1158015610514573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105389190610a88565b61059e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f52656d6f7665206f776e6572206661696c6564000000000000000000000000006044820152606401610191565b505080806105ab90610aaa565b9150506103c9565b5060005b83518110156107645760008482815181106105d4576105d4610942565b602090810291909101810151600080546040805173ffffffffffffffffffffffffffffffffffffffff808616602483015260448083018c9052835180840390910181526064909201835295810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f0d582f130000000000000000000000000000000000000000000000000000000017905290517f468721a700000000000000000000000000000000000000000000000000000000815293955093169263468721a7926106a8928592909182906004016109b9565b6020604051808303816000875af11580156106c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106eb9190610a88565b610751576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f416464206f776e6572206661696c6564000000000000000000000000000000006044820152606401610191565b508061075c81610aaa565b9150506105b7565b50505050565b60008060006040848603121561077f57600080fd5b833567ffffffffffffffff8082111561079757600080fd5b818601915086601f8301126107ab57600080fd5b8135818111156107ba57600080fd5b8760208260051b85010111156107cf57600080fd5b6020928301989097509590910135949350505050565b805173ffffffffffffffffffffffffffffffffffffffff8116811461080957600080fd5b919050565b60006020828403121561082057600080fd5b610829826107e5565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000602080838503121561087257600080fd5b825167ffffffffffffffff8082111561088a57600080fd5b818501915085601f83011261089e57600080fd5b8151818111156108b0576108b0610830565b8060051b6040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0603f830116810181811085821117156108f3576108f3610830565b60405291825284820192508381018501918883111561091157600080fd5b938501935b8285101561093657610927856107e5565b84529385019392850192610916565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b818103818111156109b3576109b3610971565b92915050565b73ffffffffffffffffffffffffffffffffffffffff8516815260006020858184015260806040840152845180608085015260005b81811015610a095786810183015185820160a0015282016109ed565b50600060a0828601015260a07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505060028310610a79577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b82606083015295945050505050565b600060208284031215610a9a57600080fd5b8151801515811461082957600080fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610adb57610adb610971565b506001019056fea2646970667358221220ccaeed0e3e3411868932a36db783981f5f445148f839983bc24010997e9aae0564736f6c63430008130033";

type LineaReceiverUnifySafeModuleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LineaReceiverUnifySafeModuleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LineaReceiverUnifySafeModule__factory extends ContractFactory {
  constructor(...args: LineaReceiverUnifySafeModuleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    safe_: PromiseOrValue<string>,
    originSender_: PromiseOrValue<string>,
    lineaBridge_: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<LineaReceiverUnifySafeModule> {
    return super.deploy(
      safe_,
      originSender_,
      lineaBridge_,
      overrides || {}
    ) as Promise<LineaReceiverUnifySafeModule>;
  }
  override getDeployTransaction(
    safe_: PromiseOrValue<string>,
    originSender_: PromiseOrValue<string>,
    lineaBridge_: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      safe_,
      originSender_,
      lineaBridge_,
      overrides || {}
    );
  }
  override attach(address: string): LineaReceiverUnifySafeModule {
    return super.attach(address) as LineaReceiverUnifySafeModule;
  }
  override connect(signer: Signer): LineaReceiverUnifySafeModule__factory {
    return super.connect(signer) as LineaReceiverUnifySafeModule__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LineaReceiverUnifySafeModuleInterface {
    return new utils.Interface(_abi) as LineaReceiverUnifySafeModuleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LineaReceiverUnifySafeModule {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as LineaReceiverUnifySafeModule;
  }
}
