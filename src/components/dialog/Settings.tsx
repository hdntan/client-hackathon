'use client'
import React, { useState } from 'react';
import { useBoolean, useEffectOnce, useLocalStorage } from "react-use";
import { Connection, JsonRpcApi } from '@/types';
import { SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


interface SettingsProps {
  size?: string
}

export default function Settings({ size = 'md' }: SettingsProps) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [connectVia, setConnectVia] = useLocalStorage<Connection>('SETTINGS/CONNECT_VIA', Connection.RPC_ENDPOINT);
  const [jsonRpc, setJsonRpc] = useLocalStorage<JsonRpcApi>('SETTINGS/JSON_RPC_API', JsonRpcApi.NEW);
  const [cacheMetadata, setCacheMetadata] = useLocalStorage<boolean>('SETTINGS/CACHE_METADATA', true);

  const [localConnectVia, setLocalConnectVia] = useState<Connection>();
  const [localJsonRpc, setLocalJsonRpc] = useState<JsonRpcApi>();
  const [localCacheMetadata, setLocalCacheMetadata] = useBoolean(true);

  const [loading, setLoading] = useBoolean(false);

  useEffectOnce(() => {
    setLocalJsonRpc(jsonRpc || JsonRpcApi.NEW);
    setLocalConnectVia(connectVia || Connection.RPC_ENDPOINT);
    setLocalCacheMetadata(cacheMetadata);
  });

  const doSave = () => {
    setConnectVia(localConnectVia);
    setJsonRpc(localJsonRpc);
    setCacheMetadata(localCacheMetadata);

    setLoading(true);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">
      <SettingsIcon />
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Share link</DialogTitle>
        <DialogDescription>
          Anyone who has this link will be able to view this.
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          
        </div>
        <Button type="submit" size="sm" className="px-3">
          <span className="sr-only">Copy</span>
          
        </Button>
      </div>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
    // <>
    //   <Button size={'default'} onClick={onOpen} aria-label='Settings' variant='outline' icon={<SettingsIcon />} />
    //   <Modal onClose={onClose} size='sm' isOpen={isOpen}>
    //     <ModalOverlay />
    //     <ModalContent>
    //       <ModalHeader>Settings</ModalHeader>
    //       <ModalCloseButton />
    //       <ModalBody mb={4}>
    //         <FormControl as='fieldset'>
    //           <FormLabel as='legend'>Connect via:</FormLabel>
    //           <RadioGroup value={localConnectVia} onChange={(nextValue) => setLocalConnectVia(nextValue as Connection)}>
    //             <Stack>
    //               <Radio value={Connection.RPC_ENDPOINT}>RPC Endpoint</Radio>
    //               <Radio value={Connection.LIGHT_CLIENT}>Light Client (Smoldot)</Radio>
    //             </Stack>
    //           </RadioGroup>
    //         </FormControl>
    //         <Divider my={4} />
    //         <FormControl as='fieldset' mb={6}>
    //           <FormLabel as='legend'>JSON-RPC APIs:</FormLabel>
    //           <RadioGroup value={localJsonRpc} onChange={(nextValue) => setLocalJsonRpc(nextValue as JsonRpcApi)}>
    //             <Stack>
    //               <Radio value={JsonRpcApi.LEGACY}>Legacy</Radio>
    //               <Radio value={JsonRpcApi.NEW}>New</Radio>
    //             </Stack>
    //           </RadioGroup>
    //         </FormControl>
    //         <Divider my={4} />
    //         <FormControl display='flex' alignItems='center'>
    //           <FormLabel htmlFor='cache-metadata' mb='0'>
    //             Cache metadata?
    //           </FormLabel>
    //           <Switch
    //             id='cache-metadata'
    //             isChecked={localCacheMetadata}
    //             onChange={(e) => setLocalCacheMetadata(e.target.checked)}
    //           />
    //         </FormControl>
    //       </ModalBody>
    //       <ModalFooter gap={2}>
    //         <Button onClick={onClose} variant='outline'>
    //           Cancel
    //         </Button>
    //         <Button colorScheme='primary' onClick={doSave} isLoading={loading}>
    //           Save
    //         </Button>
    //       </ModalFooter>
    //     </ModalContent>
    //   </Modal>
    // </>
  );
}
