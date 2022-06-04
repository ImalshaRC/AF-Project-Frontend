import React from "react";
import { useLocation } from "react-router-dom";
import img from './video-player-img.png';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {

    const search = useLocation().search;

    return(
        <div className="d-flex justify-content-center pt-5">

            <ReactPlayer playIcon controls url={new URLSearchParams(search).get('vUrl')}/>

        </div>
    )
}

export default VideoPlayer;