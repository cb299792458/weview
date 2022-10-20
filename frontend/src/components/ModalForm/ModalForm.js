import React, { useState } from "react";
import { useSelector } from "react-redux";
import google from '../../google.png'
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import UserEdit from "../UserEdit";

function ModalForm() {
  const sessionUser = useSelector(state => state.session.user);
  const [newUser, setNewUser] = useState(false);
  console.log("reached modal");
  return (
      <div id="session-box">
        <img src={google} alt=""/>
        { sessionUser && <UserEdit />}

        { !sessionUser && !newUser && <LoginForm toggle={setNewUser} />}

        { !sessionUser && newUser && <SignupForm toggle={setNewUser} />}
      </div>
    
  );
}

export default ModalForm;