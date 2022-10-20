import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import * as sessionActions from "../../store/session";
import ModalForm from "../ModalForm";
import profile from '../../profile.jpg'
import signout from '../../signout.png'
import upload from '../../upload.png'
import edit from '../../edit.png'
import { Modal } from "../../context/Modal";
import ModalIndex from "../ModalForm";


const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    
    const handleLogOut = () => {
        dispatch(sessionActions.logoutUser(sessionUser.id))
        return (<Redirect to="/" />);
    }

    if (sessionUser){
        return (
            <div id="control-panel">
                <Link to="/videos/new">
                    <img src={upload} alt="" title="Upload video"></img>
                </Link>
                <Link to={`/search/?u=${sessionUser.username}`}>
                    <img src={profile} alt="" title="Your Videos"></img>
                </Link>
                <ModalIndex />
                <img src={signout} alt="" title="Sign out" onClick={handleLogOut}></img>
            </div>

        )
    } else {
        return(
            <div id="navigation">
                
                <ModalIndex />

            </div>
        )
    }
}

export default Navigation;