import React, { useContext, useEffect, useRef, useState } from 'react';
import './index.css';
import Header from './components/Header';
import { Context, ContextProvider } from './components/Context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Catalog from './components/Catalog';
import Homepage from './components/Homepage';
import About from './components/About';
import Socials from './components/Socials';
import Showcase from './components/Showcase';
import Shop from './components/Shop';

function Content() {
  const { showSideCarousel } = useContext(Context);
  const fontsLoaded = useRef(false);
  const { showCarousel } = useContext(Context);

  useEffect(() => {
    if (fontsLoaded.current) return;
    fontsLoaded.current = true;

    const loadFonts = async () => {
      const fontsToLoad = ['JetBrainsMono', 'Poppins', 'Lostar'];
      try {
        for (const fontName of fontsToLoad) {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/fontsURL/${fontName}`);
          const data = await response.json();

          const loadedStyles = new Set();

          data.styles.forEach((style) => {
            const styleKey = `${data.fontName}-${style.weight}-${style.style}`;
            if (!loadedStyles.has(styleKey)) {
              loadedStyles.add(styleKey);

              const fontFace = new FontFace(data.fontName, `url(${style.url})`, {
                weight: style.weight,
                style: style.style,
              });

              fontFace.load()
                .then(() => {
                  document.fonts.add(fontFace);
                })
                .catch((error) => {
                  console.error(`Failed to load font ${data.fontName} from ${style.url}`, error);
                });
            }
          });
        }
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    };

    loadFonts();
  });

  return (
    <div className="flex w-full bg-black min-h-screen max-w-[1800px] relative overflow-hidden">
      <div className={`flex justify-between min-h-screen h-fit overflow-y-scroll w-full mx-auto relative flex-col px-12 pt-10`}>
        <div>
          <Header/>
          <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/socials" element={<Socials />}/>
            <Route path="/shop" element={<Shop />}/>
            <Route path="/product/*" element={<Showcase />} />
          </Routes>
        </div>
        <Footer/>
      </div>
      <Catalog/>
      <object className="absolute left-0 top-0 w-screen h-full bg-repeat opacity-[0.12] pointer-events-none select-none" type="image/png" draggable={false} style={{backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/images/7XxOelgp3SFWnL.png)`}} alt={'TV Filter'}/>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Content/>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;