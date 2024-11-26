// import React, { useState, useEffect } from 'react';
// // import { Image } from 'react-bootstrap';
// // import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { Fade } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css';
// import styles from'./slideshow.module.css';
// import BackgroundSlideshow from './BackgroundSlideshow';
// const stringSimilarity = require('string-similarity');



// // Function to find closest match
// function findClosestMatch(itemB, listA) {
//   const match = stringSimilarity.findBestMatch(itemB, listA);
//   return match.bestMatch.target;
// }

// // Function to generate list C
// function generateListC(listB, listA) {
//   // Check if listB is an array
//   if (!Array.isArray(listB)) {
//       // If listB is not an array, convert it to an array with a single element
//       listB = [listB];
//   }

//   const listC = [];

//   listB.forEach(itemB => {
//       if (listA.includes(itemB)) {
//           listC.push(itemB);
//       } else {
//           const closestMatch = findClosestMatch(itemB, listA);
//           listC.push(closestMatch);
//       }
//   });

//   return listC;
// }



// const fadeProperties = {
//     duration: 5000, // Duration of the fade animation in milliseconds
//     transitionDuration: 2000, // Duration of the transition between slides in milliseconds
//     infinite: true, // Whether the slideshow should loop infinitely
//     indicators: false, // Whether to show slide indicators
//     arrows:false, // Whether to show arrow navigation
//   };

// const Slideshow = ({ genre, fallbackImage}) => {
//   const [images, setImages] = useState([]);
//   console.log("this is the fallback: " + fallbackImage)
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//           setImages([]);
//           const genreResponse = await fetch(`https://script.google.com/macros/s/AKfycbxg66d5nIkR92mJwrOgpUdAPCXZug5pMOumsphAHMRNYcwDDTTi8dIBdl5Em-ucvkjC/exec`);
//           if (!genreResponse.ok) {
//             throw new Error('Failed to get folder names');
//           }
//           const availableGenres = await genreResponse.json();

//           console.log("this is the genres in slideshow: " + genre);
//           const genres = generateListC(genre, availableGenres);
//           console.log("These are the available genres: " + genres);
          
//           const encodedGenres = genres.map(g => encodeURIComponent(g)).join(',');
//           // encodedGenres = encodedGenres ? encodedGenres : 'no genre';
//           // console.log("encoded Genres : ", encodedGenres)
//           let oneGenre = genres[0].replace(/ /g, "-");
//           //const response = await fetch(`https://script.google.com/macros/s/AKfycbyGiEokxuwPh7qsyqaC9pB9UTpS1Mku0r16zcWQM2R5aQUFEZU4EG77Hes7-QEpTL1c/exec?genres=${encodedGenres}`);
      
//           let response = await fetch(`https://script.google.com/macros/s/AKfycbyfUP2KfH1IxwTJn37zyS0Eh52jas3ilzp-0Dw1rqGIl790OOTt5k76SfJ9MEVOvrBA/exec?folderName=${oneGenre}`);
//           if (!response.ok) {
//               //response = await fetch(`https://script.google.com/macros/s/AKfycbyfUP2KfH1IxwTJn37zyS0Eh52jas3ilzp-0Dw1rqGIl790OOTt5k76SfJ9MEVOvrBA/exec?folderName=no-genre`);
//               throw new Error('Failed to fetch images');
//           }
//           const imageIds = await response.json(); // Not needed since it's already an array
//           const shuffledImageIds = shuffleArray(imageIds);
//           console.log("these are the image ids: " + imageIds)
//           //const imageUrls = shuffledImageIds.map((fileId) => `https://drive.google.com/thumbnail?id=${fileId.trim()}&sz=w1000`);
//           //const imageUrls = shuffledImageIds.map((fileId) => `https://lh3.googleusercontent.com/d/${fileId}=w1000?authuser=0`);
//           const imageUrls = shuffledImageIds.map((fileId) => `https://drive.google.com/thumbnail?id=${fileId}&sz=w450`);
//           setImages(imageUrls);
//           console.log("Current images saved to var: "+ images)
//       } catch (error) {
//           console.error('Error fetching images:', error);
//       }
//   };
//     fetchImages();
//   }, [genre]);

//   // Function to shuffle array
//   function shuffleArray(array) {
//     const shuffledArray = [...array]; // Copy the array to avoid mutating the original
//     for (let i = shuffledArray.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
//     }
//     return shuffledArray;
// }

//   // if (asBackground) {
//   //   return (
//   //     <BackgroundSlideshow images={images} />
//   //   );
//   // }

