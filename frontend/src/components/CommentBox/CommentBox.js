import React, { useState } from "react";
import Form from "./CommentForm";

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
    const [focus, setFocus] = useState(0);
    const [showComments, setShowComments] = useState(true);
    const [filterComments, setFilterComments] = useState(false);

    window.addEventListener('click', (e) => {
        if(e.target.nodeName !== 'LI' && e.target.nodeName !== 'INPUT'){
            setFocus(null)
        }
    });

    const handleClick = (e) => {
        e.preventDefault();
        setFocus(e.target.id);        
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

        const commentClass = (parseInt(focus) === comment.id) ? "focus" : "comment";

        const commentLi =
            <li key={comment.id} 
                id={comment.id} 
                onClick={handleClick}
                className={ commentClass }> 
                
                {`${comment.commenter} @ ${formatTime(comment.timestamp)}`}
                <br></br>
                {`${comment.body}`}
                {children && childrenList}
            </li>

        if(time >= comment.timestamp || filterComments){
            return(
                commentLi
            )
        } else {return null}
    }



    if(comments){
        return(
            <>
                {showComments && <div id="chat-filter" onClick={()=>{setFilterComments(!filterComments)}}>
                    <h3>{filterComments ? 'All Comments' : 'Timed Comments'}</h3>
                    { time!==0 ? <h3>{formatTime(time)} / {formatTime(props.duration)}</h3> : ""} 
                </div>}
                {showComments && <div id="chat">
                    <ul>

                        {roots.map( (root) => {
                            return formatComment(root);
                        })}

                    </ul>
        
                    <Form time={time} comments={comments} id={props.id} focus={focus}/>
                </div>}
                <div id="chat-hider" onClick={()=>{setShowComments(!showComments)}}>
                    <h4>{showComments ? `Hide Comments` : `Show Comments`}</h4>
                </div>
            </>
        )
    }
}

export default CommentBox;