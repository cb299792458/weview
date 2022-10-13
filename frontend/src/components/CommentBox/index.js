import React from "react";

function CommentBox(props) {
    console.log(props.vid);

    return(
        <div>
            <h3>Comments</h3>
            <p> yo {props.vid}</p>
        </div>
    )
}

export default CommentBox;