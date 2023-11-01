import React from 'react';
import Link from 'next/link';

function ResultCard({ userName, score }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Test Result</h2>
      <p className="text-lg">Name: {userName}</p>
      <p className="text-lg ">Score: {score}%</p>
      <Link href={'/home/learn'} className='p-2 mt-5  text-green-500'>Start Again</Link>
    </div>
  );
}

export default ResultCard;
