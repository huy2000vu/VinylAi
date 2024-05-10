import { useState, useEffect} from 'react';
import useAuth from './useAuth';
import Player from './Player';
import { Container, Form, Row, Col} from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult';
import axios from 'axios';
// gapi.load('client', initClient);


const gclientId = '904900103432-7h4519mvd8dqttj8ev1v4ce24q6ieb3i.apps.googleusercontent.com';
const gapiKey = 'AIzaSyAMQtJKiYHDw2s5eK-DqsNEgt9QMLlco4w'


const spotifyApi = new SpotifyWebApi({
    clientId: '899d75cd32d746b98cf38cd856560cd1',
})

export default function Dashboard({code}) {
    const accessToken = useAuth(code); 
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [lyrics, setLyrics] = useState("");
    const [imageUrl, setImageUrl] = useState('');

    // useEffect(() => {
    //     function initClient() {
    //       window.gapi.client.init({
    //         apiKey: gapiKey,
    //         clientId: gclientId,
    //         discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
    //         scope: 'https://www.googleapis.com/auth/drive.readonly'
    //       }).then(function () {
    //         window.gapi.auth2.getAuthInstance().signIn();
    //       });
    //     }
    //     window.gapi.load('client', initClient);
    //   }, []);

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch('')
        setLyrics('')
        console.log('Selected Track:', track);
        console.log('Artist Name:', track.artistName);  // Assuming artistName is a property of track    
        console.log('Artist ID:', track.artistID);  // Assuming title is a property of track
    }
    
    useEffect(()=>{
        if(!playingTrack) return
        axios.get('http://localhost:3001/lyrics',{
            params:{
                track: playingTrack.title,
                // artist: playingTrack.artistName
                artistName: playingTrack.artistName
            }
        }).then(res=>{
            setLyrics(res.data.lyrics)
        })
    },[playingTrack])

    useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if(!search) return setSearchResults([])
        if(!accessToken) return 
        let cancel = false
        spotifyApi.searchTracks(search).then(res =>{
            if (cancel) return 
            setSearchResults(res.body.tracks.items.map(track =>{
                const smallestAlbumImage = track.album.images.reduce((smallest,
                     image) =>{
                        if(image.height < smallest.height) return image
                        return smallest
                    }, track.album.images[0])

                return {
                    artistName: track.artists[0].name,
                    title: track.name,
                    artistId: track.artists[0].id,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url
                }
            }))
        })

        return() => cancel = true
    }, [search, accessToken])


    
    return (
        <Container className="d-flex flex-column py-2" style={{ height: '100vh' }}>
            <Form.Control
                type="search"
                placeholder="Search Songs/Artists"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <Row className="flex-grow-1 my-2" style={{ overflowY: 'auto' }}>
                <Col md={8} className="lyrics-container">
                    {searchResults.map(track => (
                        <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />
                    ))}
                    {searchResults.length === 0 && (
                        <div className='text-center' style={{ whiteSpace: 'pre' }}>
                            {lyrics}
                        </div>
                    )}
                </Col>
                <Col md={4} className="pictures-container">
                    {/* Here you can add your image or another component to handle images */}
                    <img src="public/logo512.png" alt="Description of image" style={{border: '2px solid red'}} />
                </Col>
            </Row>
            <div>
                <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
            </div>
        </Container>
    );
}