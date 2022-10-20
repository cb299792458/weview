import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import * as sessionActions from "../../store/session";
import ModalForm from "../ModalForm";

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

        return(
            <div id="navigation">
                
                <ModalForm />

            </div>
        )
    }
}

export default Navigation;