const imageContainer = document.getElementById("dynamic-image");
//const imageUrls = ["static/image1.png", "static/image2.png", "static/image3.png"];
let current =0;

function updateImage() {
    fetch('/get_random_image()')
    .then(response => response.json())
    .then(data => {
        const imageURL = data.image_url;
        console.log(imageURL);
        console.log("here");
        imageContainer.src = imageURL;
    });
 }


setInterval(updateImage, 3000);