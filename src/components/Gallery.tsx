'use client';

import { ReactNode } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import localFont from 'next/font/local';

import lirmen from '/public/showcase/1.png';
import meJanlem from '/public/showcase/2.png';
import iitghy from '/public/showcase/3.png';
import nr from '/public/showcase/1.png';

import Halo from '@/components/ui/Halo';

const ticketingFont = localFont({
  src: '../../public/ticketing.woff2',
  display: 'swap',
});

type PhotoProps = {
  src: StaticImageData | string;
  meta?: ReactNode;
  filename?: string;
  alt: string;
  width: number;
  height: number;
  rotate: number;
  left: number;
  index: number;
  flipDirection?: 'left' | 'right';
  children?: ReactNode;
};

function Photo({
  src,
  alt,
  filename,
  width,
  height,
  rotate,
  left,
  index,
  flipDirection,
  meta,
  children,
}: PhotoProps) {
  const fileName =
    filename ||
    (typeof src !== 'string' &&
      `${src.src.split('/').at(-1)?.split('.')[0]}.jpg`);
  const shared = 'absolute h-full w-full rounded-2xl overflow-hidden border-2 border-gray-400';
  return (
    <motion.div
      className={`absolute mx-auto cursor-grab hover:before:absolute hover:before:-left-7 hover:before:-top-8 hover:before:block hover:before:h-[300px] hover:before:w-[calc(100%+55px)]`}
      style={{ rotate: `${rotate}deg`, left, width, height, perspective: 1000 }}
      initial={{
        width,
        height,
        rotate: (rotate || 0) - 20,
        y: 200 + index * 20,
        x: index === 1 ? -60 : index === 2 ? -30 : index === 3 ? 30 : 60,
        opacity: 0,
      }}
      transition={{
        default: {
          type: 'spring',
          bounce: 0.2,
          duration:
            index === 1 ? 0.8 : index === 2 ? 0.85 : index === 3 ? 0.9 : 1,
          delay: index * 0.15,
        },
        opacity: {
          duration: 0.7,
          ease: [0.23, 0.64, 0.13, 0.99],
          delay: index * 0.15,
        },
        scale: { duration: 0.12 },
      }}
      animate={{ width, height, rotate, y: 0, opacity: 1, x: 0 }}
      drag
      whileTap={{ scale: 1.1, cursor: 'grabbing' }}
      whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
      whileHover="flipped"
    >
      <motion.div
        className="relative h-full w-full rounded-2xl shadow-md will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
        transition={{ type: 'spring', duration: 0.4 }}
        variants={{
          flipped: {
            scale: 1.1,
            rotateY: flipDirection === 'right' ? -180 : 180,
            rotateX: 5,
          },
        }}
      >
        <div className={shared} style={{ backfaceVisibility: 'hidden' }}>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="pointer-events-none absolute inset-0 h-full w-full rounded-2xl bg-gray-400 object-cover "
            priority
          />
          {children}
        </div>
        <div
          className={clsx(
            shared,
            'flex items-center overflow-hidden rounded-2xl bg-[#FFFAF2]'
          )}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <Halo strength={50} className="flex items-center">
            <span className="absolute h-[500px] w-[500px] rotate-[-20deg] bg-[length:280px] bg-repeat" />
            <div className="z-[1] px-6">
              <div
                className={clsx(
                  ticketingFont.className,
                  'flex flex-col gap-1 uppercase'
                )}
              >
                <p className="text-sm text-secondary">{fileName}</p>
                {meta && <p className="text-sm text-secondary">{meta}</p>}
              </div>
            </div>
          </Halo>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <>
      <section className="absolute left-0 lg:left-48 xl:left-80 2xl:left-96 flex h-[268px] gap-4">
        <Photo
          src={meJanlem}
          meta="Track your progress"
          alt="Track your progress"
          width={300}
          height={500}
          rotate={0}
          left={-86}
          index={1}
        />
        <Photo
          src={iitghy}
          meta="2022-04-07"
          alt="Dirang Valley, Arunchal Pradesh"
          width={300}
          height={500}
          rotate={0}
          left={188}
          index={2}
          flipDirection="left"
        />
        <Photo
          src={lirmen}
          meta="2020-09-20"
          alt="Lirmen, Nagaland"
          width={300}
          height={500}
          rotate={0}
          left={463}
          index={3}
        />
      </section>
    </>
  );
}

export function GallerySmall() {
  return (
    <>
      <section className="absolute left-0 lg:left-48 xl:left-80 2xl:left-96 flex h-[268px] gap-4">
        <Photo
          src={meJanlem}
          meta="Track your progress"
          alt="Track your progress"
          width={200}
          height={400}
          rotate={0}
          left={120}
          index={1}
        />
        <Photo
          src={iitghy}
          meta="2022-04-07"
          alt="Dirang Valley, Arunchal Pradesh"
          width={200}
          height={400}
          rotate={0}
          left={288}
          index={2}
          flipDirection="left"
        />
        <Photo
          src={lirmen}
          meta="2020-09-20"
          alt="Lirmen, Nagaland"
          width={200}
          height={400}
          rotate={0}
          left={463}
          index={3}
        />
        {/* <Photo
          src={lirmen}
          meta="2020-09-20"
          alt="Lirmen, Nagaland"
          width={200}
          height={400}
          rotate={0}
          left={600}
          index={3}
        /> */}
      </section>
    </>
  );
}
