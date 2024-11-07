import React, { useState, useEffect } from 'react';
import styles from './backgroundslideshow.module.css';

function BackgroundSlideshow({ images, interval = 3000 }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Set up an interval to change the image
    const slideshowInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    // Clean up the interval on component unmount
    return () => clearInterval(slideshowInterval);
  }, [images.length, interval]);

  return (
    <div className={styles.slideshow}>
      {/* Display the current image based on the index */}
      <div
        className={styles.slide}
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
      />
    </div>
  );
}

export default BackgroundSlideshow;
