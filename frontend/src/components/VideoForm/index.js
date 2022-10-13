import { useState } from 'react';
import React from 'react';
import csrfFetch from '../../store/csrf';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

function VideoForm () {
    const [title, setTitle] = useState ("");
    const [description, setDescription] = useState ("");
    const [videoFile, setVideoFile] = useState(null)
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('video[title]', title);
        formData.append('video[description]', description);
        formData.append('video[uploader_id', sessionUser.id);
        if (videoFile) {
          formData.append('video[upload]', videoFile);
        }   // TEST THIS (STEP 7)

        // Upload?
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
        // console.log(file);
    }

    return (
        <form onSubmit={handleSubmit}>
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
    );
}

export default VideoForm;