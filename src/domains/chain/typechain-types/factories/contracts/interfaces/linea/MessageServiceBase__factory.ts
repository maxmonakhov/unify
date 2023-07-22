/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  MessageServiceBase,
  MessageServiceBaseInterface,
} from "../../../../contracts/interfaces/linea/MessageServiceBase";

const _abi = [
  {
    inputs: [],
    name: "CallerIsNotMessageService",
    type: "error",
  },
  {
    inputs: [],
    name: "SenderNotAuthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAddressNotAllowed",
    type: "error",
  },
  {
    inputs: [],
    name: "messageService",
    outputs: [
      {
        internalType: "contract IMessageService",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "remoteSender",
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
] as const;

export class MessageServiceBase__factory {
  static readonly abi = _abi;
  static createInterface(): MessageServiceBaseInterface {
    return new utils.Interface(_abi) as MessageServiceBaseInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MessageServiceBase {
    return new Contract(address, _abi, signerOrProvider) as MessageServiceBase;
  }
}