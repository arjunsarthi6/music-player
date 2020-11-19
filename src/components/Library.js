import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({songs, setCurrentSong, isPlaying, audioRef, setSongs}) => {
    return (
        <div className="library">
            <h2>Library</h2>
            <div className="library-songs">
                {
                    songs.map((song) => (
                        <LibrarySong
                            song={song}
                            key={song.id}
                            songs={songs}
                            setCurrentSong={setCurrentSong}
                            isPlaying={isPlaying}
                            audioRef={audioRef}
                            setSongs={setSongs}
                            id={song.id}
                        />
                    ))
                }
            </div>
        </div>
        
    )
}

export default Library;