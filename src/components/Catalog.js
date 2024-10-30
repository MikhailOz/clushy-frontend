import React, { useContext, useEffect, useRef, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { Context } from './Context';
import { useNavigate } from 'react-router-dom';
import Typewriter from './Typewriter';

function Catalog(props) {
  const size = useWindowSize();
  const { products, productSelected, setProductSelected, showSideCarousel, freezeSideCarousel } = useContext(Context);
  const [xContainer, setXContainer] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState(false);
  const [productIsHovered, setProductIsHovered] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (freezeSideCarousel && products && productSelected) {
      const images = [products.find(product => product._id === productSelected).thumb, ...products.find(product => product._id === productSelected).images];
      let imageIndex = images.indexOf(imageSelected);
      setXContainer(imageIndex * (size.width / 2));
    } else setImageSelected(false);
  }, [productSelected, size.height, products, imageSelected, size.width, freezeSideCarousel]);

  const handleWheel = (event) => {
    if (scrollTimeout || !freezeSideCarousel) return;

    const images = [products.find(product => product._id === productSelected).thumb, ...products.find(product => product._id === productSelected).images];
    const currentIndex = images.indexOf(imageSelected);
    let nextIndex;

    if (event.deltaY > 0 && currentIndex < images.length - 1) {
      nextIndex = currentIndex + 1;
    } else if (event.deltaY < 0) {
      nextIndex = currentIndex - 1;
    }

    if (nextIndex >= 0 && nextIndex < products.length) {
      if (!freezeSideCarousel) setProductSelected(products[nextIndex]._id);
      else setImageSelected(images[nextIndex]);

      setScrollTimeout(true);
      setTimeout(() => {
        setScrollTimeout(false);
      }, 300);
    }
  };

  if (!products || products.length <= 0) return null;
  return (
    <>
      <div
        ref={scrollContainerRef}
        onWheel={handleWheel}
        className={`w-1/2 ${showSideCarousel ? 'right-0 transition-all duration-200' : ' -right-full'} ${freezeSideCarousel ? '!overflow-y-hidden' : 'max-lg:hidden'} z-10 fixed top-0`}
      >
        <ul
          className={`relative w-full h-screen ${!freezeSideCarousel ? '' : 'transition-all duration-300'}`}
          style={{
            transform: freezeSideCarousel && `translateX(-${xContainer}px)`,
          }}
        >
          {
            products.map((product, index) => (
              <li key={index} onMouseEnter={() => setProductIsHovered(true)} onMouseLeave={() => setProductIsHovered(false)} className={`h-full w-full right-0 top-0 cursor-pointer absolute flex items-center ${product._id !== productSelected && 'pointer-events-none'} ${!freezeSideCarousel ? 'grayscale-[100%] saturate-150 brightness-75' : 'pointer-events-none'}`} onClick={() => navigate('/product/' + product._id)}>
                <div className={`relative w-full h-full ${product._id === productSelected ? 'opacity-100' : 'opacity-0 blur-sm'} transition-all duration-200`}>
                  <img
                    className={`min-w-[50vw] w-full h-full object-cover pointer-events-none select-none`}
                    draggable={false}
                    src={process.env.REACT_APP_BACKEND_URL + '/images/' + product.thumb}
                    alt={product.title}
                  />
                  <div className={`absolute w-full h-full top-0 bg-gray-stone opacity-10`}/>
                </div>
                {
                  product.images.map((image) => (
                    <div className={`relative min-w-[50vw] pointer-events-none ${product._id === productSelected ? 'opacity-100' : 'hidden'}`}>
                      <img
                        className={`w-full h-full object-cover pointer-events-none select-none`}
                        draggable={false}
                        src={process.env.REACT_APP_BACKEND_URL + '/images/' + image}
                        alt={product.title}
                      />
                    </div>
                  ))
                }
              </li>
            ))
          }
        </ul>
        {
          freezeSideCarousel &&
          <div className="absolute bottom-8 gap-x-2 w-full justify-center flex">
          {
            (() => {
              const selectedProduct = products.find(product => product._id === productSelected);
              return [selectedProduct.thumb, ...selectedProduct.images].map((image, index) => (
                <div key={index} className={`bg-white opacity-100 w-3.5 h-3.5 rounded-full ${image !== imageSelected ? 'opacity-60 cursor-pointer hover:opacity-80' : 'opacity-100 pointer-events-none'} transition-all duration-200`} onClick={() => image !== imageSelected && setImageSelected(image)}/>
              ));
            })()
          }
          </div>
        }
      </div>
      <div className={`fixed top-0 h-screen w-1/2 z-10 pointer-events-none overflow-hidden ${showSideCarousel ? 'right-0 transition-all duration-200' : ' -right-full'} max-lg:hidden`}>
        <div className={`absolute left-12 top-12 z-10 max-xl:left-8 max-xl:top-8 grayscale-[100%] saturate-150 brightness-90 ${!freezeSideCarousel ? 'opacity-100' : 'opacity-0'} duration-200 transition-opacity`}>
          <span className="text-white font-lostar text-6xl select-none max-xl:text-5xl">
            <Typewriter text={products.find(product => product._id === productSelected).title} delay={20}/>
          </span>
        </div>
        <img
          className={`absolute h-full w-full select-none ${!freezeSideCarousel ? `${productIsHovered ? 'opacity-70' : 'opacity-60'} scale-105` : 'opacity-0 scale-110'} transition-all`}
          draggable={false}
          src={process.env.REACT_APP_BACKEND_URL + '/images/TvLykNyN3Xaz0IyGN.png'}
        />
      </div>
    </>
  );
}

export default Catalog;
