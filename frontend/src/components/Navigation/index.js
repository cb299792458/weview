import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { logoutUser } from "../../store/session"

const Navigation = () => {

    const sessionUser = useSelector(state => state.session.user)

    const dispatch = useDispatch()
    
    const handleLogOut = () => {
        dispatch(logoutUser(sessionUser.id))
        return (<Redirect to="/signup" />);
    }

    if (sessionUser){
        return (
            <>
                <h2>Hello, {sessionUser.username}.</h2>
                <button onClick={handleLogOut}>Logout</button>
            </>
        )
    } else {
        return(
            <>
                <h2>You are not logged in.</h2>
                <Link to="login">Log In</Link>
                <br></br>
                <Link to="signup">Sign Up</Link>
            </>
        )
    }
}

export default Navigation;