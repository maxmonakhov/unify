import { memo, useState } from "react";
import { Button, Details, LogoWithText } from "uikit";
import { Spinner } from "@/uikit/spinner";
import { Status, UnifyChainClient } from "@/domains/chain/UnifyChainClient";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";

type AccountsProps = {};

const Sync = (props: AccountsProps) => {
  const { sdk, safe } = useSafeAppsSDK();
  const [unifyChainClient] = useState(new UnifyChainClient(sdk, safe));

  // const [state, setState] = useState(SystemStatus.OutOfSync);

  const addressQuery = useQuery({
    queryKey: ["moduleAddress"],
    queryFn: () => unifyChainClient.getModuleAddress()
  });

  const systemStatusQuery = useQuery({
    queryKey: ["systemStatus", { mainModuleAddress: addressQuery.data }],
    queryFn: () => unifyChainClient.getSystemStatus(addressQuery.data!),
    enabled: typeof addressQuery.data === "string"
  });

  const syncMutation = useMutation({
    mutationFn: (mainModuleAddress: string) => unifyChainClient.sync(mainModuleAddress)
  });

  const handleSync = async () => {
    const address = addressQuery.data;

    if (typeof address !== "string") {
      toast.error("Can't get the deployed address. Please, reload the page", { duration: 5000 });
      return;
    }

    syncMutation.mutate(address, {
      onError: () => {
        toast.error("Failed to sync. Please, try again");
      },
      onSuccess: () => systemStatusQuery.refetch()
    });
  };

  return (
    <>
      <LogoWithText className="fixed left-[30px] top-[40px]" />
      <div className="flex flex-1 flex-col items-center justify-center">
        {!systemStatusQuery.data ? (
          <Spinner />
        ) : systemStatusQuery.data.status === Status.OutOfSync ? (
          <>
            <h1 className="text-[24px] font-[600]">Out of sync</h1>
            <p className="mt-1">Your accounts are not sync. Please, synchronize your accounts.</p>
            <Button disabled={syncMutation.isLoading} onClick={handleSync} className="mt-10">
              {syncMutation.isLoading && <Spinner />} Sync
            </Button>
          </>
        ) : systemStatusQuery.data.status === Status.Pending ? (
          <>
            <div className="flex-c flex items-center gap-2">
              <Spinner className="h-6 w-6" />
              <h1 className="text-[24px] font-[600]">Pending</h1>
            </div>

            <p className="mt-1 max-w-[600px] text-center">
              Your request has been sent to your sub-accounts. It will take no more than 30 minutes.
            </p>
          </>
        ) : (
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
