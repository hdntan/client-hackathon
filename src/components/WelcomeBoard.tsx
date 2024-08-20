import Settings from "@/components/dialog/Settings";
import WalletSelection from "@/components/dialog/WalletSelection";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function WelcomeBoard() {
  return (
    <div className="w-full">
      <div className="text-center">
    
        <p className="mb-4 text-xl">
          Connect to your wallet to getting started
        </p>
        {/* <WalletSelection /> */}
      </div>
    </div>
  );
}

export default WelcomeBoard;
