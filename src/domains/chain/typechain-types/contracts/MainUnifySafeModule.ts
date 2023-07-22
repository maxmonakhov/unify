/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface MainUnifySafeModuleInterface extends utils.Interface {
  functions: {
    "polygonZkEVMBridge()": FunctionFragment;
    "polygonZkEVMReceiverModule()": FunctionFragment;
    "safe()": FunctionFragment;
    "upgradeSettings()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "polygonZkEVMBridge"
      | "polygonZkEVMReceiverModule"
      | "safe"
      | "upgradeSettings"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "polygonZkEVMBridge",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "polygonZkEVMReceiverModule",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "safe", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "upgradeSettings",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "polygonZkEVMBridge",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "polygonZkEVMReceiverModule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "safe", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "upgradeSettings",
    data: BytesLike
  ): Result;

  events: {
    "MainUnifySafeModuleDeployed(address)": EventFragment;
  };

  getEvent(
    nameOrSignatureOrTopic: "MainUnifySafeModuleDeployed"
  ): EventFragment;
}

export interface MainUnifySafeModuleDeployedEventObject {
  thisAddress: string;
}
export type MainUnifySafeModuleDeployedEvent = TypedEvent<
  [string],
  MainUnifySafeModuleDeployedEventObject
>;

export type MainUnifySafeModuleDeployedEventFilter =
  TypedEventFilter<MainUnifySafeModuleDeployedEvent>;

export interface MainUnifySafeModule extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MainUnifySafeModuleInterface;

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
    polygonZkEVMBridge(overrides?: CallOverrides): Promise<[string]>;

    polygonZkEVMReceiverModule(overrides?: CallOverrides): Promise<[string]>;

    safe(overrides?: CallOverrides): Promise<[string]>;

    upgradeSettings(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  polygonZkEVMBridge(overrides?: CallOverrides): Promise<string>;

  polygonZkEVMReceiverModule(overrides?: CallOverrides): Promise<string>;

  safe(overrides?: CallOverrides): Promise<string>;

  upgradeSettings(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    polygonZkEVMBridge(overrides?: CallOverrides): Promise<string>;

    polygonZkEVMReceiverModule(overrides?: CallOverrides): Promise<string>;

    safe(overrides?: CallOverrides): Promise<string>;

    upgradeSettings(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "MainUnifySafeModuleDeployed(address)"(
      thisAddress?: null
    ): MainUnifySafeModuleDeployedEventFilter;
    MainUnifySafeModuleDeployed(
      thisAddress?: null
    ): MainUnifySafeModuleDeployedEventFilter;
  };

  estimateGas: {
    polygonZkEVMBridge(overrides?: CallOverrides): Promise<BigNumber>;

    polygonZkEVMReceiverModule(overrides?: CallOverrides): Promise<BigNumber>;

    safe(overrides?: CallOverrides): Promise<BigNumber>;

    upgradeSettings(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    polygonZkEVMBridge(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    polygonZkEVMReceiverModule(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    safe(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    upgradeSettings(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
