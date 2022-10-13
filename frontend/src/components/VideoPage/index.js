import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from "react";
import {getVideo, fetchVideo} from '../../store/video'
import CommentBox from "../CommentBox";
import './VideoPage.css';
import { VideoPlayer } from "./VideoPlayer";

function VideoPage() {
    const dispatch = useDispatch();
    
    const {videoId} = useParams();
    const video = useSelector(getVideo(videoId));
    
    useEffect( () => {
        dispatch(fetchVideo(videoId));
    }, []);

    let vid;


    // const viddy = document.createElement('video');
    // viddy.src = video.videoUrl;


    if(video){
        return(<VideoPlayer url={video.videoUrl} />)
        // return(
        //     <div className="theater">
        //         <div>
        //             {vid = <video src={video.videoUrl} alt="" controls/>}
        //             {/* {viddy} */}
        //             <h2>{video.title}</h2>
        //             <h4>{`Uploaded by User: ${video.uploader}`}</h4>
        //             <p>{video.description}</p>
        //         </div>
        //         <CommentBox vid={vid}/>
        //     </div>
        // )
    } else {
        return(
            <h1>Video Not Found</h1>
        )
    }
}

export default VideoPage