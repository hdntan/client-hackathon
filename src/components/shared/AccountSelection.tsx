// import { Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from "react";
import { InjectedAccount } from "@/types";
// import AccountBalances from '@/components/AccountBalances';
// import CopyAddressButton from '@/components/CopyAddressButton';
// import SignRawMessageButton from '@/components/SignRawMessageButton';
// import TransferBalanceButton from '@/components/TransferBalanceButton';
import useDisplayAddress from "@/hooks/useDisplayAddress";
import { useWalletContext } from "@/providers/WalletProvider";
// import { ChevronDownIcon, ExternalLinkIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDownIcon,
  ExternalLinkIcon,
  PlusSquareIcon,
} from "lucide-react";
import clsx from "clsx";
import AccountBalances from "@/components/AccountBalances";

export default function AccountSelection({
  type = "account",
}: {
  type?: string;
}) {
  const { accounts, injectedApi } = useWalletContext();
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccount>();
  const accountsUpdateAvailable = useMemo(
    () => !!injectedApi?.accounts?.update,
    [injectedApi]
  );
  const displayAddress = useDisplayAddress(selectedAccount?.address);

  useEffect(() => {
    if (
      selectedAccount &&
      accounts.map((one) => one.address).includes(selectedAccount.address)
    ) {
      return;
    }

    setSelectedAccount(accounts[0]);
  }, [accounts, selectedAccount]);

  if (!selectedAccount) {
    return <></>;
  }

  const updateAccounts = async () => {
    if (!accountsUpdateAvailable) {
      return;
    }

    // @ts-ignore
    await injectedApi.accounts.update();
  };

  const { name, address } = selectedAccount;

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center justify-between gap-4 p-3 text-left cursor-pointer border-2">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <p className="font-bold text-lg">{name}</p>
                <p>{displayAddress}</p>
              </div>
            </div>
            <ChevronDownIcon fontSize="4xl" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          {accounts.map((one) => (
            <DropdownMenuItem
              className={clsx("flex gap-2", {
                "bg-gray-200": one.address === address,
              })}
              key={one.address}
              onClick={() => setSelectedAccount(one)}
            >
              <span>{one.name}</span>
            </DropdownMenuItem>
          ))}
          {accountsUpdateAvailable && (
            <DropdownMenuItem className="flex gap-2" onClick={updateAccounts}>
              <PlusSquareIcon fontSize={24} />
              <span>Add/Remove Accounts</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {type === "mainboard" && (
        <>
          <AccountBalances address={address} />
          <div className="flex my-4 gap-4 flex-wrap">
            {/* <TransferBalanceButton fromAccount={selectedAccount} />
        <SignRawMessageButton fromAccount={selectedAccount} />
        <CopyAddressButton address={address} /> */}
          </div>
          <div className="flex gap-2 items-center text-blue-500">
            <a
              href="https://paritytech.github.io/polkadot-testnet-faucet/"
              target="_blank"
            >
              Polkadot Testnet Faucet
            </a>
            <ExternalLinkIcon className="mx-[2px]" />
          </div>
        </>
      )}
    </div>
  );
}
