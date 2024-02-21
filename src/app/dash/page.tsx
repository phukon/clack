'use client'
import { Button } from '@/components/ui/button';
import Card from './_components/Card';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';


const Dash = () => {
  return (
    <div className="mb-12 p-4 flex min-h-[100svh] flex-col items-center sm:px-5 pt-[calc(10vh)] md:mb-0">
      <header>header here</header>
      <div>Home</div>
      <div className="mt-8 md:px-12">
        contents
        <Card />
      </div>
      <Drawer direction="right">
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent className="bg-white flex flex-col rounded-t-[10px] h-full w-[400px] mt-24 fixed bottom-0 right-0">
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Dash;
