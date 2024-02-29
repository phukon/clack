'use client';
import GraphLayout from '../../components/graph/layout';
import Card from './_components/Card';

const Dash = () => {
  return (
    // pt-[calc(10vh)]
    <div className="mb-12 p-4 flex min-h-[100svh] flex-col items-center sm:px-5 md:mb-0">
      <GraphLayout isPreview={true}/>
      <header className=" mt-10">Your work</header>
      <div className="md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-y-8 gap-4 mt-4">
          {' '}
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Dash;
