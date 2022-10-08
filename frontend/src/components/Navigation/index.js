import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { logoutUser } from "../../store/session"

export const Navigation = () => {

    const sessionUser = useSelector(state => state.session.user)

    const dispatch = useDispatch()
    
    const handleLogOut = () => {
        dispatch(logoutUser(sessionUser.id))
        return (<Redirect to="/signup" />);
    }

    if (sessionUser) return (
        <>
            <h1>hi from navigation</h1>
            <button onClick={handleLogOut}>Logout</button>
        </>
    )
}