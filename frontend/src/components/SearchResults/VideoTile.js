import React from "react";

function VideoTile({video}) {
    return(
        <li>
            <div className="video-tile">
                <video src={video.videoUrl} alt="" disabled={true}></video>
                <div className="video-details">
                    <h1>{video.title}</h1>
                    <h2>{video.uploader}</h2>

                    <h2>{video.description}</h2>
                </div>
            </div>

        </li>
    )

}

export default VideoTile;