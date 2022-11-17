import { useEffect, useState } from 'react';
import React from 'react';
import csrfFetch from '../../store/csrf';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { fetchVideos, getVideos } from '../../store/video';
import VideoEditItem from './VideoEditItem';
import arrow from '../../arrow.png';

function VideoForm () {
    const [title, setTitle] = useState ("");
    const [description, setDescription] = useState ("");
    const [videoFile, setVideoFile] = useState(null)
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const [submitted,setSubmitted] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        if(title && description && fileType()){
            setSubmitted(true);
    
            const formData = new FormData();
            formData.append('video[title]', title);
            formData.append('video[description]', description);
            formData.append('video[uploader_id]', sessionUser.id);
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
        } else {
            alert('There is an issue with your upload. Check the error messages at the bottom of the form.')
        }
    }

    const fileType = () => {
        return videoFile && videoFile.name[videoFile.name.length-3] === 'm'
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
        <div id='upload-edit-column'>
            <h2>Upload a new video</h2>
            <div id="video-form">
                <div className='upload-form'>
                    <img src={arrow} alt='' id='arrow'/>
                    <form onSubmit={handleSubmit}>

                        <div id="top-right">
                            <label>Title: 
                            <input type="text"
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}/>
                            </label>
                            <input type="file" onChange={handleFile}/>
                            <button type="submit">Upload Video</button>

                        </div>

                        <label id="edit-description">
                            <textarea
                                value={description}
                                rows="10"
                                cols="80"
                                onChange={(e)=>setDescription(e.target.value)}/>
                        </label>

                        <ul>
                            {title ? '' : <li>Title can't be blank</li>}
                            {description ? '' : <li>Description can't be blank</li>}
                            {fileType() ? '' : <li>Video file must be .mp4 or .mov</li>}
                            {submitted ? <li>Uploading...</li> : ''}
                        </ul>
                    </form>

                </div>
            </div>

            <h2>Edit your videos</h2>
            
            <ul id="edit-list">
                {userVideos.map( (video) => {
                    return(
                        <VideoEditItem video={video} key={video.id}/>
                    )
                })}
            </ul>

        </div>
    );
}

export default VideoForm;