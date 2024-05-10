
let lastTrackId = null; // Keep track of the last track ID to detect changes

function checkCurrentlyPlaying(access_token) {
    const options = {
        url: 'https://api.spotify.com/v1/me/player/currently-playing',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        json: true
    };

    request.get(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const trackId = body.item ? body.item.id : null; // Get track ID if available

            if (trackId !== lastTrackId) {
                lastTrackId = trackId;
                // Track has changed, fetch track and artist details
                if (trackId) {
                    fetchTrackAndArtistDetails(access_token, body.item);
                } else {
                    // No track is currently playing
                    console.log("No track currently playing.");
                }
            }
        } else {
            console.error("Error while checking currently playing track:", error);
        }
    });
}

function fetchTrackAndArtistDetails(access_token, track) {
    const trackInfo = {
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name
    };

    const artistId = track.artists[0].id; // Assuming only one artist for simplicity

    // Use the artist ID to get artist details
    const artistOptions = {
        url: `https://api.spotify.com/v1/artists/${artistId}`,
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        json: true
    };

    request.get(artistOptions, (error, response, artistBody) => {
        if (!error && response.statusCode === 200) {
            // Map specific sub-genres to main genres
            const mainGenres = artistBody.genres.map(genre => simplifyGenre(genre));
            
            // Log the current track info and main genres
            console.log("Current track:", trackInfo);
            console.log("Genres:", mainGenres);
        } else {
            console.error("Error while retrieving artist details:", error);
        }
    });
}


