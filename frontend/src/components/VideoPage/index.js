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
    const duration = useRef(0);

    const updateTime = (e) => {
        time.current = document.getElementById("vid").currentTime;
        duration.current = document.getElementById("vid").duration;
        
        setTimeDisplay(!timeDisplay); // This does nothing except rerender the timer.
    }
    
    const vid = <video 
    id="vid"
    src={ video ? video.videoUrl : null} 
    alt="" controls
    onTimeUpdate={updateTime}
    />
    
    if(video){
        const comments = video.comments;
        return(
            <div className="theater">
                <div>
                    {vid || "no vid"}
                    
                    <h2>{video.title}</h2>
                    <h4>{`Uploaded by User: ${video.uploader}`}</h4>
                    <p>{video.description}</p>
                    
                </div>

                {comments ? <CommentBox
                    time={time.current}
                    comments={comments}
                    duration={duration.current}
                    id={videoId}
                /> : <p>loading comments</p>}

            </div>
        )
    } else {
        return(
            <h1>Video Not Found</h1>
        )
    }
}

export default VideoPage