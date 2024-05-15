import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ accessToken, trackUri, onMusicStop }) {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;

  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={(state) => {
        // Check if music is not playing or has stopped
        if (!state.isPlaying) {
          setPlay(false); // Stop playing
          onMusicStop(); // Call the callback function from props
        }
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    //   styles={{
    //     bgColor: '#333',
    //     color: '#fff',
    //     loaderColor: '#fff',
    //     sliderColor: '#1cb954',
    //     savedColor: '#fff',
    //     trackArtistColor: '#ccc',
    //     trackNameColor: '#fff',
    //   }}
    />
  );
}
