'use client';
import { motion, Variants } from 'framer-motion';

interface Props {
  emoji: string;
}

const cardVariants: Variants = {
  offscreen: {
    y: 300,
    rotate: 120,
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
      className="card-container"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.9 }}
    >
      <div className="splash" />
      <div className=" flex flex-col md:flex-row justify-evenly w-full items-center">
        <p>ededed</p>
        <motion.div className="card" variants={cardVariants}>
        {emoji}
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
  return food.map(([emoji], index) => <Card emoji={emoji} key={index} />);
}
