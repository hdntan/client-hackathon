import { useWalletContext } from "@/providers/WalletProvider";

import React from "react";
import WebsiteWallet from "@/wallets/WebsiteWallet";
import Image from "next/image";

export default function ConnectedWallet() {
  const { connectedWallet } = useWalletContext();
  const walletUrl = connectedWallet instanceof WebsiteWallet ? connectedWallet.walletUrl : undefined;

  return (
    <div>
      <div 
      className="flex items-center gap-3 flex-1"
      // align='center' gap={3} flex={1}
      >
        <a href={walletUrl} >
          <Image src={connectedWallet?.logo || ''} alt={connectedWallet?.name || ''} width={32} height={32}/>
        </a>
        <div className="flex flex-col">
          <p className="font-semibold">{connectedWallet?.name}</p>
          <p className="text-sm" >
            {connectedWallet?.id} - v{connectedWallet?.version}
          </p>
        </div>
      </div>
    </div>
  )
}
