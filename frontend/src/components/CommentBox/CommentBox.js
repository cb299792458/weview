import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CommentForm from "./CommentForm";

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

    const handleClick = (e) => {
        if(e){
            e.preventDefault();
            if(focus !== parseInt(e.target.id)){
                setFocus(parseInt(e.target.id));
            } else {
                setFocus(null);
            }
        }
    }
    handleClick();

    const colors = ["black", "maroon", "red", "purple", "green", "lime", "olive", "navy"]
    
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
                className={ commentClass }> 
                <div id="whole-comment">
                    <div id="icon" style={{backgroundColor: comment.id ? colors[comment.id % 8] : "blue"}}>
                        <h2>{comment.commenter.slice(0,1).toUpperCase()}</h2>
                    </div>
                    <div id="comment-text">
                        <div id="comment-top">
                            <Link to={`/search/?u=${comment.commenter}`}><h5>{comment.commenter}</h5></Link>
                            <h6>{formatTime(comment.timestamp)}</h6>
                            <button className="reply" id={comment.id} onClick={handleClick}>{ focus === comment.id ? 'Replying...' : 'Reply' }</button>
                        </div>

                        {`${comment.body}`}

                        {children.length ? childrenList : ''}

                    </div>

                </div>
            </li>

        if(time >= comment.timestamp || filterComments){
            return(
                commentLi
            )
        } else {return null}
    }



    if(comments){
        const rootLis = roots.map( (root) => {
            return formatComment(root);
        });
        // console.log(!!rootLis[0]);
        return(
            <div id="comments">
                {showComments && <div id="chat-filter" onClick={()=>{setFilterComments(!filterComments)}}>
                    <h3>{filterComments ? 'All Comments' : 'Timed Comments'}</h3>
                    { time!==0 ? <h3>{formatTime(time)} / {formatTime(props.duration)}</h3> : <h3>Click to Toggle</h3>} 
                </div>}
                {showComments && <div id="chat">
                    <ul key={comments}>

                        {!!rootLis[0] ? rootLis : <li>No Comments Yet...</li>}

                    </ul>
        
                </div>}
                {showComments && <CommentForm time={time} comments={comments} id={props.id} focus={focus}/>}
                <div id="chat-hider" onClick={()=>{setShowComments(!showComments)}}>
                    <h4>{showComments ? `Hide Comments` : `Show Comments`}</h4>
                </div>
            </div>
        )
    }
}

export default CommentBox;