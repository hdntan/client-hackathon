"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SUPPORTED_NETWORKS } from "@/utils/networks";
import { useApiContext } from "@/providers/ApiProvider";
import clsx from "clsx";
import Image from "next/image";
import Spinner from "@/components/Spinner";

function NetworkStatusIndicator() {
  const { apiReady } = useApiContext();

  if (apiReady) {
    return (
      <div
        className="rounded-[50%] w-3 h-3 bg-green-500"
        // borderRadius='50%' width={3} height={3} backgroundColor='green.500'
      />
    );
  } else {
    return <Spinner />;
  }
}

const NetworkSelection = () => {
  const { network, setNetwork } = useApiContext();
  const [position, setPosition] = React.useState("bottom");
  // const [smallest] = useMediaQuery('(max-width: 325px)');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <div className="flex gap-2 items-center justify-center">
            <span>{network?.name}</span>
            <NetworkStatusIndicator />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="start">
        {Object.values(SUPPORTED_NETWORKS).map((one) => (
          <DropdownMenuItem
            key={one?.id}
            onClick={() => {
              setNetwork(one);
           
            }}
            className={clsx("", {
              "bg-gray-200": one?.id === network?.id,
            })}
          >
            <div className="flex items-center gap-2">
              {/* <Image src={one.logo} width={16} height={16} alt=""/> */}

              <span>{one?.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NetworkSelection;
