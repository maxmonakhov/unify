import { memo } from "react";
import { Step } from "@/uikit/stepper/Stepper";
import { Button, Label, LogoWithText, Stepper } from "uikit";
import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";
import { EtherumIcon } from "@/uikit/icons";
import { Spinner } from "@/uikit/spinner";

type MainProps = {};

const steps: Step[] = [{ name: "Install Unify module" }, { name: "Polygon ZkVM" }];

const Main = (props: MainProps) => {
  const { sdk, safe } = useSafeAppsSDK();

  return (
    <>
      <LogoWithText className="fixed left-[30px] top-[40px]" />
      <div className="mt-[148px] flex flex-col items-center">
        <Stepper className="max-w-[274px]" activeStepIndex={0} steps={steps} />
        <Label className="mt-[110px]" text="Ethereum" icon={<EtherumIcon />} />
        <h1 className="mt-5 text-[24px] font-[600]">Create Polygon ZkVM account</h1>
        <p className="mt-2 text-center">
          Welcome to Unify. You can install Unify in one click! Welcome to Unify. <br />
          You can install Unify in one click!
        </p>
        <Button className="mt-10">Create account</Button>
      </div>
    </>
  );
};

export default memo(Main);
