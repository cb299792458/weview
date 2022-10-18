import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { writeComment } from "../../store/comment";
// import csrfFetch from "../../store/csrf";

function Form(props) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);

    const parentId = props.focus ? props.focus.id : null;
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!sessionUser){alert("You must be logged in to do that!")}
        else{
            let comment = {
                body: body,
                timestamp: props.time, 
                videoId: props.id,
                commenterId: sessionUser.id,
                parentId: parentId,
                commenter: sessionUser.username
            }
                  
            return dispatch(writeComment(comment))
                .then(
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
        <form onSubmit={handleSubmit}>
            <input
                onChange={(e)=>{setBody(e.target.value)}}
                value={body}>

            </input>
            <button>{!props.focus ? "Comment" : "Reply"}</button>
        
            <ul>
                {errors && errors.map(error => <li key={error}>{error}</li>)}
            </ul>
        </form>
    )
}

export default Form;