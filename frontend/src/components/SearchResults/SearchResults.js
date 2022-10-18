import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { fetchVideos, getVideos } from "../../store/video";
import React, { useEffect } from "react";
import VideoTile from "./VideoTile";

function SearchResults() {

    const query = useParams();
    const dispatch = useDispatch();

    const videos = useSelector(getVideos);
    useEffect( () => {
        dispatch(fetchVideos());
    },[]);

    return(
        <div className="search-results">
            <ul className="search-results">
                {videos.map( (video) => {
                    return(
                        <VideoTile key={video.id} video={video} />
                    )
                })}
            </ul>
        </div>
    )
}

export default SearchResults