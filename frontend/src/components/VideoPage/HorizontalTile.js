import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { fetchVideo, getVideo } from "../../store/video";

function HorizontalTile({videoId}) {
    let video0 = useSelector(getVideo(videoId));
    let video1 = useSelector(getVideo(1));
    let video = video0 || video1;

    const dispatch = useDispatch();
    const [color,setColor] = useState("")

    useEffect( () => {
        dispatch(fetchVideo(videoId));
        dispatch(fetchVideo(1));
        setColor(Math.random().toString(16).substr(-6));
    },[]);
    
    if( video ){
        return(
            <li id="horizontal-tile" key={video.id}>
                <h4>You may also like...</h4>
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
}

export default HorizontalTile;