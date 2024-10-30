import React, { useContext, useRef } from 'react';
import { Context } from './Context';
import Thread from './Thread';
import { useWindowSize } from '@uidotdev/usehooks';
import { useNavigate } from 'react-router-dom';

function Navigation(props) {
  const { products, productSelected, setProductSelected } = useContext(Context);
  const containerRef = useRef(null);
  const size = useWindowSize();
  const navigate = useNavigate();

  return (
    <ul ref={containerRef} className="relative gap-y-2 max-xl:gap-y-1.5 max-lg:items-center flex flex-col w-full overflow-x-auto">
      {
        products.map((product, index) => (
          <li key={index} className="flex items-center gap-x-4">
            <Thread onClick={() => {
              if (size.width > 1024) setProductSelected(product._id);
              else navigate('/product/' + product._id);
            }} selected={size.width > 1024 ? product._id === productSelected : false} title={product.title} />
            {
              product.availability === 2 &&
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9" stroke="rgb(179, 179, 179)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M7.55966 21.9009C5.87613 21.8235 4.49269 20.515 4.26781 18.8447C4.12104 17.7547 4 16.6376 4 15.5C4 14.3624 4.12104 13.2453 4.26781 12.1553C4.49269 10.485 5.87613 9.17649 7.55966 9.09909C8.97627 9.03397 10.4153 9 12 9C13.5847 9 15.0237 9.03397 16.4403 9.09909C18.1239 9.17649 19.5073 10.485 19.7322 12.1553C19.879 13.2453 20 14.3624 20 15.5C20 16.6376 19.879 17.7547 19.7322 18.8447C19.5073 20.515 18.1239 21.8235 16.4403 21.9009C15.0237 21.966 13.5847 22 12 22C10.4153 22 8.97627 21.966 7.55966 21.9009ZM11.9961 14.5C11.4438 14.5 10.9961 14.9477 10.9961 15.5C10.9961 16.0523 11.4438 16.5 11.9961 16.5H12.0051C12.5574 16.5 13.0051 16.0523 13.0051 15.5C13.0051 14.9477 12.5574 14.5 12.0051 14.5H11.9961Z" fill="rgb(179, 179, 179)"/>
              </svg>
            }
          </li>
        ))
      }
    </ul>
  );
}

export default Navigation;