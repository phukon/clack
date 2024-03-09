'use client'
import GraphLayout from '@/components/graph/layout';
import React from 'react';

const Activity = () => {

  
  return (
    <div className='ml-7 md:ml-0 flex flex-col items-center gap-8'>
      <span className=' mt-5 text-2xl font-semibold md:text-4xl'>Your full activity</span>
      <GraphLayout isPreview={false}/>
    </div>
  );
};

export default Activity;
