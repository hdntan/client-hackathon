import WalletSelection from "@/components/dialog/WalletSelection";
import { DrawerMenu } from "@/components/DrawerMenu";
import { ModeToggleTheme } from "@/components/ModeToggleTheme";
import ButtonConnectWallet from "@/components/shared/MainHeader/ButtonConnectWallet";
import NetworkSelection from "@/components/shared/NetworkSelection";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const MainHeader = () => {
  return (
    <header className="w-full border-b-2">
      <div className=" flex items-center justify-end  mx-auto h-16 gap-4 px-4">
        <ul className="lg:flex hidden items-center justify-center gap-2">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/tokenstaking"}>Staking</Link>
          </li>
        </ul>
        <div className="flex lg:hidden">
          <DrawerMenu />
        </div>
        <div className="flex gap-2">
          <div className="hidden lg:flex">
            <ButtonConnectWallet />
            <NetworkSelection />
          </div>

        
          <ModeToggleTheme />
        </div>
      </div>
    </header>
  );
};
