const imageContainer = document.getElementById("dynamic-image");
let current =0;

function updateImage(genre = "country") {
    fetch(`/get_random_image?genre=${genre}`)
    .then(response => response.json())
    .then(data => {
        const imageURL = data.image_url;
        console.log(imageURL);
        console.log("here");
        imageContainer.src = imageURL;
    });
 }


//setInterval(updateImage, 3000);
setInterval(function() {
    updateImage("comedy"); // Pass the genre as a parameter to updateImage
  }, 3000);