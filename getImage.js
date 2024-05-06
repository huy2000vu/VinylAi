const clientId = '904900103432-7h4519mvd8dqttj8ev1v4ce24q6ieb3i.apps.googleusercontent.com';
const apiKey = 'AIzaSyAMQtJKiYHDw2s5eK-DqsNEgt9QMLlco4w'
gapi.load('client', initClient);

function initClient() {
  // Initialize the client with API key and required scopes
  gapi.client.init({
    apiKey: apiKey,
    clientId: clientId,
    plugin_name: 'Test',
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
    scope: 'https://www.googleapis.com/auth/drive.readonly'
  }).then(function () {
    // Authorize
    gapi.auth2.getAuthInstance().signIn();
  });
}
async function searchFile(genre) {
  let response;
  try {
    response = await gapi.client.drive.files.list({
      'q': `mimeType='application/vnd.google-apps.folder' and name='${genre}'`,
      'pageSize': 10,
      'fields': 'files(id, name)',
    });
  } catch (err) {
    // document.getElementById('content').innerText = err.message;
    console.log("inside searchFile: ", err.message)
    return;
  }
  const files = response.result.files;
  if (!files || files.length == 0) {
    // document.getElementById('content').innerText = 'No files found.';
    console.log("inside searchFile no files found")
    return;
  }
  console.log(files)

  // after getting the id from the specified genre folder
  // we need to look for all the files in which the parent = the folder's id
  try {
    response = await gapi.client.drive.files.list({
      'q': `'${files[0].id}' in parents`, // Search files inside the 'country' folder
      'pageSize': 20, // Adjust as needed
      'fields': 'files(id, name)',
    });
  } catch (err) {
    console.error("Error retrieving files from 'country' folder:", err.message);
    return []; // Return an empty array on error
  }

  const filesInSpecifiedFolder = response.result.files;
  console.log(`Files in '${genre}' folder:`, filesInSpecifiedFolder);
  return filesInSpecifiedFolder;
}



const imageContainer = document.getElementById("dynamic-image");
let current =0;

async function updateImage(genre = "no-genre") {
    try {
        const files = await searchFile(genre); // Get files from Google Drive
        const randomIndex = Math.floor(Math.random() * files.length);
        const img = files[randomIndex].id;
        console.log(img);
        const imageURL = `https://drive.google.com/thumbnail?id=${img}&sz=w500`;
        console.log(imageURL)
        imageContainer.src = imageURL;
      } catch (err) {
        console.error('Error updating image:', err);
      }
 }

//setInterval(updateImage, 3000);
setInterval(function() {
    updateImage("dance"); // Pass the genre as a parameter to updateImage
  }, 3000);