import React, { useState } from "react";
import Form from "./form";

function formatTime(time) {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    const tenths = Math.floor((time % 1) * 10);
    let [minLeadZero, secLeadZero] = ["",""]
    if(mins<10){minLeadZero=0}
    if(secs<10){secLeadZero=0}

    return(`${minLeadZero}${mins}:${secLeadZero}${secs}.${tenths}`)
}



function CommentBox(props) {
    let comments = props.comments;
    comments.sort( (a,b) => a.timestamp - b.timestamp );
    let time = props.time;
    const roots = comments.filter( comment => comment.parentId === null);
    const [focus, setFocus] = useState(null);

    const handleClick = (e) => {
        setFocus(e.target);
        e.target.classList.toggle('focus')
        if(focus){ // HELP
            console.log(focus.id, "focus id");
            console.log(e.target.id, "targetid");
            console.log(focus.id === e.target.id);
        }
    }

    function formatComment(comment){

        const children = comments.filter((otherComment)=>{
            return comment.id === otherComment.parentId;
        });

        const childrenList = 
            <ul>
                {children.map((child)=>{
                    return formatComment(child);
                })}
            </ul>

        

        if(time >= comment.timestamp){
            return(
                <li key={comment.id} 
                    id={comment.id} 
                    onClick={handleClick}
                    className={ focus && comment.id === focus.id ? "focus" : "" }>
                
                    {`${comment.commenter} @ ${formatTime(comment.timestamp)}`}
                    <br></br>
                    {`${comment.body}`}
                    {children && childrenList}
                </li>
            )
        } else {return null}
    }



    if(comments){
        return(
            <div>
                <div id="chat">
                    { time!==0 ? <h5>Timed Comments at {formatTime(time)} / {formatTime(props.duration)}</h5> : <h5>Timed Comments</h5>} 
                    <br></br>
                    <ul>
    
                        {roots.map( (root) => {
                            return formatComment(root);
                        })}
    
                    </ul>
    
                </div>
                <Form time={time} comments={comments} id={props.id} focus={focus}/>
                {/* ERRORS SHOULD GO HERE */}
            </div>
        )
    }
}

export default CommentBox;