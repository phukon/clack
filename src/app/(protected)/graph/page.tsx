import React, { useEffect, useRef } from "react";
import { drawContributions } from "@/lib/graph";
import mockData from "./mock.json";
const Graph = () => {
  const canvasRef = useRef(null);

  const username = 'random'

  useEffect(() => {
    // Ensure the canvas element exists before drawing
    if (canvasRef.current) {
      drawContributions(canvasRef.current, {
        data: mockData,
        username: username,
        // "sunny" | "__test__" | "standard" | "classic" | "githubDark" | "halloween" | "teal" | "leftPad" | "dracula" | "blue" | "panda" | "pink" | "YlGnBu" | "solarizedDark" | "solarizedLight" 
        themeName: "standard", 
        footerText: "Riki Phukon"
      });
    }
  }, [mockData, username]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Graph;
