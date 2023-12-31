import { memo, ReactNode, useState } from "react";
import { Button, Details, LogoWithText } from "uikit";
import { Spinner } from "@/uikit/spinner";
import { Status, SystemStatus, UnifyChainClient } from "@/domains/chain/UnifyChainClient";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EtherumIcon, PolygonIcon } from "@/uikit/icons";

type AccountsProps = {};

const Sync = (props: AccountsProps) => {
  const { sdk, safe } = useSafeAppsSDK();
  const [unifyChainClient] = useState(new UnifyChainClient(sdk, safe));

  const addressQuery = useQuery({
    queryKey: ["moduleAddress"],
    queryFn: () => unifyChainClient.getModuleAddress()
  });

  const systemStatusQuery = useQuery({
    queryKey: ["systemStatus", { mainModuleAddress: addressQuery.data }],
    queryFn: () => unifyChainClient.getSystemStatus(addressQuery.data!),
    enabled: typeof addressQuery.data === "string",
    refetchInterval: 2 * 1000
  });

  console.log("--- systemStatusQuery.data", systemStatusQuery.data);

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
      onError: (e) => {
        toast.error("Failed to sync. Please, try again");
        console.error(e);
      },
      onSuccess: () => {
        toast.success("Synchronization transaction sent. Please, wait for updates ~ 8 min", {
          duration: 6000
        });
        systemStatusQuery.refetch();
      }
    });
  };

  return (
    <>
      <LogoWithText className="fixed left-[30px] top-[40px]" />
      <div className="flex flex-1 flex-col items-center justify-center p-12">
        {!systemStatusQuery.data ? (
          <div className="flex flex-col items-center">
            <Spinner />
            <span className="mt-4">Fetching data...</span>
          </div>
        ) : systemStatusQuery.data.status === Status.OutOfSync ? (
          <>
            <h1 className="text-[24px] font-[600]">Out of sync</h1>
            <p className="mt-1 max-w-[600px] text-center">
              Your accounts are not sync. Please, synchronize your accounts.
            </p>
            <Button disabled={syncMutation.isLoading} onClick={handleSync} className="mt-10">
              {syncMutation.isLoading && <Spinner />} Sync
            </Button>
            <Details className="mt-10">
              <Table data={systemStatusQuery.data} />
            </Details>
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
            <Details className="mt-10">
              <Table data={systemStatusQuery.data} />
            </Details>
          </>
        ) : (
          <>
            <h1 className="text-[24px] font-[600]">Synchronized</h1>
            <p className="mt-1 max-w-[600px] text-center">
              Your account has been synced. You don&apos;t need to do anything.
            </p>
            <Details className="mt-10">
              <Table data={systemStatusQuery.data} />
            </Details>
          </>
        )}
      </div>
    </>
  );
};

function shortenAddress(address: string) {
  if (address.length < 5) return address;

  const prefix = address.slice(0, 5);
  const suffix = address.slice(-5);

  return `${prefix}...${suffix}`;
}

type TableProps = { data: SystemStatus };

// eslint-disable-next-line react/display-name
const Table = memo((props: TableProps) => {
  const { data } = props;

  const ethereumOwners = [...data.ethereum.owners];
  ethereumOwners.sort();

  const polygonZKVMOwners = [...data.polygonZKVM.owners];
  polygonZKVMOwners.sort();

  const rowsCount = Math.max(ethereumOwners.length, polygonZKVMOwners.length);

  function getRows() {
    const rows: ReactNode[] = [];

    for (let i = 0; i < rowsCount; i++) {
      const row = (
        <tr key={ethereumOwners[i]}>
          <td className="border border-slate-300  px-8 py-[18px]">
            {ethereumOwners[i] && shortenAddress(ethereumOwners[i])}
          </td>
          <td className="border border-slate-300  px-8 py-[18px]">
            {polygonZKVMOwners[i] && shortenAddress(polygonZKVMOwners[i])}
          </td>
        </tr>
      );

      rows.push(row);
    }

    return rows;
  }

  return (
    <table className="mt-[52px] w-[500px] table-fixed border-collapse border border-slate-400 p-8">
      <thead>
        <tr>
          <th className="items-center border border-slate-300 px-8 py-[18px]">
            <div className="flex items-center gap-1	whitespace-nowrap">
              <EtherumIcon /> Ethereum
            </div>
            <p>Threshold: {data.ethereum.threshold}</p>
          </th>
          <th className="border border-slate-300 px-8 py-[18px]">
            <div className="flex items-center gap-1	 whitespace-nowrap">
              <PolygonIcon /> Polygon zkEVM
            </div>
            <p>Threshold: {data.polygonZKVM.threshold}</p>
          </th>
        </tr>
      </thead>
      <tbody>{getRows()}</tbody>
    </table>
  );
});

export default memo(Sync);
