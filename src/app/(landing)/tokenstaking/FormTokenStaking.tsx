"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useWalletContext } from "@/providers/WalletProvider";
import AccountSelection from "@/components/shared/AccountSelection";

const formSchema = z.object({
  numberToken: z.coerce.number().min(1)
});

export function FormTokenStaking() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberToken: 0,
    },
  });

  

  // 2. Define a submit handler.
  function onSubmitStake( values:  z.infer<typeof formSchema> ) {
    console.log("🚀 ~ onSubmitStake ~ values:", values)
    

  

    
  }


  function onSubmitUnStake( values:  z.infer<typeof formSchema> ) {
    console.log("🚀 ~ onSubmitUnStake ~ values:", values)
    
   
    
  
      
    }
  

 
  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full flex flex-col text-center border-2 rounded-lg p-4 lg:p-10"
      >
        <FormField
          control={form.control}
          name="numberToken"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-2">
                <p className="text-3xl">
                  Yield Farming/Token Staking dApp
                </p>
              <AccountSelection/>
                <p className="text-2xl">
                  36.5% (APY) - 0.1% Daily Earnings
                </p>
              </div>

              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 w-full">
          <Button
            className="w-full flex items-center justify-center gap-2"
            
            
            onClick={form.handleSubmit(onSubmitStake)}
          >
            <Image src={"/stake.png"} alt="" width={24} height={24} />
            <p>Stake</p>
          </Button>
          <Button
            className="w-full flex items-center justify-center gap-2"
   
            onClick={form.handleSubmit(onSubmitUnStake)}

          >
            <Image src={"/unstake.png"} alt="" width={24} height={24} />
            <p>Unstake All</p>
          </Button>
        </div>

        <p className="text-2xl">
          Total Stake (by all users): 0 TestToken (Tst)
        </p>

        <p>My Stake: 0 TestToken (Tst)</p>
        <p>My Estimated Reward: 0.000 TestToken (Tst)</p>
        <p>My balance: 213212 TestToken (Tst)</p>

        <p className="text-2xl">FOR TESTING PURPOSE ONLY</p>

        <div className="flex sm:flex-row flex-col gap-2 w-full">
          <Button className="w-full " type="button">
            Claim for 1000 Tst (User)
          </Button>
          <Button className="w-full" type="button">
            Redistribute rewards (Admin)
          </Button>
        </div>

        <p>Selected Network private id: 57777</p>
        <p>Contract Balance: 121232 TestToken (Tst) </p>

        <p>Staking Contract address: 0x18219</p>
      </form>
    </Form>
  );
}
