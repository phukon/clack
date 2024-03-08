"use client";
import { useEffect, useRef, useState } from "react";
import { drawContributions } from "@/lib/graph";
import { getUserData } from "./_getData";
import { DataStruct } from "@/types";
import { useCurrentUser } from "@/hooks/use-current-user";
// import useNotes from '@/context/NotesContext';
// import { seedUserData } from './_addData';
// import jsonData from './mock.json';

type GraphProps = {
  isPreview: boolean;
};

export default function Graph(props: GraphProps) {
  // const {wordCount} = useNotes()
  const isPreview = props.isPreview;
  const canvasRef = useRef(null);
  const [userData, setUserData] = useState<DataStruct>();
  const currentYear = new Date().getFullYear();
  const user = useCurrentUser();
  const username = user?.name;
  const userId = user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const userData = await getUserData(userId); // Add nullish coalescing operator to provide a default value
          console.log('DEUBG: /components/graph ',userData)
          setUserData(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (canvasRef.current && userData) {
      const filteredYears: any = userData.years.filter((year) => year.year === currentYear.toString());
      const filteredData = {
        years: filteredYears,
        contributions: userData.contributions,
      };
      drawContributions(canvasRef.current, {
        data: isPreview ? filteredData : userData,
        username: username ?? "", // Provide a default value for username
        themeName: "solarizedDark",
        footerText: "Clack ©2024",
        wordCount: 0, // might use later
      });
    }
  }, [userData, username, currentYear, isPreview]);

  // const handlePostClick = () => {
  //   seedUserData(userId);
  // };

  return (
    <div className="border-gray-200 border-2 max-w-[325px] md:max-w-full px-1 md:p-10" style={{ overflowX: "auto" }}>
      {/* <button onClick={handlePostClick}>POST Data</button> */}
      <canvas className="max-w-none md:w-full h-auto" ref={canvasRef}></canvas>
    </div>
  );
}
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
