'use client'
import MainBoard from '@/components/MainBoard';
import WelcomeBoard from '@/components/WelcomeBoard'
import { useWalletContext } from '@/providers/WalletProvider';
import React from 'react'

const HomePage = () => {
  const { injectedApi } = useWalletContext();

  return (
    <div className='lg:w-[632px] w-full mx-auto my-4 px-4 flex flex=1'>
    {!!injectedApi ? <MainBoard /> : <WelcomeBoard />}

    </div>
  )
}

export default HomePage