import React from 'react';

function Thread({ onClick, selected, title }) {
  return (
    <div onClick={onClick} className={`group flex w-fit ${selected ? 'opacity-100' : 'opacity-60 hover:opacity-100'} items-center relative cursor-pointer transition-all`}>
      <div className={`absolute left-0 bg-gray-stone h-[2.25px] w-0 ${selected ? 'w-0' : 'group-hover:w-6'} rounded-full transition-all`}/>
      <span className={`font-jetbrains text-gray-stone font-medium text-[26px] max-xl:text-2xl text-nowrap ${selected ? 'translate-x-0' : 'group-hover:pl-9'} transition-all`}>
        {title}
      </span>
    </div>
  );
}

export default Thread;