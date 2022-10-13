import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from "react";
import {getVideo, fetchVideo} from '../../store/video'
// import { fetchUsers, getUsers } from "../../store/user";
import CommentBox from "../CommentBox";
import './VideoPage.css';

function VideoPage() {
    const dispatch = useDispatch();
    
    const {videoId} = useParams();
    const video = useSelector(getVideo(videoId));

    // const users = useSelector(getUsers);
    // const uploader = users.find( user => user.id === video.uploaderId);
    
    useEffect( () => {
        dispatch(fetchVideo(videoId));
        // dispatch(fetchUsers)
    }, []);
    let vid;
    if(video){
        return(
            <div className="theater">
                <div>
                    {vid = <video src={video.videoUrl} alt="" controls/>}
                    <h2>{video.title}</h2>
                    <h4>{`Uploaded by User: ${video.uploader}`}</h4>
                    <p>{video.description}</p>
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