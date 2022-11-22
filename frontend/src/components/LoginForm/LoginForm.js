import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LoginForm(props) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    return dispatch(sessionActions.loginUser({credential, password}))
        .catch(async (data) => {
            setErrors(data.errors);
        });
  }

  const demoUser = ()=>{
    const username = "Guest-" + Math.floor(Math.random()*1000000000);
    const email = username + "@email.com";
    const password = "password";
    return dispatch(sessionActions.signupUser({ email, username, password }))
  }

  return (
    <form onSubmit={handleSubmit} id="sign-in">
      
      <h1>Sign in</h1>
      <p>to continue to WeView</p>

      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>

      <input
        type="text"
        value={credential}
        placeholder="Email or username"
        onChange={(e) => setCredential(e.target.value)}
        required
      />
      <h4 onClick={()=>{alert("That's rough buddy.")}}>Forgot email?</h4>

      <input
        type="password"
        value={password}
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <h4 onClick={()=>{alert("That's rough buddy.")}}>Forgot password?</h4>

      <div id="buttons">
        <div id="button-links">
          <h4 onClick={()=>{props.toggle(true)}}>Create Account</h4>
          <h4 onClick={demoUser}>Demo Login</h4>
        </div>

        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default LoginForm;