'use client';
import { useEffect, useRef, useState } from 'react';
import { drawContributions } from '@/lib/graph';
import { seedUserData } from './_addData';
import { getUserData } from './_getData';
import { DataStruct } from '@/types';
import { useCurrentUser } from '@/hooks/use-current-user';
// import jsonData from './mock.json';

const Graph = ({previewData}: {previewData: boolean}) => {
  const canvasRef = useRef(null);
  const [userData, setUserData] = useState<DataStruct>();
  const currentYear = new Date().getFullYear();

  const user = useCurrentUser()
  const username = user?.name
  const userId = user?.id

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData(userId!); // TODO: check later if it really needs non-null assertion operator (!)
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (canvasRef.current && userData) {
      const filteredYears: any = userData.years.filter(
        (year) => year.year === currentYear.toString()
      );
      const filteredData = {
        years: filteredYears,
        contributions: userData.contributions,
      };
      drawContributions(canvasRef.current, {
        data: previewData ? filteredData : userData,
        username: username!,
        themeName: 'standard',
        footerText: 'Clack ©2024',
      });
    }
  }, [userData, username]);

  // const handlePostClick = () => {
  //   seedUserData(userId);
  // };

  return (
    <div
      className="border-gray-200 border-2 max-w-[325px] md:max-w-full px-1 md:p-10"
      style={{ overflowX: 'auto' }}
    >
      {/* <button onClick={handlePostClick}>POST Data</button> */}
      <canvas className="max-w-none md:w-full h-auto" ref={canvasRef}></canvas>
    </div>
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
