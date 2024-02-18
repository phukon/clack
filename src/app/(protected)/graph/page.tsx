'use client';
import { useEffect, useRef, useState } from 'react';
import { drawContributions } from '@/lib/graph';
import { seedUserData } from './_addData';
import { getUserData } from './_getData';
import { DataStruct } from '@/types';

const Graph = () => {
  const canvasRef = useRef(null);
  const [userData, setUserData] = useState<DataStruct>();

  const username = 'random';
  const userId = 'clsrqhsf80000ysi845gabfp7';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData(userId);
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (userData && canvasRef.current) {
      drawContributions(canvasRef.current, {
        data: userData,
        username: username,
        themeName: 'githubDark',
        footerText: 'Riki Phukon',
      });
    }
  }, [userData, username]);

  const handlePostClick = () => {
    seedUserData(userId);
  };

  return (
    <>
      <button onClick={handlePostClick}>POST Data</button>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default Graph;

// import React, { useEffect, useRef } from 'react';
// import { drawContributions } from '@/lib/graph';
// import mockData from './mock.json';
// import { seedUserData } from './_addData';
// import { getUserData } from './_getData';

// const Graph = () => {
//   const canvasRef = useRef(null);

//   const username = 'random';
//   const userId = 'clsrm4y8j0000f1pd4tqa2cx1';

//   useEffect(() => {
//     // Ensure the canvas element exists before drawing
//     if (canvasRef.current) {
//       drawContributions(canvasRef.current, {
//         data: mockData,
//         username: username,
//         // "sunny" | "__test__" | "standard" | "classic" | "githubDark" | "halloween" | "teal" | "leftPad" | "dracula" | "blue" | "panda" | "pink" | "YlGnBu" | "solarizedDark" | "solarizedLight"
//         themeName: 'standard',
//         footerText: 'Riki Phukon',
//       });
//     }
//   }, [mockData, username]);

//   const handlePostClick = () => {
//     seedUserData(userId)
//   }

//   const handleGetClick = () => {
//     console.log(getUserData(userId))
//   }

//   return (
//     <>
//       <button onClick={handleGetClick}>GET DATA</button>
//       <button onClick={handlePostClick}>POST Data</button>
//       <canvas ref={canvasRef}></canvas>;
//     </>
//   );
// };

// export default Graph;
