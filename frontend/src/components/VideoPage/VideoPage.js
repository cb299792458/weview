import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from "react";
import {getVideo, fetchVideo, getVideos, fetchVideos} from '../../store/video'
import CommentBox from "../CommentBox";
import { Link } from "react-router-dom";
import pp from "../../pp.png";
import like from "../../like.png";
import liked from "../../liked.png";
import { dislike, fetchLikes, getLikes, makeLike } from "../../store/like";
import Related from "./Related";

function VideoPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const {videoId} = useParams();
    const video = useSelector(getVideo(videoId));
    const likes = useSelector(getLikes());
    const videos = useSelector(getVideos);
    // const video = videos.find( (video) => {
    //     return video.id === videoId;
    // });

    const [subs, setSubs] = useState(0);
    let comments = [];
    const [likeCount, setLikeCount] = useState(likes.length);
    

    useEffect( () => {
        dispatch(fetchVideo(videoId));
        dispatch(fetchLikes(videoId));
        // dispatch(fetchVideos());

        setSubs(Math.floor(Math.random()*10000));
    }, []);


    useEffect( () => {
        dispatch(fetchLikes(videoId));
    }, [likeCount]);
    
    
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
    
    if(video && video.likes){
        
        comments = video.comments;

        const likers = likes.map( (like) => {return like.userId} );
        const toggleLike = () => {
            if(!sessionUser){return alert("You must be logged in to do that!")}
            if(likes){
                if(likers.includes(sessionUser.id)){
                    console.log("DISLIKING");
                    const like = likes.find( (like) => like.userId === sessionUser.id )
                    setLikeCount(likeCount-1);

                    return dispatch(dislike(like.id))
                    .catch(async (data) => {
                        console.log(data.errors);
                    })
                } else {
                    console.log("LIKING");
                    setLikeCount(likeCount+1);
                    return dispatch(makeLike(sessionUser.id, videoId))
                }
            }
        }
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
                                <h6>{subs} subscribers</h6>
                            </div>
                        </div>
                    </Link>
                    <div id="description">
                        <span id="description-header">
                            <img src={sessionUser && likes && likers.includes(sessionUser.id) ? liked : like} alt="" id="like" onClick={toggleLike}/>
                            <p>{`${likes ? likes.length : 0} likes`}</p>
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
                    {/* <Related vidoes={videos} videoId={video.id}/> */}
                </div>
            </>
        )
    } else {
        return(
            <h1>Loading video...</h1>
        )
    }
}

export default VideoPage