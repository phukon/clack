"use client";
import Graph from "./page";
const GraphLayout = ({ isPreview}: { isPreview: boolean }) => {
  return (
    <div>
      <Graph isPreview={isPreview} />
    </div>
  );
};

export default GraphLayout;
