import Image from 'next/image';
import React from 'react';

const Card = () => {
  return (
    <div className="flex flex-col items-center align-middle">
      <div className="relative h-full">
        <div
          style={{
            borderRadius: 'inherit',
          }}
        >
          <Image
            alt="yo"
            height={1100}
            width={1100}
            src="/showcase/a.jpg"
            objectFit="cover"
            objectPosition="center"
            className="md:max-w-[500px] md:max-h-[302px] rounded-md"
          />
        </div>
      </div>
      <div className="flex flex-col items-start md:max-w-[500px] md:max-h-[302px] text-left">
        <div
          style={{
            outline: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            flexShrink: 0,
            transform: 'none',
          }}
        >
          <h3 className="--local-ebgaramond text-[26px] text-[#27272A]">
            AI Autocomplete
          </h3>
        </div>
        <div
          style={{
            outline: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            flexShrink: 0,
            transform: 'none',
          }}
        >
          <p
            className="text-[#71717A] text-base"
            data-styles-preset="mTnUhWLEM"
          >
            Autocomplete will write alongside you to beat writer's block
            whenever you need a helping hand
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
