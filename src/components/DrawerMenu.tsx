"use client";
import * as React from "react";
import { Menu, Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import ButtonConnectWallet from "@/components/shared/MainHeader/ButtonConnectWallet";
import NetworkSelection from "@/components/shared/NetworkSelection";

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

export function DrawerMenu() {
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w">
          <DrawerHeader className="hidden">
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>

          <div className="w-full flex flex-col text-center p-4">
           
            <Link
              className="w-full hover:bg-gray-200 cursor-pointer py-2"
              href={"/"}
            >
              Home
            </Link>
            <Link
              className="w-full hover:bg-gray-200  cursor-pointer py-2"
              href={"/tokenstaking"}
            >
              Staking
            </Link>
            <div className="flex flex-col gap-2">
            <ButtonConnectWallet />
            <NetworkSelection />
            </div>
            
           
          </div>
   
        </div>
      </DrawerContent>
    </Drawer>
  );
}
