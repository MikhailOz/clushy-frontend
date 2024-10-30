import React, { useContext } from 'react';
import { Context } from './Context';

function Footer() {
  const { showSideCarousel } = useContext(Context);
  const socialLinks = [
    { name: 'Tiktok', url: 'https://www.tiktok.com' },
    { name: 'Instagram', url: 'https://www.instagram.com' },
  ];

  return (
    <div className={`flex transition-all duration-200 ease-out py-10 items-center ${showSideCarousel ? 'lg:w-1/2 lg:-ml-12 lg:pl-12' : 'w-full'} justify-between`}>
      <a href="mailto:info@clushywear.com">
        <span className="font-jetbrains text-gray-stone opacity-70 text-xl hover:opacity-100 transition-opacity duration-75">info@clushywear.com</span>
      </a>
      <ul className="font-jetbrains text-gray-stone text-xl space-y-2 text-right">
        {socialLinks.map((link, index) => (
          <li key={index}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-75 cursor-pointer"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;
