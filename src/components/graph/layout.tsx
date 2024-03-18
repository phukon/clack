"use client";

import Graph from "./page";
import { themes } from "@/lib/graph";

const GraphLayout = ({ isPreview, themeName }: { isPreview: boolean; themeName: keyof typeof themes }) => {
  return (
    <div>
      <Graph isPreview={isPreview} themeName={themeName} />
    </div>
  );
};

export default GraphLayout;

