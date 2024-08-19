import Settings from "@/components/dialog/Settings";
import WalletSelection from "@/components/dialog/WalletSelection";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function WelcomeBoard() {
  return (
    <div className="w-full">
      <div className="text-center">
        {/* <div className="w-28 h-28 mx-auto mt-8 mb-4 relative">
          <Image
            fill
            sizes="100%"
            objectFit="contain"
            alt="logo"
            src="/dedot-dark-logo.png"
          />
        </div> */}
        {/* <h1 className="font-bold mb-4 text-3xl">
          Welcome to <span className="text-nowrap">Dedot Demo Dapp</span>
        </h1> */}
        <p className="mb-4 text-xl">
          Connect to your wallet to getting started
        </p>
        {/* <WalletSelection /> */}
      </div>
    </div>
  );
}

export default WelcomeBoard;
