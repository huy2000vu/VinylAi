require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const lyricsFinder = require('lyrics-finder');
const spotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');
const geniusApi = axios.create({
    baseURL: 'https://api.genius.com',
    headers: { 'Authorization': `Bearer ${process.env.GENIUS_ACCESS_TOKEN}` }
});
const app = express();
app.use(cors());
app.use(bodyParser.json()); //
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/referesh', (req,res) => {
    const refreshToken = req.body.refreshToken
    // console.log("hi")
    const spotifyApi = new spotifyWebApi( {
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRECT,
        refreshToken
     } )

     spotifyApi.refreshAccessToken().then((data) =>{
        // console.log(data.body)
        res.json({
            accessToken: data.body.accessToken,
            expiresIn: data.body.accessToken
        })
    }).catch((err)=>{
        console.log(err)
        res.sendStatus(400);
        })
})

app.post('/login', (req, res) => { //arrow functionf
    const code = req.body.code;
    const spotifyApi = new spotifyWebApi( {
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRECT,
     } )

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        });
     }).catch(()=>{
        // console.log(err);
        res.sendStatus(400);
     }
     )
})
// app.get('/lyrics', async (req, res) => {
//     const lyrics  = (await lyricsFinder(req.query.artist, req.query.track))|| "Lyrics not available";
//     res.json({lyrics})
// })

app.get('/lyrics', async (req, res) => {
    const { artistName, track } = req.query;
    // First, try to get lyrics using lyrics-finder
    let lyrics = await lyricsFinder(artistName, track);
    console.log(artistName);
    console.log(track);
    if (!lyrics) {
        // If no lyrics found, try fetching from Genius
            const response = await geniusApi.get(`/search`, {
                params: { q: `${artistName} ${track}` }
            });
            const hits = response.data.response.hits;
            if (hits.length > 0) {
                const song = hits[0].result;
                lyrics = `Lyrics not found. View more details: ${song.url}`;
            } else {
                lyrics = "No lyrics available from any source.";
            }
    }
    res.json({ lyrics });
});

app.listen(3001)