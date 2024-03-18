"use client";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GraphLayout from "@/components/graph/layout";
import { themes } from "@/lib/graph";

const Activity = () => {
  const [isUpdating, setIsupdating] = useState<boolean>(false);
  const [selectedTheme, setSelectedTheme] = useState<keyof typeof themes>("solarizedDark");

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value as typeof selectedTheme);
  };
  return (
    <div className="ml-7 md:ml-0 flex flex-col items-center gap-8">
      <span className=" mt-5 text-2xl font-semibold md:text-4xl">Your full activity</span>
      <Select onValueChange={(value: string) => handleThemeChange(value)}>
        <SelectTrigger className=" mb-1 w-[180px]">
          <SelectValue placeholder="Select Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="solarizedDark">Solarized Dark</SelectItem>
          <SelectItem value="solarizedLight">Solarized Light</SelectItem>
          <SelectItem value="standard">Standard</SelectItem>
          <SelectItem value="classic">Classic</SelectItem>
          <SelectItem value="githubDark">GitHub Dark</SelectItem>
          <SelectItem value="halloween">Halloween</SelectItem>
          <SelectItem value="teal">Teal</SelectItem>
          <SelectItem value="leftPad">Left Pad</SelectItem>
          <SelectItem value="dracula">Dracula</SelectItem>
          <SelectItem value="blue">Blue</SelectItem>
          <SelectItem value="panda">Panda</SelectItem>
          <SelectItem value="sunny">Sunny</SelectItem>
          <SelectItem value="pink">Pink</SelectItem>
          <SelectItem value="YlGnBu">YlGnBu</SelectItem>
        </SelectContent>
      </Select>
      <GraphLayout isPreview={false} themeName={selectedTheme} />
    </div>
  );
};

export default Activity;
