"use client";

import Graph from "./page";
import { themes } from "@/lib/graph";

const GraphLayout = ({ isPreview, themeName }: { isPreview: boolean; themeName: keyof typeof themes }) => {
  return (
    <>
      <Graph isPreview={isPreview} themeName={themeName} />
    </>
  );
};

export default GraphLayout;

