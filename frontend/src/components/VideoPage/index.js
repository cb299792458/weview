import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import {getVideo, fetchVideo} from '../../store/video'
import CommentBox from "../CommentBox";
import './VideoPage.css';
import { VideoPlayer } from "./VideoPlayer";
import ReactPlayer from "react-player";

function VideoPage() {
    const dispatch = useDispatch();
    
    const {videoId} = useParams();
    const video = useSelector(getVideo(videoId));
    
    useEffect( () => {
        dispatch(fetchVideo(videoId));
    }, []);
    
    const [time, setTime] = useState(0);

    const handleTime = (e) => setTime(e);

    const vid = <video 
                // id="vid"
                src={ video ? video.videoUrl : null} 
                alt="" controls
                // onTimeUpdate={handleTime}
                />
    




    if(video){
        // return(<VideoPlayer url={video.videoUrl} />)
        return(
            <div className="theater">
                <div>
                    {vid || "no vid"}
                    {/* {document.getElementById("vid")} */}
                    
                    <h2>{video.title}</h2>
                    <h4>{`Uploaded by User: ${video.uploader}`}</h4>
                    <p>{video.description}</p>
                    <p>If this worked, the time would be: {time}</p>
                </div>
                <CommentBox vid={vid}/>
            </div>
        )
    } else {
        return(
            <h1>Video Not Found</h1>
        )
    }
}

export default VideoPage