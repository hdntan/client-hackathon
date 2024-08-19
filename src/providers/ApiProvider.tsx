'use client'
import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "react-use";
import useApi from "@/hooks/useApi";
import { JsonRpcApi, NetworkInfo, Props } from "@/types";
import { SUPPORTED_NETWORKS } from "@/utils/networks";
import { DedotClient, LegacyClient } from "dedot";
import { useWalletContext } from "@/providers/WalletProvider";

interface ApiContextProps {
  jsonRpc: JsonRpcApi;
  api?: DedotClient;
  legacy?: LegacyClient;
  apiReady: boolean;
  network: NetworkInfo;
  setNetwork: (one: NetworkInfo) => void;
}

const DEFAULT_NETWORK = SUPPORTED_NETWORKS["pop"];

export const ApiContext = createContext<ApiContextProps>({
  apiReady: false,
  jsonRpc: JsonRpcApi.NEW,
  network: DEFAULT_NETWORK,
  setNetwork: () => {},
});

export const useApiContext = () => {
  return useContext(ApiContext);
};

export default function ApiProvider({ children }: Props) {
  const { injectedApi } = useWalletContext();
  const [network, setNetwork] = useLocalStorage<NetworkInfo>(
    "SELECTED_NETWORK",
    DEFAULT_NETWORK
  );
  const { ready, api, jsonRpc } = useApi(network);

  useEffect(() => {
    api?.setSigner(injectedApi?.signer);
  }, [injectedApi, api]);

  return (
    <ApiContext.Provider
      value={{ api, jsonRpc, apiReady: ready, network: network!, setNetwork }}
    >
      {children}
    </ApiContext.Provider>
  );
}
