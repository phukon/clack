"use client";
import { useEffect, useRef, useState } from "react";
import { drawContributions } from "@/lib/graph";
import { getUserData } from "./_getData";
import { DataStruct } from "@/types";
import { useCurrentUser } from "@/hooks/use-current-user";
import { themes } from "@/lib/graph";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import SelectTheme from "@/components/select-theme";
// import useNotes from '@/context/NotesContext';
// import { seedUserData } from './_addData';
// import jsonData from './mock.json';

type GraphProps = {
  isPreview: boolean;
};

export default function Graph(props: GraphProps) {
  // const {wordCount} = useNotes()
  const [selectedTheme, setSelectedTheme] = useState<keyof typeof themes>("solarizedDark");
  const { isPreview } = props;
  const canvasRef = useRef(null);
  const [userData, setUserData] = useState<DataStruct>();
  const currentYear = new Date().getFullYear();
  const user = useCurrentUser();
  const username = user?.name;
  const userId = user?.id;

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value as keyof typeof themes);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const userData = await getUserData(userId); // Add nullish coalescing operator to provide a default value
          // console.log("DEUBG: /components/graph ", userData);
          setUserData(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
    console.log(canvasRef.current)
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
        data: isPreview ? filteredData : userData,
        username: username ?? "", // Provide a default value for username
        themeName: selectedTheme,
        footerText: "Clack ©2024",
        wordCount: 0, // might use later
      });
    }
  }, [userData, username, currentYear, isPreview, selectedTheme]);

  // const handlePostClick = () => {
  //   seedUserData(userId);
  // };

  return (
    <div
      className="border-gray-200 border-2 rounded max-w-[325px] md:max-w-full p-1 md:p-10"
      style={{ overflowX: "auto" }}
    >
      {/* <button onClick={handlePostClick}>POST Data</button> */}
      <div className="w-full flex justify-between">
        <Button
          onClick={() => {
            navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/embed/${user?.id}`);
            toast({
              title: "🎊 Copied embed link to clipboard! 🎊",
              description: "You can use this widget in your Notion pages!",
              variant: "success",
            });
          }}
          variant="outline"
          className="mb-2"
        >
          copy 🔗
        </Button>
        <SelectTheme handleThemeChange={handleThemeChange} />
      </div>
      <div className="relative w-[400px] md:w-[900px]">
      <canvas className="max-w-none md:w-full rounded" ref={canvasRef}></canvas>
      {!canvasRef.current && (
        <div className="absolute top-0 left-0 w-[400px] md:w-[900px] h-full animate-pulse rounded bg-gray-400"></div>
      )}
      </div>
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
