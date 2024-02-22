import Graph from '@/app/(protected)/graph/page';
import React from 'react';

const Activity = () => {
  return (
    <div className='ml-7 md:ml-0 flex flex-col items-center gap-8'>
      <span className=' mt-5 text-2xl font-semibold md:text-4xl'>Your full activity</span>
      <Graph previewData={false}/>
    </div>
  );
};

export default Activity;
