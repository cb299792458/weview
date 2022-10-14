import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from "react";
import {getVideo, fetchVideo} from '../../store/video'
import CommentBox from "../CommentBox";
import './VideoPage.css';
// import { VideoPlayer } from "./VideoPlayer";
import ReactPlayer from "react-player";

function VideoPage() {
    const dispatch = useDispatch();
    
    const {videoId} = useParams();
    const video = useSelector(getVideo(videoId));
    
    useEffect( () => {
        dispatch(fetchVideo(videoId));
        time.current = time.current +1
    }, []);
    
    const [timer, setTimer] = useState(0);
    const time = useRef(0);

    // const handleTime = (e) => console.log(document.getElementById("vid").currentTime); //this is the time
    const handleTime = (e) => {
        time.current = document.getElementById("vid").currentTime;
        setTimer(timer+1);
    }

    const vid = <video 
        id="vid"
        src={ video ? video.videoUrl : null} 
        alt="" controls
        onTimeUpdate={handleTime}
        // onTimeUpdate={myFunction}
    />
    
    // function myFunction() {
    //     document.getElementById("demo").innerHTML = "You moved to position " + document.getElementById("vid").currentTime
    //                       }
    
    
    if(video){

        // const vid = document.createElement('video');
        // vid.setAttribute("src",video.videoUrl);


        const comments = video.comments;
        // return(<ReactPlayer playing={true}
        //     url={file}/>)
        // return(<VideoPlayer url={video.videoUrl} />)
        return(
            <div className="theater">
                <div>
                    {vid || "no vid"}
                    
                    <p id="demo">Move to a new position in the video:</p>

                    <button onClick={() => {setTimer(timer+1)}}>press</button>
                    {/* {(myFunction())} */}

                    <h2>{video.title}</h2>
                    <h4>{`Uploaded by User: ${video.uploader}`}</h4>
                    <p>{video.description}</p>
                    {/* <p>If this worked, the time would be: {vid.currentTime = 0}s</p> */}
                    
                    <p>If this worked, the time would be: {time.current}</p>
                </div>
                <CommentBox vid={vid} comments={comments ? comments : null}/>



            </div>
        )
    } else {
        return(
            <h1>Video Not Found</h1>
        )
    }
}

export default VideoPage