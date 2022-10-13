import { useDispatch, useSelector } from "react-redux";
import { fetchVideos, getVideos } from "../../store/video";
import React, { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function VideoIndex(){
    const videos = useSelector(getVideos);
    // console.log(videos);

    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(fetchVideos());
    },[]);


    return(
        <>
            <h2>All Videos (development only obv)</h2>
            <ul>
                {videos.map( (video) => {
                    return <li key={video.id}>
                        <Link to={`/videos/${video.id}`}>{video.title}</Link>
                        </li>
                })}
            </ul>
        </>
    )
}

export default VideoIndex;