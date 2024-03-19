"use client";
import { useEffect, useRef, useState } from "react";
import { themes } from "@/lib/graph";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataStruct } from "@/types";
import { getUserData } from "@/components/graph/_getData";
import { getUserById } from "@/data/user";
import { drawContributions } from "@/lib/graph";

type GraphProps = {
  isPreview: boolean;
  themeName: keyof typeof themes;
  username: string;
  userData: DataStruct;
  onThemeChange: (theme: keyof typeof themes) => void;
};

function EmbedGraph(props: GraphProps) {
  const { isPreview, themeName, onThemeChange } = props;
  const canvasRef = useRef(null);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (canvasRef.current && props.userData) {
      const filteredYears: any = props.userData.years.filter(
        (year) => year.year === currentYear.toString()
      );
      const filteredData = {
        years: filteredYears,
        contributions: props.userData.contributions,
      };
      drawContributions(canvasRef.current, {
        data: isPreview ? filteredData : props.userData,
        username: props.username ?? "",
        themeName: themeName,
        footerText: "Clack ©2024",
        wordCount: 0,
      });
    }
  }, [props.userData, props.username, currentYear, isPreview, themeName]);

  return (
    <div className="">
      <canvas className="w-full" ref={canvasRef}></canvas>
      <div className="select-overlay absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <Select onValueChange={(value: string) => onThemeChange(value as keyof typeof themes)}>
          <SelectTrigger className="max-w-[100px]">
            <SelectValue placeholder="Select Theme" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(themes).map((theme) => (
              <SelectItem key={theme} value={theme}>
                {theme}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default function Page({ params }: { params: { id: string } }) {
  const [selectedTheme, setSelectedTheme] = useState<keyof typeof themes>("solarizedDark");
  // const [username, setUsername] = useState<string>("");
  const [userData, setUserData] = useState<DataStruct>();

  const handleThemeChange = (theme: keyof typeof themes) => {
    setSelectedTheme(theme);
  };

  // const generateRandomNumber = (): void => {
  //   setKey(Math.floor(10000000 + Math.random() * 90000000));
  // };

  // const [key, setKey] = useState<number>(4234_2354);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.id) {
          const userData = await getUserData(params.id);
          setUserData(userData);
          // const userResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/userDetails?id=${params.id}`);
          // const user = await userResponse.text();
          // setUsername(user || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <>
      {/* <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={generateRandomNumber}>Refresh</button> */}
      <EmbedGraph
        // key={key}
        isPreview={true}
        themeName={selectedTheme}
        username="Your year progress"
        userData={userData!}
        onThemeChange={handleThemeChange}
      />
    </>
  );
}
