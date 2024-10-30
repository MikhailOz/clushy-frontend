import React, { useContext, useEffect, useState } from 'react';
import Thread from './Thread';
import Title from './Title';
import { Context } from './Context';

function Socials(props) {
  const licenses = [
    { title: 'Typography', value: 'Google', href: 'https://fonts.google.com/' },
    { title: 'Photos', value: 'Pinterest', href: 'https://pinterest.com/' },
    { title: 'Components', value: 'Framer', href: 'https://framer.com/' },
  ];

  return (
    <>
      <Title value={'Licensing'} />
      <div className={`grid grid-cols-3 max-lg:grid-cols-1 gap-y-6 gap-x-12 justify-between w-screen -ml-12 px-12 mt-12 max-lg:mt-6`}>
        {licenses.map((license, index) => (
          <div className="flex flex-col">
            <span className="font-jetbrains text-gray-stone text-xl pb-1 opacity-80">{license.title}</span>
            <Thread onClick={() => window.open(license.href, '_blank')} title={license.value} selected={false}/>
          </div>
        ))}
      </div>
    </>
  );
}

export default Socials;