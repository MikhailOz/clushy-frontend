import React from 'react';
import Title from './Title';

function About(props) {
  return (
    <>
      <Title value={'About Us'} />
      <div className={`grid grid-cols-3 max-lg:grid-cols-1 gap-y-6 gap-x-10 justify-between font-jetbrains text-gray-stone text-xl mt-12 max-sm:mt-6 leading-8 w-full opacity-80`}>
        <p>I am Gregor Clemenzo, an architect dedicated to the art of minimalism in design. With a passion for creating spaces that blend form and function seamlessly, I embark on every project with a vision to simplify the complexities of architecture.</p>
        <p>My journey in the world of architecture has been a quest for elegance through minimalism. Drawing inspiration from nature's inherent simplicity and the harmony it brings, I strive to create spaces that not only inspire but also enrich lives.</p>
        <p>With years of experience and a portfolio that reflects my commitment to minimalistic principles, I aim to redefine spaces with clean lines, uncluttered aesthetics, and an unwavering focus on the user's experience. I believe that in the absence of excess, true beauty emerges.</p>
      </div>
    </>
  );
}

export default About;