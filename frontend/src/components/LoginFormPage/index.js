import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
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

  return (
    <form onSubmit={handleSubmit}>
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
          <h4>Create account</h4>
          <h4>Demo user</h4>
        </div>

        <button type="submit">Log In</button>
      </div>
    </form>
  );
}

export default LoginFormPage;