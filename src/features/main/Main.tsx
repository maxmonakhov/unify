import { memo } from "react";
import { Step } from "@/uikit/stepper/Stepper";
import { Button, LogoWithText, Stepper } from "uikit";
import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";

type MainProps = {};

const steps: Step[] = [
  { name: "Install Unify module" },
  { name: "Polygon ZkVM" },
  { name: "Polygon ZkVM" },
  { name: "Mantle" }
];

const Main = (props: MainProps) => {
  const { sdk, safe } = useSafeAppsSDK();

  return (
    <>
      <LogoWithText className="pl-[40px] pt-[30px]" />
      <div className="mx-auto mt-[66px] max-w-[760px] px-10">
        <Stepper activeStepIndex={4} steps={steps} />
        <div className="mt-[110px] flex flex-col items-center">
          <h1 className="font-600[] text-[24px]">Create Polygon ZkVM account</h1>
          <p className="mt-2 text-center">
            Welcome to Unify. You can install Unify in one click! Welcome to Unify. You can install
            Unify in one click!
          </p>
          <Button className="mt-10">Create account</Button>
        </div>
      </div>
    </>
  );
};

export default memo(Main);
