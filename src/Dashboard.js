import { useState, useEffect} from 'react';
import useAuth from './useAuth';
import Player from './Player';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult';
import axios from 'axios';
import Slideshow from './SlideShow';
import { getGenre } from './genreSearch';
import styles from './Dashboard.module.css';
// import React from 'react';
// import LyricsComponent from './Lyrics';

const spotifyApi = new SpotifyWebApi({
    clientId: '899d75cd32d746b98cf38cd856560cd1',
})


export default function Dashboard({code}) {
    const accessToken = useAuth(code); 
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [lyrics, setLyrics] = useState("");
    const [genre, setGenre] = useState('');

    const [currentTrackGenre, setCurrentTrackGenre] = useState('');

    const [musicPlaying, setMusicPlaying] = useState(true);

    // Callback function to update state when music stops
    const handleMusicStop = () => {
        setMusicPlaying(prevMusicPlaying => !prevMusicPlaying);
        // console.log("Music is played: ", musicPlaying);

      // You can perform other actions here when music stops
    };

    useEffect(() => {
        // Set showResults based on whether search has content
        setShowResults(search !== '');
    }, [search]);

    const [showResults, setShowResults] = useState(false);


    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch('')
        setLyrics('')
        // handleSearch()
  
    }
    
    useEffect(() => {
        if (!playingTrack) return;
        // console.log(playingTrack);
        axios.get('http://localhost:3001/lyrics',{
            params:{
                track: playingTrack.title,
                artist: playingTrack.artistName,
            }
        }).then(res => {
            // console.log(res.data);
            setLyrics(res.data.lyrics);
        });

        handleSearch(playingTrack.artistName, playingTrack.title);
    }, [playingTrack]);


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

    const handleSearch = async (artist, track) => {
        const result = await getGenre(artist, track);
        setGenre(result);
    };
    return (



        <Container className="" style={{height :'100vh'}}>
            <Form.Control 
            type ="Search" 
            placeholder = "Search Songs/Artists" 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            style={{marginTop: '10px'}}
            />
            <div className='d-flex flex-column py-2 container'>
            
 
            {showResults && (
                            <div className={`${styles.songSelector} flex-grow-1 my-2`} style={{overflowY : 'auto'}}> 
                            {searchResults.map(track =>(
                                <TrackSearchResult track = {track} key ={track.uri} chooseTrack={chooseTrack}/>
                            ))}
                            </div>
            )}
   
            <div className='row d-md-flex' style={{paddingBottom: '80px',}}>
                {playingTrack ? (
                    <>

                <div className='col-lg-8 col-md-12'>
                    <Slideshow genre={genre} />
                    </div>

                    <div className='col-lg-4 col-md-12'>
                        <div className={styles.lyricsContainer}>
                            <div className={`${styles.lyricsCenteredElement} text-center`}>
                               <span>{lyrics}</span>
                            </div>
                        </div>
                     </div>
                    </>
                ) : (
                    <>
                     <div className={`${styles.logoContainer} col-12`}>
                        <div className={styles.logoCenteredElement}>
                            <img src='/logo512.png'></img>
                        </div>
                     </div>
                    </>
                )}
            </div>
            
            {/* {searchResults.length === 0 && (
                <div className='text-center' style={{whiteSpace: 'pre'}}>
                    {lyrics}
                    </div>
            )} */}
         
            <div className='fixed-bottom container'> 
                <Player 
                    accessToken={accessToken} 
                    trackUri ={playingTrack?.uri}
                    onMusicStop={handleMusicStop}
                 />
            </div>
            </div>
        </Container>
    )
}
