import { useState } from 'react';
import { useAsync, useLocalStorage, useToggle } from 'react-use';
import { Connection, JsonRpcApi, NetworkInfo } from '@/types';
// import { newSmoldotChain } from '@/utils/smoldot.ts';
import { DedotClient, JsonRpcProvider, LegacyClient, WsProvider } from 'dedot';

type UseApi = {
  ready: boolean;
  jsonRpc: JsonRpcApi;
  api?: DedotClient;
  legacy?: LegacyClient;
};

export default function useApi(network?: NetworkInfo): UseApi {
  const [connectVia] = useLocalStorage<Connection>('SETTINGS/CONNECT_VIA', Connection.RPC_ENDPOINT);
  const [jsonRpc] = useLocalStorage<JsonRpcApi>('SETTINGS/JSON_RPC_API', JsonRpcApi.NEW);
  
  const [ready, setReady] = useToggle(false);
  const [api, setApi] = useState<DedotClient>();
  

  useAsync(async () => {
    if (!network) {
      return;
    }

    if (api) {
      await api.disconnect();
    }

    

    setReady(false);

    let provider: JsonRpcProvider;

    if (connectVia === Connection.RPC_ENDPOINT) {
      provider = new WsProvider(network.provider);
      setApi(await DedotClient.new({ provider }));

    } 

   
    

    setReady(true);
  }, [jsonRpc, network?.provider]);

  return { ready, api, jsonRpc: jsonRpc! };
}
