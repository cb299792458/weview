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

    if(video){
        return(
            <>
                <video src={video.videoUrl} alt="" controls/>
                <h2>{video.title}</h2>
                <h4>{`Uploaded by User ${video.uploader_id}`}</h4>
                <p>{video.description}</p>
            </>
        )
    }


}

export default VideoPage