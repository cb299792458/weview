import csrfFetch from "./csrf";

const CREATE_COMMENT = '/api/comments';
const createComment = (comment) => ({
    type: CREATE_COMMENT,
    comment
})


export const writeComment = (comment) => async(dispatch) => {
    const res = await csrfFetch(CREATE_COMMENT, {
        method: 'POST',
        body: JSON.stringify({comment: comment})
    });

    let data = await res.json();

    // This doesn't do anything...
    if(!data.errors){
        dispatch(createComment(data.comment))
        return res;
    } else {
        throw data;
    }
}

