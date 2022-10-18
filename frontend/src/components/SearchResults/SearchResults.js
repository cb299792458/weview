import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min"
import { fetchVideos, getVideos } from "../../store/video";
import React, { useEffect } from "react";
import VideoTile from "./VideoTile";

function SearchResults() {

    const location = useLocation();
    const dispatch = useDispatch();

    const allVideos = useSelector(getVideos);
    useEffect( () => {
        dispatch(fetchVideos());
    },[]);

    const type = location.search[1];
    const query = location.search.slice(3);

    let videos;
    if(type === "q"){
        videos = allVideos.filter( (video) => {
            return video.title.includes(query);
        });
    } else if(type === "u"){
        videos = allVideos.filter( (video) => {
            return video.uploader === query;
        });
    } else {
        videos = [];
    }

    if(videos.length !== 0){
        return(
            <ul className="search-results">
                {videos.map( (video) => {
                    return(
                        <Link to={`/videos/${video.id}`}>
                            <VideoTile key={video.id} video={video} />
                        </Link>
                    )
                })}
            </ul>
        )
    } else {
        return(
            <ul className="search-results">
                <li id="no-results">No Videos Found</li>
            </ul>)
    }
}

export default SearchResults