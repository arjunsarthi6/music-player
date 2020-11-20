import React from "react";

const LibrarySong = ({ song, songs, setCurrentSong, audioRef, isPlaying, setSongs, id}) => {
    //handlers
    const setSelectedSong = async () => {
        const selectedSong = songs.filter((state) => state.id === song.id);
       await setCurrentSong(selectedSong[0]);
        //check if song is playing
        
        if (isPlaying) audioRef.current.play();

        // set active state for the song

        const newSongs = songs.map((song) => {
            if (song.id === id) {
                return {
                    ...song, active: true,
                };
            } else {
                return {
                    ...song, active: false,
                };
            }
        });

        await setSongs(newSongs);
        
    
    };
    return (
        <div onClick={setSelectedSong} className={`library-song ${song.active ? "selected":""}`}>
            <img src={song.cover} alt={song.name} />
            <div className="song-description">
                <h3>{ song.name }</h3>
                <h4>{ song.artist }</h4>
            </div>
        </div>
    );
}

export default LibrarySong;
