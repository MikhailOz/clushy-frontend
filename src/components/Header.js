import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { Context } from './Context';

function Header(props) {
  const { showSideCarousel } = useContext(Context);
  const location = useLocation();
  const pageLinks = [
    { text: 'Home', href: '/' },
    { text: 'About', href: '/about' },
    { text: 'Shop', href: '/shop' },
    { text: 'Socials', href: '/socials' },
  ];

  return (
    <ul className={`flex ${showSideCarousel ? 'lg:w-1/2 lg:-ml-12 lg:pl-12' : 'w-full'} transition-all duration-200 ease-out justify-between`}>
      {
        pageLinks.map((link, index) => (
          <li key={index}>
            <Link key={index} to={link.href} className={`w-fit font-jetbrains text-[23px] max-xl:text-xl ${location.pathname === link.href ? 'text-white' : 'text-gray-stone hover:text-white'} transition-colors duration-75`}>
              {link.text}
            </Link>
          </li>
        ))
      }
    </ul>
  );
}

export default Header;
