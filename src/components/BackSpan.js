import React, { useState } from 'react';

function BackSpan({ onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex items-center relative group cursor-pointer active:opacity-70 transition-all" onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.55" stroke="currentColor" className="flex size-12 stroke-white">
        <path strokeLinecap="round" strokeLinejoin="round" d={`M6.75 15.75 3 12m0 0 3.75-3.75M3`}/>
      </svg>
      <div className={`h-[3px] rounded-full absolute left-2 top-5.5 ${hovered ? 'w-8' : 'w-6'} bg-white transition-all ease-out`}/>
      <span className={`text-white font-poppins max-md:text-xl font-medium text-2xl ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'} ease-out transition-all`}>Back</span>
    </div>
  );
}

export default BackSpan;