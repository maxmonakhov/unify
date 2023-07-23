import { memo, useState } from "react";
import { Step } from "uikit";
import { Button, Label, LogoWithText, Stepper } from "uikit";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { EtherumIcon, PolygonIcon } from "@/uikit/icons";
import { UnifyChainClient } from "@/domains/chain/UnifyChainClient";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/uikit/spinner";
import JSConfetti from "js-confetti";

type MainProps = {};

const steps: Step[] = [{ name: "Install Unify module" }, { name: "Polygon zkEVM" }];

const Main = (props: MainProps) => {
  const { sdk, safe } = useSafeAppsSDK();
  const [unifyChainClient] = useState(new UnifyChainClient(sdk, safe));

  const [step, setStep] = useState(0);

  const createSubAccountMutation = useMutation({
    mutationFn: () => unifyChainClient.createSubAccount()
  });

  const installUnifyModuleMutation = useMutation({
    mutationFn: () =>
      unifyChainClient.installModule(createSubAccountMutation.data?.subAccountModuleAddress!)
  });

  const handleCreateSubAccount = () => {
    createSubAccountMutation.mutate(undefined, {
      onError: (e) => {
        toast.error("Some error happened. See console for details");
        console.error(e);
      },
      onSuccess: () => {
        toast.success("Sub account successfully created!");
        setStep(1);
      }
    });
  };

  const handleInstallUnifyModule = () => {
    installUnifyModuleMutation.mutate(undefined, {
      onError: (e) => {
        toast.error("Some error happened. See console for details");
        console.error(e);
      },
      onSuccess: () => {
        const jsConfetti = new JSConfetti();
        setStep(2);

        void jsConfetti.addConfetti({
          emojis: ["🦄"]
        });

        setTimeout(async () => {
          await jsConfetti.addConfetti({
            emojis: ["🦄"]
          });
          setTimeout(() => toast.success("Unify successfully installed!", { duration: 5000 }), 300);
        }, 400);
      }
    });
  };

  return (
    <>
      <LogoWithText className="fixed left-[30px] top-[40px]" />
      <div className="mt-[148px] flex flex-col items-center">
        <Stepper className="max-w-[274px]" activeStepIndex={step} steps={steps} />

        {step === 0 && (
          <>
            <Label className="mt-[110px]" text="Polygon zkEVM" icon={<PolygonIcon />} />
            <h1 className="mt-5 text-[24px] font-[600]">Create Safe account in Polygon zkEVM</h1>
            <p className="mt-2 max-w-[600px] text-center">
              We will create a Sub Account for your Safe in Polygon ZkEVM. It will take no more than
              10 minutes.
            </p>
            <Button
              disabled={createSubAccountMutation.isLoading}
              onClick={handleCreateSubAccount}
              className="mt-10"
            >
              {createSubAccountMutation.isLoading && <Spinner />} Create sub account
            </Button>
          </>
        )}
        {step === 1 && (
          <>
            <Label className="mt-[110px]" text="Ethereum " icon={<EtherumIcon />} />
            <h1 className="mt-5 text-[24px] font-[600]">Install Unify module for Safe</h1>
            <p className="mt-2 max-w-[600px] text-center">
              Now you need to install the module in your Safe to create a link between your
              accounts.
            </p>
            <Button
              disabled={installUnifyModuleMutation.isLoading}
              onClick={handleInstallUnifyModule}
              className="mt-10"
            >
              {installUnifyModuleMutation.isLoading && <Spinner />} Install
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Label className="mt-[110px]" text="Ethereum " icon={<EtherumIcon />} />
            <h1 className="mt-5 text-[24px] font-[600]">Success 🚀</h1>
            <p className="mt-2 max-w-[600px] text-center">
              Your installation has loaded successfully!
            </p>
            <a href="https://app.safe.global/welcome">
              <Button className="mt-10">Finish</Button>
            </a>
          </>
        )}
      </div>
    </>
  );
};

export default memo(Main);
