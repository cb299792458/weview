import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupForm(props) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signupUser({ email, username, password }))
        .catch(async (data) => {
          setErrors(data.errors);
    });};

    return setErrors(['Passwords Must Match']);
  };

  const demoUser = ()=>{
    const username = "Guest-" + Math.floor(Math.random()*1000000000);
    const email = username + "@email.com";
    const password = "password";
    return dispatch(sessionActions.signupUser({ email, username, password }))
  }

  return (
    <form onSubmit={handleSubmit} id="sign-up">

      <h1>Create your Account</h1>
      <p>to continue to WeView</p>

      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>

      <input
        type="text"
        value={email}
        placeholder="Your email address"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="password"
        value={confirmPassword}
        placeholder="Confirm"
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <div id="buttons">
        <div id="button-links">
          <h4 onClick={()=>{props.toggle(false)}}>Sign in instead</h4>
          <h4 onClick={demoUser}>Demo user</h4>
        </div>

        <button type="submit">Sign Up</button>
      </div>
    </form>
  );
}

export default SignupForm;