import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { fetchVideo, getVideo } from "../../store/video";

function VerticalTile({videoId}) {
    const video = useSelector(getVideo(videoId));
    const dispatch = useDispatch();
    const [color,setColor] = useState("")

    useEffect( () => {
        dispatch(fetchVideo(video.id))
        setColor(Math.random().toString(16).substr(-6));
    },[]);
    
    return(
        <li id="vertical-tile">
            <Link to={`/videos/${video.id}`}>
                <video src={video.videoUrl} alt="" />
                <div id="tile-with-pic">

                    <div id="icon" style={{backgroundColor: "#" + color}}>
                        <h2>{video.uploader.slice(0,1).toUpperCase()}</h2>
                    </div>

                    <div>
                        <h4>{video.title}</h4>
                        <div id="tile-details">
                            <h5>{video.uploader}</h5>
                            <h5>{video.likes ? video.likes.length : 0} likes</h5>
                            <h5>{video.timeAgo} ago</h5>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default VerticalTile;