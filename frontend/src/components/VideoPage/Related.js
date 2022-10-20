import React from "react";
import HorizontalTile from "./HorizontalTile";

function Related(props){
    
    return(
        <ul id='related'>
            <HorizontalTile videoId={props.videoId} />
        </ul>
    )
}

export default Related;
