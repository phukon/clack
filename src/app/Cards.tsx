'use client';
import { BackgroundGradientDemo } from '@/components/BackgroundGradient';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

interface Props {
  emoji: string;
}

const cardVariants: Variants = {
  offscreen: {
    y: 100,
    rotate: 0,
  },
  onscreen: {
    y: -20,
    rotate: 0,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 1.0,
    },
  },
};

function Card({ emoji }: Props) {
  return (
    <motion.div
      className="card-container rounded-2xl mx-0 lg:mx-28 min-[1280px]:mx-52"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <div className="splash" />
      <div className=" flex flex-col md:flex-roww-full items-center">
        {/* <div className=" max-w-[550px]">
          <span className=" text-2xl md:text-2xl font-extrabold --local-ebgaramond">Build your portfolio</span>
          <p className=' text-gray-600 text-base max-w-80 md:max-w-60 mt-2'>{emoji}</p>
        </div> */}
        <motion.div className="card" variants={cardVariants}>
          {/* <Image
            className=" max-h-full object-cover max-w-full rounded-md"
            src="/showcase/a.jpg"
            alt="ded"
            height={920}
            width={920}
          /> */}
          <BackgroundGradientDemo />
        </motion.div>
      </div>
    </motion.div>
  );
}

const food: [string][] = [
  ['Track your workTrack your workTrack your workTrack your work'],
  ['Track your workTrack your workTrack your workTrack your work'],
  ['Track your workTrack your workTrack your workTrack your work'],
  [
    "Automatically sync your Google Doc activity, and view your daily writing progress. Don't worry, you can choose to keep this public or private on your page",
  ],
];

export default function Cards() {
  return (
    <div className="grid grid-cols-2">
      {food.map(([emoji], index) => (
        <Card emoji={emoji} key={index} />
      ))}
    </div>
  );
}
