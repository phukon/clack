"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectThemeProps {
    handleThemeChange: (value: string) => void;
}

export default function SelectTheme({ handleThemeChange }: SelectThemeProps) {
  return (
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
  );
}
