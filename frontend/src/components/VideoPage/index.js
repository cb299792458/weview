import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from "react";
import {getVideo, fetchVideo} from '../../store/video'

function VideoPage() {
    const {videoId} = useParams();
    const video = useSelector(getVideo(videoId));
    // console.log(video);
    const dispatch = useDispatch();
    
    useEffect( () => {
        dispatch(fetchVideo(videoId));
    }, []);

    if(video && video.videoUrl){
        return(
            <>
                <video src={video.videoUrl} alt="" controls/>
                <h2>{video.title}</h2>
                <h4>{`Uploaded by User #${video.uploaderId}`}</h4>
                <p>{video.description}</p>
            </>
        )
    } else {
        return(
            <h1>Video Not Found</h1>
        )
    }


}

export default VideoPage