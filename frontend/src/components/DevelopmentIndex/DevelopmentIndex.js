import { useDispatch, useSelector } from "react-redux";
import { fetchVideos, getVideos } from "../../store/video";
import React, { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { fetchUsers, getUsers } from "../../store/user";

function DevelopmentIndex(){
    const videos = useSelector(getVideos);
    const users = useSelector(getUsers);

    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(fetchVideos());
        dispatch(fetchUsers());
    },[]);


    return(
        <>
            <h2>All Videos</h2>
            <ul>
                {videos.map( (video) => {
                    return <li key={video.id}>
                        <Link to={`/videos/${video.id}`}>{video.title}</Link>
                        </li>
                })}
            </ul>
            
            <h2>All Users</h2>
            <ul>
                {users.map( (user) => {
                    return <li key={user.id}>
                        <Link to={`/search/?u=${user.username}`}>
                            {`User #${user.id} has username: ${user.username}`}
                        </Link>
                    </li>
                })}
            </ul>
        </>
    )
}

export default DevelopmentIndex;