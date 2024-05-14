import axios from 'axios';

async function getGenre(artist, track) {
    try {
        const response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
            params: {
                method: 'track.getInfo',
                artist,
                track,
                api_key: '53b91d3dfdd187ca16c1aeef4e6661a3',
                format: 'json'
            }
        });

        const tags = response.data.track && response.data.track.toptags.tag;
        if (tags && tags.length > 0) {
            // Extract the top three tags
            const topTags = tags.slice(0, 3).map(tag => tag.name);
            return topTags; // Return array of top three tags
        } else {
            return ['no genre']; // Return array with 'Genre not found' if no tags found
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

export { getGenre };
