import React, {useState,useRef} from 'react';
import axios from 'axios';
import {baseUrl} from "../utils/constants";

export default function Login() {
    const [authData,setAuthData] = useState({});
    const [error,setError] = useState("")
    const formRef = useRef();
    const handleLogin = async (event) => {
        event.preventDefault();
        const form = formRef.current;
        let loginData = {
            email: form.email.value,
            password: form.password.value,
        };
        try {
            const loginUrl = baseUrl + "/users/login";
            const {data} = await axios.post(loginUrl, loginData);
            if(typeof data !== "object") setError(data);
            else {
                for (const key in data) {
                    localStorage.setItem(key,data[key])
                }
                setAuthData(data);
                setError("");
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <>
        <form ref={formRef}>
            <label htmlFor='email'>Email:</label>
            <input type="text" name="email" placeholder='test@abc.com'/>
            <label htmlFor='password'>Password:</label>
            <input type="password" name="password" placeholder='********'/>
            {error && <p>{error}</p>}
            <button type='submit' onClick={handleLogin}>Login</button>
        </form>
    </>
  )
}
