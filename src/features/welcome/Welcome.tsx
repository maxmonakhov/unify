import { memo, useEffect, useState } from "react";
import { Button, LogoWithText } from "uikit";
import { Spinner } from "uikit";
import { useRouter } from "next/router";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { UnifyChainClient } from "@/domains/chain/UnifyChainClient";

type WelcomeProps = {};

enum State {
  Loading = "Loading",
  HasAccount = "HasAccount",
  NoAccount = "NoAccount"
}

const Welcome = (props: WelcomeProps) => {
  const { push } = useRouter();

  const { sdk, safe } = useSafeAppsSDK();
  const [unifyChainClient] = useState(new UnifyChainClient(sdk, safe));

  const [state, setState] = useState(State.Loading);

  useEffect(() => {
    async function checkIfUserExists() {
      const result = await unifyChainClient.getModuleAddress();
      console.log("--- await unifyChainClient.getModuleAddress(); result", result);

      if (typeof result === "string") {
        setState(State.HasAccount);
        void push("./sync");
      } else {
        setState(State.NoAccount);
      }
    }

    void checkIfUserExists();
  }, [push, unifyChainClient]);

  // //TODO: remove
  // setTimeout(() => {
  //   void push("./sync");
  // }, 2000);

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <LogoWithText />
      <p className="mt-5 max-w-[600px] text-center">
        Welcome to Unify. Unify will make your existing AA for cross-chain. You can install Unify in one click!
      </p>

      <div className="mt-10">
        {state === State.NoAccount ? (
          <a href="./install">
            <Button>Install Unify</Button>
          </a>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default memo(Welcome);
