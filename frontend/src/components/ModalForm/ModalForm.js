import React, { useState } from "react";
import google from '../../google.png'
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";

function ModalForm() {
  
  const [newUser, setNewUser] = useState(false);

  return (
      <div id="session-box">
        <img src={google} alt=""/>

        { !newUser && <LoginForm toggle={setNewUser} />}

        { newUser && <SignupForm toggle={setNewUser} />}
      </div>
    
  );
}

export default ModalForm;