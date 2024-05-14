import React from 'react';
import styles from './backgroundslideshow.module.css' // Import your CSS file for styling

function BackgroundSlideshow({ images }) {
  // Logic for slideshow functionality here

  return (
    <div className={styles.slideshow}>
      {/* Use inline styles to set the background image */}
      <div className={styles.slide} style={{ backgroundImage: `url(${images[0]})` }} />
      {/* Add more slides as needed */}
    </div>
  );
}

export default BackgroundSlideshow;
