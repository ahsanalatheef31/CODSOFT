import React, { useEffect, useState } from 'react';
import './ImageSlider.css';

import img1 from '../Pictures/debby-hudson-vDUIhgASz6c-unsplash.jpg';
import img2 from '../Pictures/jess-bailey-6F0mLsrv134-unsplash.jpg';
import img3 from '../Pictures/nick-morrison-FHnnjk1Yj7Y-unsplash.jpg';
import img4 from '../Pictures/thought-catalog-505eectW54k-unsplash.jpg';

const images = [img1, img2, img3, img4];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIn(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setSlideIn(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <img
        src={images[current]}
        alt="slider"
        className={`slider-image${slideIn ? ' slide-in' : ' slide-out'}`}
      />
    </div>
  );
} 