import React, { useState } from "react";
import { useSelector } from "react-redux";
import google from '../../google.png'
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import UserEdit from "../UserEdit";

function ModalForm(props) {
  const sessionUser = useSelector(state => state.session.user);
  const [newUser, setNewUser] = useState(false);
  return (
      <div className="modal" id="session-box">
        <img src={google} alt=""/>
        { sessionUser && <UserEdit showFunction={props.showFunction} />}

        { !sessionUser && !newUser && <LoginForm toggle={setNewUser} />}

        { !sessionUser && newUser && <SignupForm toggle={setNewUser} />}
      </div>
    
  );
}

export default ModalForm;