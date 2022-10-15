import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from "react";
import {getVideo, fetchVideo} from '../../store/video'
import CommentBox from "../CommentBox";
import './VideoPage.css';

function VideoPage() {
    const dispatch = useDispatch();
    
    const {videoId} = useParams();
    const video = useSelector(getVideo(videoId));
    
    useEffect( () => {
        dispatch(fetchVideo(videoId));
    }, []);
    
    const [timeDisplay, setTimeDisplay] = useState(true);
    const time = useRef(0);

    const displayTime = (e) => {
        time.current = document.getElementById("vid").currentTime;

        setTimeDisplay(!timeDisplay); // This does nothing except rerender the timer.
    }

    const vid = <video 
        id="vid"
        src={ video ? video.videoUrl : null} 
        alt="" controls
        onTimeUpdate={displayTime}
    />
    
    if(video){
        const comments = video.comments;
        return(
            <div className="theater">
                <div>
                    {vid || "no vid"}
                    
                    <p id="demo">Move to a new position in the video:</p>

                    <h2>{video.title}</h2>
                    <h4>{`Uploaded by User: ${video.uploader}`}</h4>
                    <p>{video.description}</p>
                    
                    <p>If this worked, the time would be: {time.current}</p>
                </div>
                {comments ? <CommentBox vid={vid} comments={comments}/> : <p>loading comments</p>}
            </div>
        )
    } else {
        return(
            <h1>Video Not Found</h1>
        )
    }
}

export default VideoPage