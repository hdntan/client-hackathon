"use client";
import { Button } from "@/components/ui/button";
import { useWalletContext } from "@/providers/WalletProvider";
import Wallet from "@/wallets/Wallet";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface WalletButtonProps {
  walletInfo: Wallet;
  afterSelectWallet?: () => void;
}

const WalletButton = ({ walletInfo, afterSelectWallet }: WalletButtonProps) => {
  const { name, id, logo, ready, installed } = walletInfo;
  const { enableWallet } = useWalletContext();

  const connectWallet = () => {
    enableWallet(id);

    afterSelectWallet && afterSelectWallet();
  };

  return (
    <Button
      onClick={connectWallet}
      disabled={!installed}
      size={"lg"}
      className="w-full flex items-center justify-start gap-4"
    >
      <Image src={logo} alt={`${name}`} width={24} height={24} />
      <span>{name}</span>
    </Button>
  );
};

interface WalletSelectionProps {
  buttonLabel?: string;
  buttonProps?: any;
}

export default function WalletSelection({
  buttonLabel = "Connect Wallet",
  buttonProps,
}: WalletSelectionProps) {
  const { availableWallets } = useWalletContext();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" {...buttonProps}>
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Wallet to Connect</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-2">
          {availableWallets.map((one) => (
            <WalletButton key={one.id} walletInfo={one} />
          ))}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
