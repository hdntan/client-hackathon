import WalletSelection from "@/components/dialog/WalletSelection";
import { ModeToggleTheme } from "@/components/ModeToggleTheme";
import ButtonConnectWallet from "@/components/shared/MainHeader/ButtonConnectWallet";
import NetworkSelection from "@/components/shared/NetworkSelection";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const MainHeader = () => {
  return (
    <header className="w-full border-b-2">
      <div className="lg:w-[632px] flex items-center justify-end  mx-auto h-16 gap-4 px-4">
        {/* <Link href={'/'}>
      <Image alt='logo' src={'/dedot-dark-logo.png'} width={36} height={36}/>
      </Link> */}

        <div className="flex gap-2">
          <ButtonConnectWallet />

          <NetworkSelection />
          <ModeToggleTheme />
        </div>
      </div>
    </header>
  );
};
