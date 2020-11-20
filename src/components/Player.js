import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleRight, faAngleLeft, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({ currentSong, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo, songs, setCurrentSong, setSongs }) => {
    //Effects
    useEffect(() => {
        const newSongs = songs.map((song) => {
            if (song.id === currentSong.id) {
                return {
                    ...song, active: true,
                };
            } else {
                return {
                    ...song, active: false,
                };
            }
        });
       setSongs(newSongs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentSong])
    
    //Handlers
    function playSongHandler() {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    
    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }

    const dragHandler = (e) => {
        setSongInfo({ ...songInfo, currentTime: e.target.value });
        audioRef.current.currentTime = e.target.value;
    }

    const setTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === "skip-forward") {
          await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        }
        if (direction === "skip-back") {
            if (currentIndex === 0) {
                await setCurrentSong(songs[(songs.length) - 1]);
                if (isPlaying) audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[(currentIndex -1) % songs.length]);
        }
        if (isPlaying) audioRef.current.play();
    }

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
    };
    
    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            value={songInfo.currentTime}
            type="range"
            max={songInfo.duration || 0}
            min={0}
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
                <p>{songInfo.duration ? getTime(songInfo.duration - songInfo.currentTime) : "00:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => setTrackHandler("skip-back")} className="skip-back" size="2x" icon={ faAngleLeft } />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying  && (songInfo.currentTime !== songInfo.duration) ? faPause : faPlay } />
                <FontAwesomeIcon onClick={() => setTrackHandler("skip-forward")} className="skip-forward" size="2x" icon={ faAngleRight } />
            </div>
           
        </div>
    );
}

export default Player;
