import React from "react";
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
                <li key={comment.id}>
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
                    <ul>
    
                        {roots.map( (root) => {
                            return formatComment(root);
                        })}
    
                    </ul>
    
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. */}
    
                </div>
                <Form time={time} comments={comments} id={props.id}/>
                {/* ERRORS SHOULD GO HERE */}
            </div>
        )
    }
}

export default CommentBox;