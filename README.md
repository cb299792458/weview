![alt text](https://github.com/cb299792458/weview/blob/main/frontend/src/logo.png "WeView")

[Hosted by Heroku](https://we-view-aa.herokuapp.com)

## Overview
WeView is a video hosting and streaming platform with a focus on education. Teachers can upload videos, and students can watch them anywhere, anytime. While they watch, students can leave comments, but unlike YouTube, where comments appear at the bottom of the video, WeView comments are timestamped, and by default will appear at the same time in the video that they were made. This feature replicates the interactivity of a live lesson on Zoom without the need for all the students to be watching concurrently. Students can ask and answer questions right in the browser as they watch, or turn them off if they find it distracting. 

## Technologies
- Javascript
- Ruby on Rails
- React Redux
- Heroku
- AWS S3
- HTML5 and CSS

## Special Features

#### Modal Account Management
WeView has a fully functioning account management and User Authentication System. A modal login menu is used to allow users to signup, login, or logout while watching a video without losing their progress. Logging in, signing up, and updating your account all actually use the same modal window, which changes based on context. The styling is based on Google's login form, which is used by YouTube, its subsidary.
![alt text](https://github.com/cb299792458/weview/blob/main/screenshots/signin.png "WeView")
![alt text](https://github.com/cb299792458/weview/blob/main/screenshots/signup.png "WeView")
![alt text](https://github.com/cb299792458/weview/blob/main/screenshots/update.png "WeView")

#### Nested Live Comments
Because viewers are expected to both ask and answer questions, it is important parent comments and replies are clearly linked, even if they are created at different times. To accomplish this, all comments are rendered as `li` elements in a larger `ul`, and replies to a comment are rendered in a nested `ul` under their parent. Replies can have their own reply `ul` elements, and indenting is used to show the overall structure. The comment window only renders the root comments directly, once their timestamp has passed, and replies render below their parents only after their own separate timestamps. Here is the function used to format comments for display.

```javascript
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
            <div id="comment-top">
                <Link to={`/search/?u=${comment.commenter}`}>{comment.commenter}</Link>
                <pre>     </pre>
                <p>{formatTime(comment.timestamp)}</p>
            </div>

            {`${comment.body}`}
            <br></br>

            <span id={comment.id} onClick={handleClick}>{ focus === comment.id ? '*Replying...*' : 'Reply' }</span>

            {children && childrenList}
        </li>

    if(time >= comment.timestamp || filterComments){
        return(
            commentLi
        )
    } else {return null}
}
```

## Future Direction
The comment system requires more styling for readability and aesthetics. More control over comments would also be desireable, such that a video's uploader can remove bad comments or pin/highlight good ones. Voting on comments by viewers is also planned, in which viewers can mark comments as good questions, good answers, or just a comment that they like, and comments can be filtered so that only highly voted comments are visible. 

## Special Thanks
- Thanks to Ayce and the rest of the staff at App Academy, as a former teacher I appreciate all your hard work.
- Thanks to my cohort-mates for their continued help and support, and congratulations to them as well.
- Thanks to all my former students for inspiring me and helping us teach each other. 
