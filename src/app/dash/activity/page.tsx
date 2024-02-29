'use client'
import { addContribution } from '@/actions/addContribution';
import Graph from '@/app/(protected)/graph/page';
import React from 'react';

const Activity = () => {
  const onClick = () => {
    addContribution().then(r => console.log(r)) 
  }
  
  return (
    <div className='ml-7 md:ml-0 flex flex-col items-center gap-8'>
      <button className=' border-red-500 p-5 border-8' onClick={onClick}>Click to count</button>
      <span className=' mt-5 text-2xl font-semibold md:text-4xl'>Your full activity</span>
      <Graph previewData={false}/>
    </div>
  );
};

export default Activity;
