import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { writeComment } from "../../store/comment";
// import csrfFetch from "../../store/csrf";

function CommentForm(props) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);

    const parentId = props.focus ? parseInt(props.focus) : null;
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!sessionUser){alert("You must be logged in to do that!")}
        else{
            let comment = {
                body: body,
                timestamp: props.time, 
                videoId: props.id,
                commenterId: sessionUser.id,
                // commenter: sessionUser.username, COMMENTER BUG
                parentId: parentId
            }
                  
            return dispatch(writeComment(comment))
                .then(
                    comment.commenter = sessionUser.username,
                    props.comments.push(comment),
                    setBody("")
                )
                .catch(async (data) => {
                    setErrors(data.errors);
                });
        }
    }
    const [body, setBody] = useState("");

    return(
        <>
            <form onSubmit={handleSubmit} className="chat-form">
                <input
                    id="chat-input"
                    onChange={(e)=>{setBody(e.target.value)}}
                    value={body}>

                </input>
                <button id="chat-button">{ !props.focus ? "Comment" : "Reply"}</button>
            
            </form>
            <ul>
                {errors && errors.map(error => <li key={error}>{error}</li>)}
            </ul>
        </>
    )
}

export default CommentForm;