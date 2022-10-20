import { useEffect, useState } from 'react';
import React from 'react';
import csrfFetch from '../../store/csrf';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { fetchVideos, getVideos } from '../../store/video';
import VideoEditItem from './VideoEditItem';

function VideoForm () {
    const [title, setTitle] = useState ("");
    const [description, setDescription] = useState ("");
    const [videoFile, setVideoFile] = useState(null)
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('video[title]', title);
        formData.append('video[description]', description);
        formData.append('video[uploader_id', sessionUser.id);
        if (videoFile) {
          formData.append('video[upload]', videoFile);
        }

        const res = await csrfFetch('/api/videos', {
            method: 'POST',
            body: formData
        });

        if(res.ok){
            const message = await res.json();
            
            setTitle("");
            setDescription("");
            setVideoFile(null);

            history.push(`/videos/${message.id}`)
        }

    }

    const handleFile = e => {
        const file = e.currentTarget.files[0];
        setVideoFile(file);
    }

    const allVideos = useSelector(getVideos);
    useEffect( () => {
        dispatch(fetchVideos());
    },[]);
    const userVideos = allVideos.filter( (video) => {
        return video.uploader === sessionUser.username;
    });

    return (
        <div id="video-form">
            <h2>Upload a new video</h2>
            <form onSubmit={handleSubmit} id="upload-form">
                <label>Title
                <input type="text"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}/>
                </label>
                <label>Description
                    <input type="text"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}/>
                </label>

                <input type="file" onChange={handleFile}/>

                <button type="submit">Upload Video</button>
            </form>

            <h2>Edit your videos</h2>
            <ul id="edit-list">
                {userVideos.map( (video) => {
                    return(
                        <VideoEditItem video={video} />
                    )
                })}
            </ul>
        </div>
    );
}

export default VideoForm;