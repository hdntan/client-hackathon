import { useWalletContext } from "@/providers/WalletProvider";
import WalletSelection from "@/components/dialog/WalletSelection";
import AccountSelection from "@/components/AccountSelection";
import ConnectedWallet from "@/components/dialog/ConnectedWallet";
import { Button } from "@/components/ui/button";

export default function MainBoard() {
  const { accounts, signOut } = useWalletContext();

  return (
    <div className="min-w-full">
      <div 
      className="flex items-center justify-between gap-4 sm:flex-row flex-col"
      
      >
        <ConnectedWallet />
        <div className="flex gap-2">
          <WalletSelection buttonLabel='Switch Wallet' buttonProps={{ size: 'sm', variant: 'outline' }} />
          <Button onClick={signOut} size='sm'  variant='outline' className="bg-red-500">
            Sign out
          </Button>
        </div>
      </div>
      <div 
      className="flex items-center justify-between mt-4 mb-2"
      >
        <p className="text-lg">
          <strong>{accounts.length}</strong> accounts connected
        </p>
      </div>
      <AccountSelection />
    </div>
  )
}
