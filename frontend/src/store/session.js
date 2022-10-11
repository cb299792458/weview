import csrfFetch, { storeCSRFToken } from "./csrf"

export const SET_USER = '/api/session';
export const REMOVE_USER = '/api/session';
export const CREATE_USER = '/api/users';

export const setUser = (user) => ({
    type: SET_USER,
    user
})

export const removeUser = () => ({
    type: REMOVE_USER
})

export const createUser = (user) => ({
    type: CREATE_USER,
    user
})

export const signupUser = (user) => async(dispatch) => {
    const res = await csrfFetch(CREATE_USER, {
        method: 'POST',
        body: JSON.stringify(user)
    })
    
    let data = await res.json();

    if(!data.errors){
        storeCurrentUser(data.user);
        dispatch(createUser(data.user));
        dispatch(setUser(data.user));
        return res;
    } else {
        throw data;
    }

}

export const loginUser = (user) => async(dispatch) => {
    const res = await csrfFetch(SET_USER, {
        method: 'POST',
        body: JSON.stringify(user)
    })
    let data = await res.json();
    
    if(!data.errors){
        // console.log('res ok')
        dispatch(setUser(data.user));
        return res;
    } else {
        throw data;
    }
}

export const logoutUser = userId => async dispatch => {
    const res = await csrfFetch(REMOVE_USER, {
        method: 'DELETE'
    })
    storeCurrentUser(null)
    dispatch(removeUser(userId)) // don't need id
    return res;
}

const storeCurrentUser = user => {
    if (user) {
        const data = JSON.stringify(user)
        sessionStorage.setItem('currentUser', data)
    } else sessionStorage.removeItem('currentUser')
}

export const restoreSession = () => async dispatch => {
    const res = await csrfFetch(SET_USER);
    storeCSRFToken(res);
    const data = await res.json();
    storeCurrentUser(data.user);
    dispatch(setUser(data.user));
}

const sessionReducer = (state = initialState, action) => {
    // const nextState = {...state}
    switch(action.type) {
        case SET_USER:
            // nextState["user"] = action.user;
            return { ...state, user: action.user };
            // return nextState;
        case REMOVE_USER:
            // const nextState = {...state};
            // delete nextState[action.userId];
            // return nextState;
            return {...state, user: null}
        default:
            return state
    }
}

const initialState = {
    user: JSON.parse(sessionStorage.getItem('currentUser'))
}

export default sessionReducer;