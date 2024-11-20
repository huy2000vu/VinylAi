import React, { useState, useEffect } from 'react';
// import { Image } from 'react-bootstrap';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import styles from'./slideshow.module.css';
import BackgroundSlideshow from './BackgroundSlideshow';
const stringSimilarity = require('string-similarity');



// Function to find closest match
function findClosestMatch(itemB, listA) {
  const match = stringSimilarity.findBestMatch(itemB, listA);
  return match.bestMatch.target;
}

// Function to generate list C
function generateListC(listB, listA) {
  // Check if listB is an array
  if (!Array.isArray(listB)) {
      // If listB is not an array, convert it to an array with a single element
      listB = [listB];
  }

  const listC = [];

  listB.forEach(itemB => {
      if (listA.includes(itemB)) {
          listC.push(itemB);
      } else {
          const closestMatch = findClosestMatch(itemB, listA);
          listC.push(closestMatch);
      }
  });

  return listC;
}



const fadeProperties = {
    duration: 5000, // Duration of the fade animation in milliseconds
    transitionDuration: 2000, // Duration of the transition between slides in milliseconds
    infinite: true, // Whether the slideshow should loop infinitely
    indicators: false, // Whether to show slide indicators
    arrows:false, // Whether to show arrow navigation
  };

const Slideshow = ({ genre, fallbackImage}) => {
  const [images, setImages] = useState([]);
  console.log(fallbackImage)
  useEffect(() => {
    const fetchImages = async () => {
      try {
          setImages([]);
          const genreResponse = await fetch(`https://script.google.com/macros/s/AKfycbxg66d5nIkR92mJwrOgpUdAPCXZug5pMOumsphAHMRNYcwDDTTi8dIBdl5Em-ucvkjC/exec`);
          if (!genreResponse.ok) {
            throw new Error('Failed to get folder names');
          }
          const availableGenres = await genreResponse.json();

          console.log("this is the genre: " + genre[0]);
          const genres = generateListC(genre, availableGenres);
          console.log("These are the available genres: " + genres);
          
          // console.log(genres);
          const encodedGenres = genres.map(g => encodeURIComponent(g)).join(',');
          // encodedGenres = encodedGenres ? encodedGenres : 'no genre';
          // console.log("encoded Genres : ", encodedGenres)
          let oneGenre = genres[0]
          //const response = await fetch(`https://script.google.com/macros/s/AKfycbyGiEokxuwPh7qsyqaC9pB9UTpS1Mku0r16zcWQM2R5aQUFEZU4EG77Hes7-QEpTL1c/exec?genres=${encodedGenres}`);
      
          let response = await fetch(`https://script.google.com/macros/s/AKfycbyfUP2KfH1IxwTJn37zyS0Eh52jas3ilzp-0Dw1rqGIl790OOTt5k76SfJ9MEVOvrBA/exec?folderName=${oneGenre}`);
          if (!response.ok) {
              response = await fetch(`https://script.google.com/macros/s/AKfycbyfUP2KfH1IxwTJn37zyS0Eh52jas3ilzp-0Dw1rqGIl790OOTt5k76SfJ9MEVOvrBA/exec?folderName=no-genre`);
              //throw new Error('Failed to fetch images');
          }
          const imageIds = await response.json(); // Not needed since it's already an array
          const shuffledImageIds = shuffleArray(imageIds);
          console.log("these are the image ids: " + imageIds)
          //const imageUrls = shuffledImageIds.map((fileId) => `https://drive.google.com/thumbnail?id=${fileId.trim()}&sz=w1000`);
          //const imageUrls = shuffledImageIds.map((fileId) => `https://lh3.googleusercontent.com/d/${fileId}=w1000?authuser=0`);
          const imageUrls = shuffledImageIds.map((fileId) => `https://drive.google.com/thumbnail?id=${fileId}&sz=w500`);
          setImages(imageUrls);
      } catch (error) {
          console.error('Error fetching images:', error);
      }
  };
    fetchImages();
  }, [genre]);

  // Function to shuffle array
  function shuffleArray(array) {
    const shuffledArray = [...array]; // Copy the array to avoid mutating the original
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }
    return shuffledArray;
}

  // if (asBackground) {
  //   return (
  //     <BackgroundSlideshow images={images} />
  //   );
  // }

  if (images.length === 0) {
    return (
    <img src={fallbackImage}/>);
  }

  console.log("list of images: " + images)
  return (

    <div className="slide-container">
      <Fade {...fadeProperties}>
      {images.map((imageUrl, index) => (
          <div className={`${styles.container} each-fade`} key={index}>
            <div className={`${styles.centeredElement} image-container`}>
            <img
                src={imageUrl}
                alt={imageUrl}
                className={styles.image}
                onError={(e) => (e.target.src = fallbackImage)}
            />
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default Slideshow;


