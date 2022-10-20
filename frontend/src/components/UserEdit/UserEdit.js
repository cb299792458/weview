import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { deleteUser, updateUser } from "../../store/user";

function UserEdit(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState(sessionUser.email);
  const [username, setUsername] = useState(sessionUser.username);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(updateUser({ id: sessionUser.id, email, username, password }))
        .catch(async (data) => {
          setErrors(data.errors);
      })
        .then(
          props.showFunction(false),
          history.push('/')
        );
    };

    return setErrors(['Passwords Must Match']);
  };

  const handleLogOut = () => {
    dispatch(sessionActions.logoutUser(sessionUser.id));
    return (history.push('/'));
  }

  const handleDelete = () => {
    dispatch(deleteUser(sessionUser.id));
    handleLogOut();
  }

  return (
    <form onSubmit={handleSubmit} id="sign-up">

      <h1>Update your account</h1>
      <p>and continue to WeView</p>

      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>

      <input
        type="text"
        value={email}
        placeholder="New email address"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        value={username}
        placeholder="New username"
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        value={password}
        placeholder="New password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="password"
        value={confirmPassword}
        placeholder="Confirm new password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <div id="buttons">
        <div id="button-links">
          <h4 onClick={handleLogOut}>Log out</h4>
          <h4 onClick={handleDelete}>Delete account</h4>
        </div>

        <button type="submit">Update</button>
      </div>
    </form>
  );
}

export default UserEdit;