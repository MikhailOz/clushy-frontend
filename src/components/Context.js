import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [showSideCarousel, setShowSideCarousel] = useState(true);
  const [freezeSideCarousel, setFreezeSideCarousel] = useState(false);
  const [productSelected, setProductSelected] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (currentPage !== location.pathname) {
      setPreviousPage(currentPage);
      setCurrentPage(location.pathname);
    }

    setShowSideCarousel(location.pathname === '/' || location.pathname.split('/')[1] === 'product');
    setFreezeSideCarousel(location.pathname.split('/')[1] === 'product');
  }, [location.pathname, currentPage]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getInitialItemsAndSizes');
        if (response.data.status === 1000 && response.data.message) {
          setProducts(response.data.message[0]);
          setSizes(response.data.message[1]);
          setProductSelected(response.data.message[0][0]?._id);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Context.Provider value={{ products, sizes, previousPage, productSelected, setProductSelected, showSideCarousel, setShowSideCarousel, freezeSideCarousel }}>
      { children }
    </Context.Provider>
  );
}

export { ContextProvider, Context };
