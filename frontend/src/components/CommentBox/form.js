import React, { useState } from "react";
import { useSelector } from "react-redux";
import csrfFetch from "../../store/csrf";

function Form(props) {

    const sessionUser = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!sessionUser){alert("You must be logged in")}
        else{
            let comment = {
                body: body,
                timestamp: props.time, 
                videoId: props.id,
                commenterId: sessionUser.id,
                parentId: null
            }
            
            // console.log(comment);
            props.comments.push(comment)

            const res = await csrfFetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({comment: comment})
            });

            if(res.ok){
                setBody("");
            }
        }
    }
    const [body, setBody] = useState("");

    return(
        <form onSubmit={handleSubmit}>
            <input
                onChange={(e)=>{setBody(e.target.value)}}
                value={body}>

            </input>
            <button>Comment</button>
        </form>
    )
}

export default Form;