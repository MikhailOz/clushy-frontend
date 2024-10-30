import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsDeleting(true);
  }, [text]);

  useEffect(() => {
    let timeout;

    if (isDeleting) {
      setIsTyping(false);
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(prevText => prevText.slice(0, -1));
        }, delay);
      } else {
        setIsDeleting(false);
        setCurrentIndex(0);
      }
    }

    else if (currentIndex < text.length) {
      setIsTyping(true);
      timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
    } else {
      setIsTyping(false);
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, delay, text]);

  return (
    <span>
      {currentText}
      {
        (isTyping || isDeleting) &&
        <span className={`blink`}>|</span>
      }
    </span>
  );
};
export default Typewriter;
