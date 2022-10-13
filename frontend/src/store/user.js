import csrfFetch from "./csrf";


const GET_USERS = '/api/users';

export const getUsers = ({users}) => {
    return Object.values(users)
}

export const fetchUsers = () => async(dispatch) => {
    let res = await csrfFetch(GET_USERS);
    let users = await res.json();
    dispatch({type: GET_USERS, users})
}

const usersReducer = (state={}, action) => {
    let newState = {...state};
    switch(action.type){
        case GET_USERS:
            return {...state, ...action.users}     
        default:
            return newState;
    }
}

export default usersReducer;