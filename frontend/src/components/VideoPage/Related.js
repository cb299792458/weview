import React, { useEffect } from "react";
import HorizontalTile from "./HorizontalTile";

function Related(props){
    const videos = props.videos


    
    return(
        <ul id='related'>
            {videos.map( (video) => {
                    return(
                        <HorizontalTile videoId={video.id} />
                    )
                })}
        </ul>
    )
}

export default Related;