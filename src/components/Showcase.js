import { useLocation, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from './Context';
import axios from 'axios';
import Title from './Title';
import BackSpan from './BackSpan';
import SizeSelector from './SizeSelector';
import { useWindowSize } from '@uidotdev/usehooks';

function Showcase() {
  const location = useLocation();
  const { products, sizes, previousPage, setShowSideCarousel, showSideCarousel, productSelected } = useContext(Context);
  const remainingPath = location.pathname.replace('/product/', '');
  const product = products[products.findIndex(product => product._id === remainingPath)];
  const [remindEmailValid, setRemindEmailValid] = useState(false);
  const [remindEmailValue, setRemindEmailValue] = useState('');
  const [requestSending, setRequestSending] = useState(false);
  const [requestInfo, setRequestInfo] = useState({ status: null, message: null });
  const [showInfo, setShowInfo] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const navigate = useNavigate();
  const size = useWindowSize();

  const sendRemindRequest = async () => {
    if (!remindEmailValid || requestSending || showInfo) return;
    setRequestSending(true);

    try {
      const response = await axios.post('http://localhost:3000/remindItemDrop', {
        email: remindEmailValue,
        itemId: product._id
      });

      if (response.data.status === 1000) setRequestInfo({ status: true, message: 'The email has been successfully saved' })
      else if (response.data.status === 2001) setRequestInfo({ status: false, message: 'The email has already been saved in our records' });
      else if (response.data.status === 2000) setRequestInfo({ status: false, message: 'An unexpected error occurred while processing your request' });
    } catch (error) {
      console.error('Error sending remind request:', error);
    } finally {
      setRequestSending(false);
    }
  };

  const sendPurchaseRequest = async () => {
    if (requestSending || !selectedSize) return;
    setRequestSending(true);
    try {
      const response = await axios.post('http://localhost:4000/createPaymentLink', {
        itemId: product._id,
        sizeId: selectedSize
      });

      if (response.data.status === 1000 && response.data.message) window.location.replace(response.data.message);
    } catch (error) {
      console.error('Error sending remind request:', error);
    } finally {
      setRequestSending(false);
    }
  };

  const changeEmail = (value) => {
    if (requestSending) return;
    const disallowedCharacters = /[()<>,;:"\\[\] \0-\x1F\u200B]|[^\x20-\x7E]/g;
    if (remindEmailValue[remindEmailValue.length - 1] === '.' && value[value.length - 1] === '.') return;
    if (value.split('@').length - 1 >= 2) return;
    setRemindEmailValue(value.replace(disallowedCharacters, '').toLowerCase());
  };

  useEffect(() => {
    setRemindEmailValid(remindEmailValue.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));
  }, [remindEmailValue]);

  useEffect(() => {
    if (requestInfo.message && (requestInfo.status === false || requestInfo.status === true)) {
      setTimeout(() => {
        setShowInfo(true);
        setTimeout(() => {
          setShowInfo(false);
          setTimeout(() => {
            setRequestInfo({ status: null, message: null });
          }, 150);
        }, 2500);
      }, 50);
    } else setShowInfo(false);
  }, [requestInfo]);

  useEffect(() => {
    if (size.width <= 1024) setShowSideCarousel(false);
    else setShowSideCarousel(true);
  }, [size.width, location.pathname, showSideCarousel]);

  if (!product) return null;
  return (
    <div className="lg:w-1/2 lg:-ml-12 lg:pl-12">
      <div className="pt-2">
        {
          previousPage &&
          <div className="absolute top-24 max-md:top-20">
            <BackSpan onClick={() => navigate(previousPage)}/>
          </div>
        } <Title value={product.title}/>
      </div>
      {
        product.availability === 1 &&
        <span className="text-white text-4xl font-lostar font-medium">{product.price}&euro;</span>
      }
      <div className="flex w-screen -ml-12 my-10 lg:hidden">
        {(() => {
          return [product.thumb, ...product.images].map((image, index) => (
            <div key={index}>
              <img src={`${process.env.REACT_APP_BACKEND_URL}/images/${image}`} alt={`Product image ${index}`} />
            </div>
          ));
        })()}
      </div>
      <div className="flex flex-col max-lg:flex-col-reverse gap-y-8">
        <p className={`font-jetbrains text-gray-stone text-xl leading-8 opacity-80 max-2xl:text-[19px] ${product.availability === 1 ? 'mt-8 max-lg:mt-3' : 'mt-10'}`}>{product.description}</p>
        <div className="relative flex z-10 gap-x-2">
          {
            product.availability === 2 &&
            <input className={`!cursor-text bg-gray-300 rounded-lg overflow-hidden w-96 px-4 py-3 max-sm:py-2.5 transition-all duration-100 ${!requestSending ? 'bg-gray-silver hover:bg-gray-bluish focus:bg-gray-bluish' : 'bg-gray-silver pointer-events-none'} text-base font-normal font-jetbrains placeholder:text-gray-600 text-black placeholder:transition-opacity focus:placeholder:opacity-0`}
                   placeholder="name@email.com" type="text" autoComplete="email" value={remindEmailValue.trim()} onChange={(e) => changeEmail(e.target.value)}/>
          }
          <button className={`flex items-center justify-center relative hover:bg-gray-charcoal py-3 max-sm:py-2.5 px-4 max-sm:px-2 rounded-lg hover:opacity-100 transition-all duration-100 ease-in ${(product.availability === 2 && (!remindEmailValid || showInfo)) || requestSending ? 'opacity-90 pointer-events-none bg-gray-charcoal' : 'bg-gray-graphite'}`}
                  onClick={() => product.availability === 2 ? sendRemindRequest() : product.availability === 1 && sendPurchaseRequest()}>
            <span className={`font-poppins text-nowrap w-24 text-white tracking-tight text-base max-sm:text-sm ${!requestSending ? 'opacity-100 ease-in' : 'opacity-0 ease-out'} transition-opacity duration-100`}>{product.availability === 2 ? 'Remind Me' : 'Purchase'}</span>
            <div className="flex items-center justify-center absolute h-full w-full">
              <svg className={`fill-white text-white animate-spin ${!requestSending ? 'opacity-0 ease-out scale-50' : 'opacity-100 ease-in'} transition-opacity duration-100`} xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M 8 0 C 3.582 0 0 3.582 0 8 C 0 12.419 3.582 16 8 16 C 12.418 16 16 12.419 16 8 C 15.999 3.582 12.418 0 8 0 Z M 8 14 C 4.687 14 2 11.314 2 8 C 2 4.687 4.687 2 8 2 C 11.314 2 14 4.687 14 8 C 14 11.314 11.314 14 8 14 Z" fill="currentColor" opacity="0.2"></path>
                <path d="M 8 0 C 12.418 0 15.999 3.582 16 8 C 16 8 16 9 15 9 C 14 9 14 8 14 8 C 14 4.687 11.314 2 8 2 C 4.687 2 2 4.687 2 8 C 2 8 2 9 1 9 C 0 9 0 8 0 8 C 0 3.582 3.582 0 8 0 Z" fill="currentColor"></path>
              </svg>
            </div>
          </button>
          {
            product.availability === 1 &&
            <SizeSelector sizes={sizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize} sizesQty={product.sizes}/>
          }
        </div>
      </div>
      {
        requestInfo.message && (requestInfo.status === false || requestInfo.status === true) &&
        <span className={`font-jetbrains tracking-tight font-normal ${requestInfo.status ? 'text-green-600' : 'text-red-500'} ${!showInfo ? 'opacity-0 -translate-y-4' : 'translate-y-2 opacity-100'} transition-all`}>{requestInfo.message}</span>
      }
    </div>
  );
}

export default Showcase;
