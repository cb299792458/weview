import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteVideo, updateVideo } from "../../store/video";

function VideoEditItem({video}) {

    const [title, setTitle] = useState(video.title);
    const [description, setDescription] = useState(video.description);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newVideo = {
            id: video.id,
            title: title,
            description: description
        }
        
        return dispatch(updateVideo(newVideo))
        .then(
            history.push(`/videos/${video.id}`)
        );

    }

    const handleDelete = (e) => {
        e.preventDefault();
        return dispatch(deleteVideo(video.id))
        .then(
            history.push(`/videos/new`)
        );
    }

    return(
        <li key={video.id} id="video-edit-item">
            <video src={video.videoUrl} alt=""/>

            <form onSubmit={handleSubmit}>

                <div id="top-right">
                    <label>Title
                    <input type="text"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}/>
                    </label>

                    <button type="submit">Update Video</button>
                    <button type="button" onClick={handleDelete}>Delete Video</button>
                </div>

                <label id="description">
                    <textarea
                        value={description}
                        rows="10"
                        cols="50"
                        onChange={(e)=>setDescription(e.target.value)}/>
                </label>

            </form>

        </li>
    )
}

export default VideoEditItem;