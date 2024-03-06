require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const lyricsFinder = require('lyrics-finder');
const spotifyWebApi = require('spotify-web-api-node');

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

app.post('/login', (req, res) => { //arrow function
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
app.get('/lyrics', async (req, res) => {
    const lyrics  = (await lyricsFinder(req.query.artist, req.query.track))|| "no lyrics found uwu";
    res.json({lyrics})
})
app.listen(3001)