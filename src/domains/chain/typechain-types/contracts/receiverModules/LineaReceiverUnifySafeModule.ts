/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface LineaReceiverUnifySafeModuleInterface extends utils.Interface {
  functions: {
    "lineaBridge()": FunctionFragment;
    "originSender()": FunctionFragment;
    "receiveSettingUpdates(address[],uint256)": FunctionFragment;
    "safe()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "lineaBridge"
      | "originSender"
      | "receiveSettingUpdates"
      | "safe"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "lineaBridge",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "originSender",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "receiveSettingUpdates",
    values: [PromiseOrValue<string>[], PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "safe", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "lineaBridge",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "originSender",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "receiveSettingUpdates",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "safe", data: BytesLike): Result;

  events: {};
}

export interface LineaReceiverUnifySafeModule extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LineaReceiverUnifySafeModuleInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    lineaBridge(overrides?: CallOverrides): Promise<[string]>;

    originSender(overrides?: CallOverrides): Promise<[string]>;

    receiveSettingUpdates(
      newOwners: PromiseOrValue<string>[],
      threshold: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    safe(overrides?: CallOverrides): Promise<[string]>;
  };

  lineaBridge(overrides?: CallOverrides): Promise<string>;

  originSender(overrides?: CallOverrides): Promise<string>;

  receiveSettingUpdates(
    newOwners: PromiseOrValue<string>[],
    threshold: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  safe(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    lineaBridge(overrides?: CallOverrides): Promise<string>;

    originSender(overrides?: CallOverrides): Promise<string>;

    receiveSettingUpdates(
      newOwners: PromiseOrValue<string>[],
      threshold: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    safe(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    lineaBridge(overrides?: CallOverrides): Promise<BigNumber>;

    originSender(overrides?: CallOverrides): Promise<BigNumber>;

    receiveSettingUpdates(
      newOwners: PromiseOrValue<string>[],
      threshold: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    safe(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    lineaBridge(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    originSender(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    receiveSettingUpdates(
      newOwners: PromiseOrValue<string>[],
      threshold: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    safe(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
