'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa6';
import { Button } from '../ui/button';

export const Social = () => {
  return (
    <div className=" flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className=" w-full"
        variant="outline"
        onClick={() => console.log('clicked')}
      >
        <FcGoogle />
      </Button>
      <Button
        size="lg"
        className=" w-full"
        variant="outline"
        onClick={() => console.log('clicked')}
      >
        <FaGithub />
      </Button>
    </div>
  );
};