function simplifyGenre(genre) 
{
    if (genre.toLowerCase().includes('acoustic blues') || genre.toLowerCase().includes('acoustic pop') 
    || genre.toLowerCase().includes('deep acoustic pop') || genre.toLowerCase().includes('jug band')
    || genre.toLowerCase().includes('acoustic')) 
    {
        return 'acoustic';
    }
    if (genre.toLowerCase().includes('african') || genre.toLowerCase().includes('afrobeat')
    || genre.toLowerCase().includes('benga') || genre.toLowerCase().includes('highlife')
    || genre.toLowerCase().includes('kizomba') || genre.toLowerCase().includes('mbalax')
    || genre.toLowerCase().includes('morna') || genre.toLowerCase().includes('zydeco')) 
    {
        return 'afrobeat';
    }
    if (genre.toLowerCase().includes('album rock') || genre.toLowerCase().includes('alternative rock')
    || genre.toLowerCase().includes('new americana')) 
    {
        return 'alt-rock';
    }
    if (genre.toLowerCase().includes('alternative') || genre.toLowerCase().includes('alternative americana')
    || genre.toLowerCase().includes('j-alt') || genre.toLowerCase().includes('melancholia')
    || genre.toLowerCase().includes('mellow gold') || genre.toLowerCase().includes('steelpan')) 
    {
        return 'alternative';
    }
    if (genre.toLowerCase().includes('acousmatic') || genre.toLowerCase().includes('ambeat') 
    || genre.toLowerCase().includes('ambient') || genre.toLowerCase().includes('healing')
    || genre.toLowerCase().includes('meditation') || genre.toLowerCase().includes('warm drone')) 
    {
        return 'ambient';
    }
    if (genre.toLowerCase().includes('anime')) 
    {
        return 'anime';
    }
    if (genre.toLowerCase().includes('black metal')) 
    {
        return 'black-metal';
    }
    if (genre.toLowerCase().includes('bluegrass') || genre.toLowerCase().includes('jig and reel')) 
    {
        return 'bluegrass';
    }
    if (genre.toLowerCase().includes('blues')) 
    {
        return 'blues';
    }
    if (genre.toLowerCase().includes('bossanova')) 
    {
        return 'bossanova';
    }
    if (genre.toLowerCase().includes('brazil') || genre.toLowerCase().includes('axe') 
    || genre.toLowerCase().includes('baile funk') || genre.toLowerCase().includes('brega')
    || genre.toLowerCase().includes('capoeira') || genre.toLowerCase().includes('choro')) 
    {
        return 'brazil';
    }
    if (genre.toLowerCase().includes('breakbeat')) 
    {
        return 'breakbeat';
    }
    if (genre.toLowerCase().includes('british') || genre.toLowerCase().includes('britpop')) 
    {
        return 'british';
    }
    if (genre.toLowerCase().includes('cantopop') || genre.toLowerCase().includes('c-pop')
    || genre.toLowerCase().includes('chinese')) 
    {
        return 'cantopop';
    }
    if (genre.toLowerCase().includes('chicago house')) 
    {
        return 'chicago-house';
    }
    if (genre.toLowerCase().includes('children') || genre.toLowerCase().includes('barnemusik')
    || genre.toLowerCase().includes('kindermusik') || genre.toLowerCase().includes('ninos')
    || genre.toLowerCase().includes('lapsille') || genre.toLowerCase().includes('enfants')
    || genre.toLowerCase().includes('kinderen') || genre.toLowerCase().includes('nursery')) 
    {
        return 'children';
    }
    if (genre.toLowerCase().includes('chill') || genre.toLowerCase().includes('light music')
    || genre.toLowerCase().includes('lilith') || genre.toLowerCase().includes('lounge')
    || genre.toLowerCase().includes('relax')) 
    {
        return 'chill';
    }
    if (genre.toLowerCase().includes('classical') || genre.toLowerCase().includes('baroque')
    || genre.toLowerCase().includes('byzantine') || genre.toLowerCase().includes('cello')
    || genre.toLowerCase().includes('choral') || genre.toLowerCase().includes('orchestral') 
    || genre.toLowerCase().includes('gamelan') || genre.toLowerCase().includes('harp')
    || genre.toLowerCase().includes('magyar') || genre.toLowerCase().includes('military band')
    || genre.toLowerCase().includes('oratory') || genre.toLowerCase().includes('polyphony')
    || genre.toLowerCase().includes('rebetiko') || genre.toLowerCase().includes('renaissance')
    || genre.toLowerCase().includes('saxophone') || genre.toLowerCase().includes('violin')
    || genre.toLowerCase().includes('wind ensemble')) 
    {
        return 'classical';
    }
    if (genre.toLowerCase().includes('club')) 
    {
        return 'club';
    }
    if (genre.toLowerCase().includes('comedy') || genre.toLowerCase().includes('comic')
    || genre.toLowerCase().includes('wonky')) 
    {
        return 'comedy';
    }
    if (genre.toLowerCase().includes('country') || genre.toLowerCase().includes('alternative country')
    || genre.toLowerCase().includes('cow') || genre.toLowerCase().includes('luk thung')
    || genre.toLowerCase().includes('nashville')) 
    {
        return 'country';
    }
    if (genre.toLowerCase().includes('dance') || genre.toLowerCase().includes('alternative dance')
    || genre.toLowerCase().includes('azonto') || genre.toLowerCase().includes('balearic')
    || genre.toLowerCase().includes('hi nrg') || genre.toLowerCase().includes('iskelma')
    || genre.toLowerCase().includes('miami bass') || genre.toLowerCase().includes('moombahton'))
    {
        return 'dance';
    }
    if (genre.toLowerCase().includes('dancehall') || genre.toLowerCase().includes('zouglou')) 
    {
        return 'dancehall';
    }
    if (genre.toLowerCase().includes('death metal') || genre.toLowerCase().includes('brutal')
    || genre.toLowerCase().includes('death') || genre.toLowerCase().includes('grind')) 
    {
        return 'death-metal';
    }
    if (genre.toLowerCase().includes('deep house')) 
    {
        return 'deep-house';
    }
    if (genre.toLowerCase().includes('detroit techno')) 
    {
        return 'detroit-techno';
    }
    if (genre.toLowerCase().includes('disco')) 
    {
        return 'disco';
    }
    if (genre.toLowerCase().includes('disney')) 
    {
        return 'disney';
    }
    if (genre.toLowerCase().includes('drum and bass') || genre.toLowerCase().includes('bass music')
    || genre.toLowerCase().includes('jump up') || genre.toLowerCase().includes('neuro')) 
    {
        return 'drum-and-bass';
    }
    if (genre.toLowerCase().includes('dub')) 
    {
        return 'dub';
    }
    if (genre.toLowerCase().includes('dubstep') || genre.toLowerCase().includes('brostep')
    || genre.toLowerCase().includes('catstep')) 
    {
        return 'dubstep';
    }
    if (genre.toLowerCase().includes('edm') || genre.toLowerCase().includes('new beat')
    || genre.toLowerCase().includes('rave') || genre.toLowerCase().includes('scorecore')
    || genre.toLowerCase().includes('trap')) 
    {
        return 'edm';
    }
    if (genre.toLowerCase().includes('electro') || genre.toLowerCase().includes('ninja')
    || genre.toLowerCase().includes('nintendocore') || genre.toLowerCase().includes('outsider')
    || genre.toLowerCase().includes('remix') || genre.toLowerCase().includes('retro')
    || genre.toLowerCase().includes('sega') || genre.toLowerCase().includes('speedcore')
    || genre.toLowerCase().includes('video game')) 
    {
        return 'electro';
    }
    if (genre.toLowerCase().includes('electronic') || genre.toLowerCase().includes('acid') || genre.toLowerCase().includes('abstract')
    || genre.toLowerCase().includes('aussietronica') || genre.toLowerCase().includes('bass trip')
    || genre.toLowerCase().includes('bassline') || genre.toLowerCase().includes('belmani')
    || genre.toLowerCase().includes('big beat') || genre.toLowerCase().includes('big room')
    || genre.toLowerCase().includes('bmore') || genre.toLowerCase().includes('break')
    || genre.toLowerCase().includes('broken beat') || genre.toLowerCase().includes('c64')
    || genre.toLowerCase().includes('c86') || genre.toLowerCase().includes('chip')
    || genre.toLowerCase().includes('bounce') || genre.toLowerCase().includes('commons')
    || genre.toLowerCase().includes('complextro') || genre.toLowerCase().includes('composition')
    || genre.toLowerCase().includes('concert') || genre.toLowerCase().includes('consort')
    || genre.toLowerCase().includes('downtempo') || genre.toLowerCase().includes('future')
    || genre.toLowerCase().includes('game') || genre.toLowerCase().includes('ghettotech')
    || genre.toLowerCase().includes('ghoststep') || genre.toLowerCase().includes('glitch')
    || genre.toLowerCase().includes('hands up') || genre.toLowerCase().includes('illbient')) 
    {
        return 'electronic';
    }
    if (genre.toLowerCase().includes('emo') || genre.toLowerCase().includes('alternative emo')) 
    {
        return 'emo';
    }
    if (genre.toLowerCase().includes('accordian') || genre.toLowerCase().includes('folk')
    || genre.toLowerCase().includes('ceilidh')  || genre.toLowerCase().includes('chalga')
    || genre.toLowerCase().includes('galego') || genre.toLowerCase().includes('klezmer')
    || genre.toLowerCase().includes('laiko') || genre.toLowerCase().includes('manele')
    || genre.toLowerCase().includes('old-time') || genre.toLowerCase().includes('pipe band')
    || genre.toLowerCase().includes('polka') || genre.toLowerCase().includes('rai')
    || genre.toLowerCase().includes('tin pan alley') || genre.toLowerCase().includes('ukelele')
    || genre.toLowerCase().includes('yoik')) 
    {
        return 'folk';
    }
    if (genre.toLowerCase().includes('forro')) 
    {
        return 'forro';
    }
    if (genre.toLowerCase().includes('french') || genre.toLowerCase().includes('chanson')
    || genre.toLowerCase().includes('coupe decale')) 
    {
        return 'french';
    }
    if (genre.toLowerCase().includes('funk') || genre.toLowerCase().includes('boogaloo')
    || genre.toLowerCase().includes('makossa')) 
    {
        return 'funk';
    }
    if (genre.toLowerCase().includes('garage')) 
    {
        return 'garage';
    }
    if (genre.toLowerCase().includes('german') || genre.toLowerCase().includes('blaskapelle')
    || genre.toLowerCase().includes('liedermacher') || genre.toLowerCase().includes('deutsche')) 
    {
        return 'german';
    }
    if (genre.toLowerCase().includes('gospel') || genre.toLowerCase().includes('ccm')
    || genre.toLowerCase().includes('christian') || genre.toLowerCase().includes('angel')
    || genre.toLowerCase().includes('hoerspiel') || genre.toLowerCase().includes('judaica')
    || genre.toLowerCase().includes('klapa') || genre.toLowerCase().includes('lds')
    || genre.toLowerCase().includes('liturgical') || genre.toLowerCase().includes('monastic')
    || genre.toLowerCase().includes('pagan') || genre.toLowerCase().includes('praise')
    || genre.toLowerCase().includes('worship')) 
    {
        return 'gospel';
    }
    if (genre.toLowerCase().includes('goth')) 
    {
        return 'goth';
    }
    if (genre.toLowerCase().includes('grindcore')) 
    {
        return 'grindcore';
    }
    if (genre.toLowerCase().includes('groove')) 
    {
        return 'groove';
    }
    if (genre.toLowerCase().includes('grunge')) 
    {
        return 'grunge';
    }
    if (genre.toLowerCase().includes('guitar') || genre.toLowerCase().includes('fingerstyle')) 
    {
        return 'guitar';
    }
    if (genre.toLowerCase().includes('happy') || genre.toLowerCase().includes('kuduro')
    || genre.toLowerCase().includes('motivation')) 
    {
        return 'happy';
    }
    if (genre.toLowerCase().includes('hard rock')) 
    {
        return 'hard-rock';
    }
    if (genre.toLowerCase().includes('hardcore') || genre.toLowerCase().includes('beatdown')
    || genre.toLowerCase().includes('gabber') || genre.toLowerCase().includes('j-core')) 
    {
        return 'hardcore';
    }
    if (genre.toLowerCase().includes('hardstyle')) 
    {
        return 'hardstyle';
    }
    if (genre.toLowerCase().includes('heavy metal') || genre.toLowerCase().includes('nwobhm')
    || genre.toLowerCase().includes('nwothm') || genre.toLowerCase().includes('thrash')) 
    {
        return 'heavy-metal';
    }
    if (genre.toLowerCase().includes('hip hop') || genre.toLowerCase().includes('beats and rhymes')
    || genre.toLowerCase().includes('bounce') || genre.toLowerCase().includes('rap')
    || genre.toLowerCase().includes('crunk') || genre.toLowerCase().includes('demoscene')
    || genre.toLowerCase().includes('beach music') || genre.toLowerCase().includes('urban')
    || genre.toLowerCase().includes('hyphy') || genre.toLowerCase().includes('jerk')
    || genre.toLowerCase().includes('juggalo') || genre.toLowerCase().includes('new jack')
    || genre.toLowerCase().includes('turntablism')) 
    {
        return 'hip-hop';
    }
    if (genre.toLowerCase().includes('holiday') || genre.toLowerCase().includes('christmas')) 
    {
        return 'holidays';
    }
    if (genre.toLowerCase().includes('honky tonk')) 
    {
        return 'honky-tonk';
    }
    if (genre.toLowerCase().includes('house') || genre.toLowerCase().includes('kwaito')) 
    {
        return 'house';
    }
    if (genre.toLowerCase().includes('idm') || genre.toLowerCase().includes('intelligent dance music')
    || genre.toLowerCase().includes('jumpstyle')) 
    {
        return 'idm';
    }
    if (genre.toLowerCase().includes('indian') || genre.toLowerCase().includes('bangla')
    || genre.toLowerCase().includes('bhangra') || genre.toLowerCase().includes('carnatic')
    || genre.toLowerCase().includes('filmi') || genre.toLowerCase().includes('kirtan')
    || genre.toLowerCase().includes('punjabi') || genre.toLowerCase().includes('qawwali')
    || genre.toLowerCase().includes('bollywood')) 
    {
        return 'indian';
    }
    if (genre.toLowerCase().includes('indie') || genre.toLowerCase().includes('avant-garde')
    || genre.toLowerCase().includes('geek') || genre.toLowerCase().includes('gbvfi')
    || genre.toLowerCase().includes('jam band') || genre.toLowerCase().includes('new weird america')
    || genre.toLowerCase().includes('shibuya-kei') || genre.toLowerCase().includes('twee')) 
    {

        return 'indie';
    }
    if (genre.toLowerCase().includes('indie-pop') || genre.toLowerCase().includes('madchester')) 
    {
        return 'indie-pop';
    }
    if (genre.toLowerCase().includes('industrial') || genre.toLowerCase().includes('aggrotech')
    || genre.toLowerCase().includes('laboratorio') || genre.toLowerCase().includes('mashup')) 
    {
        return 'industrial';
    }
    if (genre.toLowerCase().includes('iranian')) 
    {
        return 'iranian';
    }
    if (genre.toLowerCase().includes('j-dance') || genre.toLowerCase().includes('japanese')
    || genre.toLowerCase().includes('japanoise')) 
    {
        return 'j-dance';
    }
    if (genre.toLowerCase().includes('j-idol')) 
    {
        return 'j-idol';
    }
    if (genre.toLowerCase().includes('j-pop') || genre.toLowerCase().includes('vocaloid')) 
    {
        return 'j-pop';
    }
    if (genre.toLowerCase().includes('j-rock') || genre.toLowerCase().includes('j-poprock')
    || genre.toLowerCase().includes('j-theme') || genre.toLowerCase().includes('visual kei')) 
    {
        return 'j-rock';
    }
    if (genre.toLowerCase().includes('jazz') || genre.toLowerCase().includes('adult standards')
    || genre.toLowerCase().includes('barbershop') || genre.toLowerCase().includes('bebop')
    || genre.toLowerCase().includes('big band') || genre.toLowerCase().includes('boogie-woogie')
    || genre.toLowerCase().includes('bossanova') || genre.toLowerCase().includes('brass band')
    || genre.toLowerCase().includes('brass ensemble') || genre.toLowerCase().includes('free improvisation')
    || genre.toLowerCase().includes('hard bop') || genre.toLowerCase().includes('swing')
    || genre.toLowerCase().includes('tzadik')) 
    {
        return 'jazz';
    }
    if (genre.toLowerCase().includes('k-pop') || genre.toLowerCase().includes('kabarett')
    || genre.toLowerCase().includes('karneval')) 
    {
        return 'kpop';
    }
    if (genre.toLowerCase().includes('kids') || genre.toLowerCase().includes('college')
    || genre.toLowerCase().includes('talent show')) 
    {
        return 'kids';
    }
    if (genre.toLowerCase().includes('latin') || genre.toLowerCase().includes('bachata')
    || genre.toLowerCase().includes('banda') || genre.toLowerCase().includes('bolero')
    || genre.toLowerCase().includes('cante flamenco') || genre.toLowerCase().includes('freestyle')
    || genre.toLowerCase().includes('flamenco') || genre.toLowerCase().includes('grupera')
    || genre.toLowerCase().includes('kompa') || genre.toLowerCase().includes('mambo')
    || genre.toLowerCase().includes('merengue') || genre.toLowerCase().includes('nueva cancion')
    || genre.toLowerCase().includes('orquesta') || genre.toLowerCase().includes('porro')
    || genre.toLowerCase().includes('rhythm and boogie') || genre.toLowerCase().includes('riddim')
    || genre.toLowerCase().includes('tejano') || genre.toLowerCase().includes('tico')
    || genre.toLowerCase().includes('vallenato') || genre.toLowerCase().includes('velha guarda')) 
    {
        return 'latin';
    }
    if (genre.toLowerCase().includes('latino') || genre.toLowerCase().includes('cuba')
    || genre.toLowerCase().includes('cumbia') || genre.toLowerCase().includes('mexican')
    || genre.toLowerCase().includes('norteno') || genre.toLowerCase().includes('ranchera')
    || genre.toLowerCase().includes('timba') || genre.toLowerCase().includes('trova')) 
    {
        return 'latino';
    }
    if (genre.toLowerCase().includes('malay') || genre.toLowerCase().includes('mala')) 
    {
        return 'malay';
    }
    if (genre.toLowerCase().includes('mandopop')) 
    {
        return 'mandopop';
    }
    if (genre.toLowerCase().includes('metal') || genre.toLowerCase().includes('black')
    || genre.toLowerCase().includes('corrosion') || genre.toLowerCase().includes('crossover thrash')
    || genre.toLowerCase().includes('doom') || genre.toLowerCase().includes('filth')
    || genre.toLowerCase().includes('noise') || genre.toLowerCase().includes('filth')) 
    {
        return 'metal';
    }
    if (genre.toLowerCase().includes('metal-misc') || genre.toLowerCase().includes('epicore')) 
    {
        return 'metal-misc';
    }
    if (genre.toLowerCase().includes('metalcore') || genre.toLowerCase().includes('hauntology')) 
    {
        return 'metalcore';
    }
    if (genre.toLowerCase().includes('minimal-techno') || genre.toLowerCase().includes('lowercase')) 
    {
        return 'minimal-techno';
    }
    if (genre.toLowerCase().includes('movie')) 
    {
        return 'movies';
    }
    if (genre.toLowerCase().includes('mpb')) 
    {
        return 'mpb';
    }
    if (genre.toLowerCase().includes('new age')  || genre.toLowerCase().includes('wave')
    || genre.toLowerCase().includes('guidance') || genre.toLowerCase().includes('modern downshift')
    || genre.toLowerCase().includes('modern performance') || genre.toLowerCase().includes('musique concrete')
    || genre.toLowerCase().includes('nu gaze') || genre.toLowerCase().includes('nu skool breaks')
    || genre.toLowerCase().includes('nu-cumbia')) 
    {
        return 'new-age';
    }
    if (genre.toLowerCase().includes('new-release')) 
    {
        return 'new-release';
    }
    if (genre.toLowerCase().includes('no-genre') || genre.toLowerCase().includes('fake')) 
    {
        return 'no-genre';
    }
    if (genre.toLowerCase().includes('opera')) 
    {
        return 'opera';
    }  
    if (genre.toLowerCase().includes('pagode')) 
    {
        return 'pagode';
    }
    if (genre.toLowerCase().includes('party') || genre.toLowerCase().includes('kizomba')
    || genre.toLowerCase().includes('tropical')) 
    {
        return 'party';
    }
    if (genre.toLowerCase().includes('phillipines-opm') || genre.toLowerCase().includes('opm')) 
    {
        return 'phillipines-opm';
    }
    if (genre.toLowerCase().includes('piano')) 
    {
        return 'piano';
    }
    if (genre.toLowerCase().includes('pop') || genre.toLowerCase().includes('boy band')
    || genre.toLowerCase().includes('bubble') || genre.toLowerCase().includes('euro')
    || genre.toLowerCase().includes('girl group') || genre.toLowerCase().includes('idol')
    || genre.toLowerCase().includes('maghreb') || genre.toLowerCase().includes('schlager')
    || genre.toLowerCase().includes('jungle')) 
    {
        return 'pop';
    }
    if (genre.toLowerCase().includes('pop-film') || genre.toLowerCase().includes('dangdut')
    || genre.toLowerCase().includes('brass band')) 
    {
        return 'pop-film';
    }
    if (genre.toLowerCase().includes('post-dubstep')) 
    {
        return 'post-dubstep';
    }
    if (genre.toLowerCase().includes('power-pop') || genre.toLowerCase().includes('ye ye')) 
    {
        return 'power-pop';
    }
    if (genre.toLowerCase().includes('progressive house')) 
    {
        return 'progressive-house';
    }
    if (genre.toLowerCase().includes('psych-rock') || genre.toLowerCase().includes('psych')
    || genre.toLowerCase().includes('stoner')) 
    {
        return 'psych-rock';
    }
    if (genre.toLowerCase().includes('punk') || genre.toLowerCase().includes('anarcho-punk')
    || genre.toLowerCase().includes('hatecore') || genre.toLowerCase().includes('horror')
    || genre.toLowerCase().includes('j-poppunk') || genre.toLowerCase().includes('oi')
    || genre.toLowerCase().includes('riot') || genre.toLowerCase().includes('straight edge')
    || genre.toLowerCase().includes('terrorcore')) 
    {
        return 'punk';
    }
    if (genre.toLowerCase().includes('punk-rock') || genre.toLowerCase().includes('grunge')
    || genre.toLowerCase().includes('screamo') || genre.toLowerCase().includes('shoegaze'))
    {
        return 'punk-rock';
    }
    if (genre.toLowerCase().includes('r-n-b') || genre.toLowerCase().includes('beach music')
    || genre.toLowerCase().includes('beach music') || genre.toLowerCase().includes('motown')
    || genre.toLowerCase().includes('urban')) 
    {
        return 'r-n-b';
    }
    if (genre.toLowerCase().includes('rainy-day')) 
    {
        return 'rainy-day';
    }
    if (genre.toLowerCase().includes('reggae')) 
    {
        return 'reggae';
    }
    if (genre.toLowerCase().includes('reggaeton')) 
    {
        return 'reggaeton';
    }
    if (genre.toLowerCase().includes('road-trip') || genre.toLowerCase().includes('hawaiian')) 
    {
        return 'road-trip';
    }
    if (genre.toLowerCase().includes('rock') || genre.toLowerCase().includes('canterbury scene')
    || genre.toLowerCase().includes('crossover prog') || genre.toLowerCase().includes('merseybeat')
    || genre.toLowerCase().includes('mod revival') || genre.toLowerCase().includes('orgcore')
    || genre.toLowerCase().includes('oshare kei') || genre.toLowerCase().includes('ostrock')) 
    {
        return 'rock';
    }
    if (genre.toLowerCase().includes('rock-and-roll') || genre.toLowerCase().includes('dans')
    || genre.toLowerCase().includes('volksmusik') || genre.toLowerCase().includes('zillertal')
    || genre.toLowerCase().includes('wrock')) 
    {
        return 'rock-n-roll';
    }
    if (genre.toLowerCase().includes('rockabilly')) 
    {
        return 'rockabilly';
    }
    if (genre.toLowerCase().includes('romance') || genre.toLowerCase().includes('fado')) 
    {
        return 'romance';
    }
    if (genre.toLowerCase().includes('sad') || genre.toLowerCase().includes('tribute')) 
    {
        return 'sad';
    }
    if (genre.toLowerCase().includes('salsa')) 
    {
        return 'salsa';
    }
    if (genre.toLowerCase().includes('samba')) 
    {
        return 'samba';
    }
    if (genre.toLowerCase().includes('sertanejo')) 
    {
        return 'sertanejo';
    }
    if (genre.toLowerCase().includes('show tunes')  || genre.toLowerCase().includes('broadway')
    || genre.toLowerCase().includes('cabaret') || genre.toLowerCase().includes('ragtime')) 
    {
        return 'show-tunes';
    }
    if (genre.toLowerCase().includes('singer-songwriter') || genre.toLowerCase().includes('cantautor')
    || genre.toLowerCase().includes('quebecois')) 
    {
        return 'singer-songwriter';
    }
    if (genre.toLowerCase().includes('ska')) 
    {
        return 'ska';
    }
    if (genre.toLowerCase().includes('sleep') || genre.toLowerCase().includes('quiet')) 
    {
        return 'sleep';
    }
    if (genre.toLowerCase().includes('songwriter')) 
    {
        return 'songwriter';
    }
    if (genre.toLowerCase().includes('soul')) 
    {
        return 'soul';
    }
    if (genre.toLowerCase().includes('sountracks') || genre.toLowerCase().includes('hollywood')
    || genre.toLowerCase().includes('spoken') || genre.toLowerCase().includes('spytrack')) 
    {
        return 'soundtracks';
    }
    if (genre.toLowerCase().includes('spanish')) 
    {
        return 'spanish';
    }
    if (genre.toLowerCase().includes('study') || genre.toLowerCase().includes('lo-fi')
    || genre.toLowerCase().includes('mathcore') || genre.toLowerCase().includes('poetry')
    || genre.toLowerCase().includes('reading') || genre.toLowerCase().includes('binaural')) 
    {
        return 'study';
    }
    if (genre.toLowerCase().includes('summer') || genre.toLowerCase().includes('levenslied')) 
    {
        return 'summer';
    }
    if (genre.toLowerCase().includes('swedish')) 
    {
        return 'swedish';
    }
    if (genre.toLowerCase().includes('synth-pop') || genre.toLowerCase().includes('synth')) 
    {
        return 'synth-pop';
    }
    if (genre.toLowerCase().includes('tango')) 
    {
        return 'tango';
    }
    if (genre.toLowerCase().includes('techno') || genre.toLowerCase().includes('environmental')
    || genre.toLowerCase().includes('experimental') || genre.toLowerCase().includes('jungle')
    || genre.toLowerCase().includes('tekno')) 
    {
        return 'techno';
    }
    if (genre.toLowerCase().includes('trance') || genre.toLowerCase().includes('dangdut')
    || genre.toLowerCase().includes('full on')) 
    {
        return 'trance';
    }
    if (genre.toLowerCase().includes('trip hop')) 
    {
        return 'trip-hop';
    }
    if (genre.toLowerCase().includes('turkish')) 
    {
        return 'turkish';
    }
    if (genre.toLowerCase().includes('workout') || genre.toLowerCase().includes('wrestling')) 
    {
        return 'work-out';
    }
    if (genre.toLowerCase().includes('world music') || genre.toLowerCase().includes('afrikaans') 
    || genre.toLowerCase().includes('andean') || genre.toLowerCase().includes('arabesk')
    || genre.toLowerCase().includes('balkan brass') || genre.toLowerCase().includes('belorush')
    || genre.toLowerCase().includes('cajun') || genre.toLowerCase().includes('calypso')
    || genre.toLowerCase().includes('canzone napoletana') || genre.toLowerCase().includes('celtic')
    || genre.toLowerCase().includes('dangdut') || genre.toLowerCase().includes('exotica') 
    || genre.toLowerCase().includes('enka') || genre.toLowerCase().includes('entehno')
    || genre.toLowerCase().includes('fado') || genre.toLowerCase().includes('fourth world')
    || genre.toLowerCase().includes('islamic recitation') || genre.toLowerCase().includes('medieval')
    || genre.toLowerCase().includes('mizrahi') || genre.toLowerCase().includes('nasheed')
    || genre.toLowerCase().includes('native') || genre.toLowerCase().includes('nepali')
    || genre.toLowerCase().includes('traditional') || genre.toLowerCase().includes('throat singing')
    || genre.toLowerCase().includes('tibetan') || genre.toLowerCase().includes('world'))
    {
        return 'world-music';
    }
    return genre; // Returns the genre unchanged if no simplification rule matches
}

setInterval(() => {
    checkCurrentlyPlaying(access_token);
}, 5000);
