import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos, getVideos } from "../../store/video";
import VerticalTile from "./VerticalTile";

function HomePage() {

    const videos = useSelector(getVideos);
    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(fetchVideos());
    },[]);

    const videosCopy = [...videos].slice(0,24);

    if(videosCopy){
        return(
            <ul id='recommended'>
                {videosCopy.map( (video) => {
                    return(
                        <VerticalTile videoId={video.id} key={video.id}/>
                    )
                })}

            </ul>
        )
    }

}

export default HomePage;