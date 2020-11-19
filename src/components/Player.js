import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleRight, faAngleLeft, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({ currentSong, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo }) => {
    
    //Handlers
    const playSongHandler = () => {
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
    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input
                    min={0}
                    max={songInfo.duration}
                    value={songInfo.currentTime}
                    onChange={dragHandler}
                    type="range" />
                <p>{getTime(songInfo.duration - songInfo.currentTime)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={ faAngleLeft } />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying  && (songInfo.currentTime !== songInfo.duration) ? faPause : faPlay } />
                <FontAwesomeIcon className="skip-forward" size="2x" icon={ faAngleRight } />
            </div>
           
        </div>
    );
}

export default Player;
