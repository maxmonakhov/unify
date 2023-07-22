import { memo } from "react";
import { Button } from "uikit";

type OpenAppInGnosisStubProps = {};

const OpenAppInGnosisStub = (props: OpenAppInGnosisStubProps) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      Please, open app through the Gnosis Safe page
      <a className="mt-10" href="https://app.safe.global/welcome">
        <Button>Open Safe</Button>
      </a>
    </div>
  );
};

export default memo(OpenAppInGnosisStub);
