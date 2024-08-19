// import { Flex, Skeleton, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { useBoolean } from "react-use";
import { useApiContext } from "@/providers/ApiProvider";
import { FrameSystemAccountInfo } from "@dedot/chaintypes/substrate";
import { Skeleton } from "@/components/ui/skeleton";

interface AccountBalancesProps {
  address: string;
}

export default function AccountBalances({ address }: AccountBalancesProps) {
  const { api, legacy, network, apiReady } = useApiContext();
  const [loading, setLoading] = useBoolean(true);
  const [balance, setBalance] = useState<FrameSystemAccountInfo>();

  useEffect(() => {
    let unsubscribe: any;
    (async () => {
      const client = api || legacy;
      if (!client) {
        return;
      }

      setLoading(true);
      unsubscribe = await client.query.system.account(address, (resp) => {
        setBalance(resp);
        setLoading(false);
      });
    })();

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [api, legacy, address, setLoading]);

  const values = [
    {
      label: "Free Balance",
      amount: balance?.data?.free || 0n,
    },
    // {
    //   label: "Reserved Balance",
    //   amount: balance?.data?.reserved || 0n,
    // },
    // {
    //   label: "Frozen Balance",
    //   amount: balance?.data?.frozen || 0n,
    // },
  ];

  return (
    <div className="m-4">
      {values.map(({ label, amount }) => (
        <div className="flex gap-2" key={label}>
          <p>{label}:</p>
          {apiReady && !loading ? (
            <strong>
              {(
                parseFloat(amount.toString()) / Math.pow(10, network.decimals)
              ).toString()}
              &nbsp;
              {network.symbol}
            </strong>
          ) : (
            <Skeleton className="h-6 min-w-10"></Skeleton>
          )}
        </div>
      ))}
    </div>
  );
}
