import csrfFetch from "./csrf";

const RECEIVE_VIDEO = '/api/video';
const GET_VIDEOS = '/api/videos';

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

const videosReducer = (state = {}, action) => {
    let newState = {...state};
    switch(action.type){
        case RECEIVE_VIDEO:
            newState[action.video.id] = action.video;
            return newState; 
        case GET_VIDEOS:
            return {...state, ...action.videos}          
        default:
            return state;
    }
}
 
export default videosReducer;