import React from 'react';

function Title({ value }) {
  return (
    <div className="relative h-fit mt-16 max-sm:mt-12">
      <h1 className="font-lostar text-7xl max-sm:text-5xl max-lg:text-6xl text-white">{value}</h1>
    </div>
  );
}

export default Title;