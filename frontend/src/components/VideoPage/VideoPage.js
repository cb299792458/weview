import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from "react";
import {getVideo, fetchVideo} from '../../store/video'
import CommentBox from "../CommentBox";
import { Link } from "react-router-dom";
import pp from "../../pp.png";
import like from "../../like.png";

function VideoPage() {
    const dispatch = useDispatch();
    
    const {videoId} = useParams();
    const video = useSelector(getVideo(videoId));
    let subs = '1.23M';


    useEffect( () => {
        dispatch(fetchVideo(videoId));
        // subs = Math.floor(Math.random()*10000);

    }, []);
    
    const [timeDisplay, setTimeDisplay] = useState(true);
    const time = useRef(0);
    const duration = useRef(0);

    const updateTime = (e) => {
        time.current = document.getElementById("vid").currentTime;
        duration.current = document.getElementById("vid").duration;
        console.log(time.current)
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
            <>
                <div id="video-col">
                    <div id="vid-box">
                        {vid || "no vid"}

                    </div>
                    
                    <h2 id="title">{video.title}</h2>
                    <Link to={`/search/?u=${video.uploader}`}>
                        <div id="uploader-badge">
                            <img src={pp} alt="" height="50px" width="50px" />
                            <div id="uploader-info">
                                <h3 id="uploader">{`${video.uploader}`}</h3>
                                <br></br>
                                <h6>{subs} subscribers</h6>
                                <br></br>
                            </div>
                        </div>
                    </Link>
                    <div id="description">
                        <span id="description-header">
                            <img src={like} alt="" id="like"/>
                            <p>0 likes</p>
                            <p>{video.timeAgo} ago</p>
                        </span>
                        <br></br>
                        {video.description}
                    </div>
                    
                </div>

                <div id="chat-col">
                    {comments ? <CommentBox
                        time={time.current}
                        comments={comments}
                        duration={duration.current}
                        id={videoId}
                    /> : <p>loading comments</p>}
                </div>
            </>
        )
    } else {
        return(
            <h1>Video Not Found</h1>
        )
    }
}

export default VideoPage