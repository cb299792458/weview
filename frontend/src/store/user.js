import csrfFetch from "./csrf";
import { removeUser } from "./session";


const GET_USERS = '/api/users';
const RECEIVE_USER = 'RECEIVE_USER';
const REMOVE_USER = 'REMOVE_USER';

export const getUsers = ({users}) => {
    return Object.values(users)
}

export const fetchUsers = () => async(dispatch) => {
    let res = await csrfFetch(GET_USERS);
    let users = await res.json();
    dispatch({type: GET_USERS, users})
}

export const deleteUser = (userId) => async(dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}`, {
        method: 'DELETE'
    });
    if(res.ok){
        dispatch({ type: REMOVE_USER, userId });
        dispatch(removeUser(userId));
        return res;
    }
}

export const updateUser = (user) => async(dispatch) => {
    let res = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(user)
    });
    let newUser = await res.json();
    dispatch({type: RECEIVE_USER, user: newUser});
    return res;
}

const usersReducer = (state={}, action) => {
    let newState = {...state};
    switch(action.type){
        case GET_USERS:
            return {...state, ...action.users};
        case REMOVE_USER:
            delete(newState[action.userId]);
            return newState;
        default:
            return newState;
    }
}

export default usersReducer;