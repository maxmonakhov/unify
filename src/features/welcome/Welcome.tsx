import { memo, useEffect, useState } from "react";
import { Button, LogoWithText } from "uikit";
import { Spinner } from "uikit";
import { useRouter } from "next/router";

type WelcomeProps = {};

enum State {
  Loading = "Loading",
  HasAccount = "HasAccount",
  NoAccount = "NoAccount"
}

const Welcome = (props: WelcomeProps) => {
  const { push } = useRouter();

  const [state, setState] = useState(State.Loading);

  //TODO: remove
  setTimeout(() => {
    void push("./install");
  }, 2000);

  useEffect(() => {
    if (state === State.HasAccount) void push("./sync");
  }, [push, state]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <LogoWithText />
      <p className="mt-5 max-w-[600px] text-center">
        Welcome to Unify. You can install Unify in one click! Welcome to Unify. You can install
        Unify in one click!
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
