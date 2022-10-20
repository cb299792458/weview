import csrfFetch from "./csrf";

const GET_VIDEOS = '/api/videos';
const RECEIVE_VIDEO = 'RECEIVE_VIDEO';
const REMOVE_VIDEO = 'REMOVE_VIDEO';

export const getVideos = ({videos}) => {
    return Object.values(videos)
}

export const getVideo = (videoId) => {
    return(
        (store) => {
            return store.videos[videoId]
        }
    )
};

export const fetchVideos = () => async(dispatch) => {
    let res = await fetch(GET_VIDEOS);
    let videos = await res.json();
    dispatch({type: GET_VIDEOS, videos})
}

export const fetchVideo = (videoId) => async(dispatch) => {
    const res = await csrfFetch(`/api/videos/${videoId}`);
    const video = await res.json();

    dispatch( {type: RECEIVE_VIDEO, video} );
}

export const deleteVideo = (videoId) => async(dispatch) => {
    const res = await csrfFetch(`/api/videos/${videoId}`, {
        method: 'DELETE'
    });
    if(res.ok){
        dispatch({ type: REMOVE_VIDEO, videoId });
        return res;
    }
}

export const updateVideo = (video) => async(dispatch) => {
    let res = await csrfFetch(`/api/videos/${video.id}`, {
        method: 'PATCH',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(video)
    });
    let newVideo = await res.json();
    dispatch({type: RECEIVE_VIDEO, video: newVideo});
    return res;
}

const videosReducer = (state = {}, action) => {
    let newState = {...state};
    switch(action.type){
        case RECEIVE_VIDEO:
            newState[action.video.id] = action.video;
            return newState; 
        case GET_VIDEOS:
            return {...state, ...action.videos};
        case REMOVE_VIDEO:
            delete(newState[action.videoId]);
            return newState;        
        default:
            return state;
    }
}
 
export default videosReducer;