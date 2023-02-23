import React, {useState,useRef} from 'react';
import axios from 'axios';
import {baseUrl} from "../utils/constants";

export default function Register() {
    const [userData,setUserData] = useState({});
    const [error,setError] = useState("")
    const formRef = useRef();
    const handleRegister = async (event) => {
        event.preventDefault();
        const form = formRef.current;
        let registerData = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            password: form.password.value,
            access: form.access.value,
        };
        try {
            const registerUrl = baseUrl + "/users/register";
            const response = await axios.post(registerUrl, registerData);
            setUserData(response.data);
            if(typeof response.data !== "object") setError(response.data);
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <>
        <form ref={formRef}>
            <label htmlFor='name'>Name:</label>
            <input type="text" name="name" placeholder='PK'/>
            <label htmlFor='email'>Email:</label>
            <input type="text" name="email" placeholder='test@abc.com'/>
            <label htmlFor='phone'>Phone:</label>
            <input type="text" name="phone" placeholder='0123456789'/>
            <label htmlFor='password'>Password:</label>
            <input type="password" name="password" placeholder='********'/>
            <select name="access">
                <option value="">Select Access</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
            </select>
            {error && <p>{error}</p>}
            <button type='submit' onClick={handleRegister}>Register</button>
        </form>
    </>
  )
}
