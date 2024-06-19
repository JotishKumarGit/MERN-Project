
// react useState ko import kiya
import React, { useState, useEffect } from "react";
// This is Hook (Use for redirect)
import {useNavigate} from 'react-router-dom';

// Making a function
const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //This is use as a function
    const navigate = useNavigate();
        // localStorage ke under user ki info hogi to signup page nahi dekhega
        useEffect(() =>{
            const auth = localStorage.getItem('user');
            if(auth){
                navigate('/')
            }
        })


    // Making call back function for the state
    const collectData = async () => {
        console.warn(name, email, password);
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            // API data ko JSON.stringify kar ke leta h
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/josn'
            }
        });
        result = await result.json();
        console.warn(result);
        // setItem localStorage ke under data ko rakh dega
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        // If the SIgnUp is complited than redirect the Home page (from this function)
           navigate('/');
    }

    // Inside the inputBox we use the value={for automaticaly refresing when once click the btn}, onChange{for the state}
    return (
        <div className="Register">
            <h1>Register</h1>
            <input className="inputBox" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="inputBox" type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="inputBox" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="appButton" type="button" onClick={collectData}>Sign Up</button>

        </div>
    )
}

export default SignUp;