//   if (images.length === 0) {
//     return (
//     <img src={fallbackImage}/>);
//   }

//   console.log("list of images: " + images)
//   return (

//     <div className="slide-container">
//       <Fade {...fadeProperties}>
//       {images.map((imageUrl, index) => (
//           <div className={`${styles.container} each-fade`} key={index}>
//             <div className={`${styles.centeredElement} image-container`}>
//             <img
//                 src={imageUrl}
//                 alt={imageUrl}
//                 className={styles.image}
//                 onError={(e) => (e.target.src = fallbackImage)}
//             />
//             </div>
//           </div>
//         ))}
//       </Fade>
//     </div>
//   );
// };

// export default Slideshow;


import React, { useState, useEffect } from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import styles from'./slideshow.module.css';
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
    duration: 4000, // Duration of the fade animation in milliseconds
    transitionDuration: 1500, // Duration of the transition between slides in milliseconds
    infinite: true, // Whether the slideshow should loop infinitely
    indicators: false, // Whether to show slide indicators
    arrows:false, // Whether to show arrow navigation
  };

const Slideshow = ({ genre, fallbackImage}) => {
  const [images, setImages] = useState([]);
  console.log("this is the fallback: " + fallbackImage)
  useEffect(() => {
    const fetchImages = async () => {
      try {
          setImages([]);
          const genreResponse = await fetch(`https://script.google.com/macros/s/AKfycbxg66d5nIkR92mJwrOgpUdAPCXZug5pMOumsphAHMRNYcwDDTTi8dIBdl5Em-ucvkjC/exec`);
          if (!genreResponse.ok) {
            throw new Error('Failed to get folder names');
          }
          const availableGenres = await genreResponse.json();

          console.log("this is the genres in slideshow: " + genre);
          // const genres = generateListC(genre, availableGenres);
          const genres = []
          genre.forEach(element => {
            let processElement = element.toLowerCase().replace(/-/g, ' ')
            if (availableGenres.includes(processElement)) {
              genres.push(processElement);
            }
          });
          if (genres.length === 0) {
            genres.push("no-genre");
          }
          // 
          let list = genres.map((element) => element.replace(/ /g, "-"));
          let updatedList = list.map((element) => (element === "Spotify-Lyrics/Genre-Retrieval" ? "no-genre" : element));
          console.log("list with hyphens: " + updatedList);
          //let genreList = updatedList.length < 3 ? updatedList: replaceMostUnlikeWithSimilar(updatedList);

          
          console.log("actual genrelist: " + updatedList)
          let imageUrls = [];
          updatedList.forEach((genre) => {
            for (let i = 0; i <= 9; i++) {
              imageUrls.push(`/${genre}/${genre}_${i}.png`)
            }
          })
      
          const shuffledImageIds = shuffleArray(imageUrls);
          setImages(shuffledImageIds);
          console.log("Current images saved to var: "+ images);
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

  // used to determine distance between genres
  function levenshtein(a, b) {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
      Array(b.length + 1).fill(0)
    );
  
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        if (a[i - 1] === b[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1, // Deletion
            matrix[i][j - 1] + 1, // Insertion
            matrix[i - 1][j - 1] + 1 // Substitution
          );
        }
      }
    }
    return matrix[a.length][b.length];
  }
  // replaces the genre that does not belong with the most similar genre
  function replaceMostUnlikeWithSimilar(array) {
    // Step 1: Find the "most unlike" element
    const distances = array.map((item, i) =>
      array.reduce((sum, other, j) => {
        if (i !== j) sum += levenshtein(item, other);
        return sum;
      }, 0)
    );
  
    const maxIndex = distances.indexOf(Math.max(...distances));
    const mostUnlike = array[maxIndex];
  
    // Step 2: Find the most similar element to the "most unlike"
    let mostSimilar = null;
    let minDistance = Infinity;
  
    array.forEach((item, i) => {
      if (i !== maxIndex) {
        const distance = levenshtein(mostUnlike, item);
        if (distance < minDistance) {
          minDistance = distance;
          mostSimilar = item;
        }
      }
    });
  
    // Step 3: Replace the "most unlike" element with the "most similar" one
    array[maxIndex] = mostSimilar;
  
    return array; // Return the updated array
  }

  if (images.length === 0) {
    return (
      <div className="slide-container">
          <img
              src={fallbackImage}
              alt={fallbackImage}
              className={styles.image}
          />
      </div>
    );
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
                title={`Image ${imageUrl}`}
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