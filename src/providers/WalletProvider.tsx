'use client'
import { createContext, useContext, useState } from 'react';

import { useAsync, useLocalStorage } from 'react-use';
import { InjectedAccount } from '@/types';
import { UpdatableInjected } from '@coong/sdk/types';
import useWallets from '@/hooks/useWallets';
import { Props } from '@/types';
import Wallet from '@/wallets/Wallet';
import { toast } from '@/components/ui/use-toast';

interface WalletContextProps {
  accounts: InjectedAccount[];
  injectedApi?: UpdatableInjected;
  enableWallet: (id: string) => void;
  signOut: () => void;
  availableWallets: Wallet[];
  connectedWalletId?: string;
  connectedWallet?: Wallet;
}

export const WalletContext = createContext<WalletContextProps>({
  accounts: [],
  enableWallet: () => {},
  signOut: () => {},
  availableWallets: [],
});

export const useWalletContext = () => {
  return useContext(WalletContext);
};

export default function WalletProvider({ children }: Props) {
  const availableWallets = useWallets();
  
  const [accounts, setAccounts] = useState<InjectedAccount[]>([]);
  const [injectedApi, setInjectedApi] = useState<UpdatableInjected>();
  const [connectedWalletId, setConnectedWalletId, removeConnectedWalletId] =
    useLocalStorage<string>('CONNECTED_WALLET');
  const [connectedWallet, setConnectedWallet] = useState<Wallet>();

  const getWallet = (id: string): Wallet => {
    const targetWallet: Wallet = availableWallets.find((one) => one.id === id)!;
    if (!targetWallet) {
      throw new Error('Invalid Wallet ID'); 
    }

    return targetWallet;
  };

  useAsync(async () => {
    if (!connectedWalletId) {
      setConnectedWallet(undefined);
      return;
    }

    let unsub: () => void;
    try {
      const targetWallet: Wallet = getWallet(connectedWalletId);
      setConnectedWallet(targetWallet);

      await targetWallet.waitUntilReady();

      const injectedProvider = targetWallet.injectedProvider;
      if (!injectedProvider?.enable) {
        throw new Error('Wallet is not existed!');
      }

      const injectedApi = await injectedProvider.enable('Sample Dapp');

      unsub = injectedApi.accounts.subscribe(setAccounts);

      setInjectedApi(injectedApi);
    } catch (e: any) {
      toast(
        { variant: "destructive",
          description:  e.message

         }
       );
      setConnectedWallet(undefined);
      removeConnectedWalletId();
    }

    return () => unsub && unsub();
  }, [connectedWalletId]);

  const enableWallet = async (walletId: string) => {
    setConnectedWalletId(walletId);
  };

  const signOut = () => {
    if (connectedWallet) {
      const walletApi = connectedWallet.injectedProvider;

      if (walletApi?.disable) {
        walletApi.disable();
      }
    }

    removeConnectedWalletId();
    setInjectedApi(undefined);
  };

  return (
    <WalletContext.Provider
      value={{
        accounts,
        enableWallet,
        injectedApi,
        signOut,
        availableWallets,
        connectedWalletId,
        connectedWallet,
      }}>
      {children}
    </WalletContext.Provider>
  );
}
