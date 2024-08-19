'use client'
import WalletSelection from '@/components/dialog/WalletSelection';
import { useWalletContext } from '@/providers/WalletProvider';
import React from 'react'

const ButtonConnectWallet = () => {
  const { injectedApi } = useWalletContext();
    
  return (
   <>
      
      {!!injectedApi ? <div></div> : <WalletSelection /> }
   </>
  )
}

export default ButtonConnectWallet