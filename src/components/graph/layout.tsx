"use client";

import Graph from "./page";

interface GraphLayoutProps {
  isPreview: boolean;
}

const GraphLayout = ({ isPreview }: GraphLayoutProps) => {
  return (
    <>
      <Graph isPreview={isPreview} />
    </>
  );
};

export default GraphLayout;

