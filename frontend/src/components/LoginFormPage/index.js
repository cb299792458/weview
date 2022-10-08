import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { loginUser } from "../../store/session";
import './LoginForm.css'

const LoginFormPage = () => {
    
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    
    const sessionUser = useSelector(state => state.session.user);
    if(sessionUser) return <Redirect to='/' />

    const user = {credential, password}

    const handleSubmit = (e) => {
        e.preventDefault();

        return dispatch(loginUser(user))
            .catch(async (data) => {
                console.log(data)
                setErrors(data.errors);

                // console.log(data);
            //     console.log('in catch')
            //     let data;
            //     try {

            //     // .clone() essentially allows you to read the response body twice
            //     data = await res.clone().json();
            //     } catch {
            //     data = await res.text(); // Will hit this case if the server is down
            //     }
            //     if (data?.errors) setErrors(data.errors);
            //     else if (data) setErrors([data]);
            //     else setErrors([res.statusText]);
            });
    }
    // console.log(errors)
    return(
        <>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map( error => {
                        return <li key={error}>{error}</li>
                    })}
                </ul>
                <label>Username or Email
                    <input
                        type="text"
                        value={credential}
                        onChange={ (e) => setCredential(e.target.value)}
                        required>
                    </input>
                </label>
                <label>Password
                    <input
                        type="password"
                        value={password}
                        onChange={ (e) => setPassword(e.target.value)}
                        required>
                    </input>
                </label>
                <button type="submit">Log In</button>
            </form>
        </>
    )
}

export default LoginFormPage;