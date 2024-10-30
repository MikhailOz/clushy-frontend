import React, { useContext, useRef, useState } from 'react';
import Title from './Title';
import { Context } from './Context';
import { useNavigate } from 'react-router-dom';

function Shop(props) {
  const { products } = useContext(Context);
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const [contentHovered, setContentHovered] = useState('');

  return (
    <>
      <Title value={'Our Designs'} />
      <div ref={contentRef} className="grid grid-cols-2 absolute z-10 left-0 px-12 max-lg:grid-cols-1 gap-6 justify-between w-full font-jetbrains text-gray-stone text-xl mt-12 max-sm:mt-6 leading-8 opacity-80">
        {
          products.map((product, index) => (
            <div className="flex flex-col h-96 relative cursor-pointer" onClick={() => navigate('/product/' + product._id)} onMouseEnter={() => setContentHovered(product._id)} onMouseLeave={() => setContentHovered('')}>
              <img
                className={`h-full w-full object-cover select-none grayscale-[100%] saturate-150 brightness-75`}
                draggable={false}
                src={process.env.REACT_APP_BACKEND_URL + '/images/' + product.thumb}
              />
              <div className={`absolute top-0 h-full w-full z-10 pointer-events-none overflow-hidden transition-all duration-200`}>
                <div className={`absolute left-9 top-9 z-10 max-xl:left-6 max-xl:top-6 duration-200 transition-opacity`}>
                  <span className="text-white font-lostar text-5xl select-none max-xl:text-4xl">
                    {product.title}
                  </span>
                </div>
                <img
                  className={`absolute h-full w-full select-none ${contentHovered === product._id ? 'opacity-70' : 'opacity-60'} transition-all`}
                  draggable={false}
                  src={process.env.REACT_APP_BACKEND_URL + '/images/TvLykNyN3Xaz0IyGN.png'}
                />
              </div>
            </div>
          ))
        }
      </div>
      <div style={{height: contentRef.current ? contentRef.current.clientHeight + 40 : 0}}/>
    </>
  );
}

export default Shop;