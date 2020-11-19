import React, {useState, useRef} from 'react';
//styles
import './styles/app.scss';
//components
import Player from './components/Player';
import Song from './components/Song';
import data from './util';
import Library from './components/Library';

function App() {
   //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration:0
    });
  //References
  const audioRef = useRef("");
  //handler
  const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({ ...songInfo, currentTime: current, duration });
    }

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        audioRef={audioRef}
        setSongs={setSongs}
      />
       <audio
                onTimeUpdate={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
                onLoadedMetadata={timeUpdateHandler}>  
            </audio>
    </div>
  );
}

export default App;
