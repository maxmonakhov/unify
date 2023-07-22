import { memo, useState } from "react";
import { Button, Details, LogoWithText } from "uikit";
import { Spinner } from "@/uikit/spinner";
import { SystemStatus } from "@/domains/chain/UnifyChainClient";

type AccountsProps = {};

const Sync = (props: AccountsProps) => {
  const [state, setState] = useState(SystemStatus.OutOfSync);

  const handleSync = () => {};

  return (
    <>
      <LogoWithText className="fixed left-[30px] top-[40px]" />
      <div className="flex flex-1 flex-col items-center justify-center">
        {state === SystemStatus.OutOfSync && (
          <>
            <h1 className="text-[24px] font-[600]">Out of sync</h1>
            <p className="mt-1">Your accounts are not sync. Please, synchronize your accounts.</p>
            <Button onClick={handleSync} className="mt-10">
              Sync
            </Button>
          </>
        )}
        {state === SystemStatus.Pending && (
          <>
            <div className="flex-c flex items-center gap-2">
              <Spinner className="h-6 w-6" />
              <h1 className="text-[24px] font-[600]">Pending</h1>
            </div>

            <p className="mt-1 max-w-[600px] text-center">
              Your request has been sent to your sub-accounts. It will take no more than 30 minutes.
            </p>
          </>
        )}
        {state === SystemStatus.Synced && (
          <>
            <h1 className="text-[24px] font-[600]">Synchronized</h1>
            <p className="mt-1">
              Your account has been synced. You don&apos;t have to do anything.
            </p>
            <Details className="mt-10">details here ..</Details>
          </>
        )}
      </div>
    </>
  );
};

export default memo(Sync);
