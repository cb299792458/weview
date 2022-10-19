import csrfFetch from "./csrf"

const MAKE_LIKE = '/api/likes';
const RECEIVE_LIKE = "RECEIVE_LIKE";
const REMOVE_LIKE = "REMOVE_LIKE";


export const makeLike = (userId, videoId) => async(dispatch) => {
    const res = await csrfFetch( MAKE_LIKE, {
        method: 'POST',
        body: JSON.stringify({like: {userId: userId, videoId: videoId}})
    });

    let data = await res.json();

    if(!data.errors){
        // dispatch(createComment(data.comment))
        dispatch({type: RECEIVE_LIKE, like: data.like })
        return res;
    } else {
        throw data;
    }
}

export const getLikes = () => {
    return(
        (store) => {
            return Object.values(store.likes);
        }
    )
};

export const dislike = (likeId) => async(dispatch) => {
    const res = await csrfFetch( `/api/likes/${likeId}`, {
        method: 'DELETE'
    });

    let data = await res.json();

    if(!data.errors){
        // dispatch(createComment(data.comment))
        dispatch({type: REMOVE_LIKE, likeId: likeId});
        return res;
    } else {
        throw data;
    }
}

export const fetchLikes = (videoId) => async(dispatch) => {
    const res = await csrfFetch(`/api/likes/${videoId}`);
    const likes = await res.json();

    dispatch( {type: MAKE_LIKE, likes} );
}

const likesReducer = (state = {}, action) => {
    const nextState = {...state};
    switch(action.type){
        case MAKE_LIKE:
            return {...state, ...action.likes.likes}
        case RECEIVE_LIKE:
            nextState[action.like.id] = action.like;
            return nextState;
        case REMOVE_LIKE:
            delete nextState[action.likeId];
            return nextState;
        default:
            return state;
    }
}
 
export default likesReducer;