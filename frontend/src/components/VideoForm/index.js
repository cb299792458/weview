import { useState } from 'react';
import React from 'react';

function VideoForm () {
    const [title, setTitle] = useState ("");
    const [description, setDescription] = useState ("");
    const [videoFile, setVideoFile] = useState(null)

    const handleSubmit = async e => {
        e.preventDefault();

        e.preventDefault();
        const formData = new FormData();
        formData.append('video[title]', title);
        formData.append('video[description]', description);
        if (videoFile) {
          formData.append('video[file]', videoFile);
        }   // TEST THIS (STEP 7)

        setTitle("");
        setDescription("");
    }

    const handleFile = e => {
        const file = e.currentTarget.files[0];
        setVideoFile(file);
        console.log(file);
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