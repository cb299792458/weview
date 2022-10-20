import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal";

const Navigation = () => {

    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    
    const handleLogOut = () => {
        dispatch(sessionActions.logoutUser(sessionUser.id))
        return (<Redirect to="/" />);
    }

    if (sessionUser){
        return (
            <>
                {/* <h2>Hello, {sessionUser.username}.</h2> */}
                <button onClick={handleLogOut}>Logout</button>
                <br></br>
                <Link to="/videos/new">Upload</Link>
            </>
        )
    } else {

        const handleClick = ()=>{
            const username = "Guest-" + Math.floor(Math.random()*1000000000);
            const email = username + "@email.com";
            const password = "password";
            return dispatch(sessionActions.signupUser({ email, username, password }))
        }

        return(
            <div id="navigation">
                
                <LoginFormModal />

            </div>
        )
    }
}

export default Navigation;