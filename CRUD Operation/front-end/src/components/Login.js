import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    //making State for Handle the email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    })
    // , [] (Comment this thing hare)
    // This is handle the login btn(when i am login)
    const handleLogin = async () => {
         console.log(email, password);
        // Local Storage me data ko save karne ke liye
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': "application/json"
            }
        });
        result = await result.json();
        console.log(result);
        //if user give wrong details
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate('/')
        } else {
            alert("Please Enter Correct Details");
        }
    }


    return (
        <div className='Login'>
            <h1 className='head'>Login Hare</h1>
            <input type='text' className="inputBox" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' className="inputBox" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin} className="appButton" type="button">Login</button>
        </div>
    )
}

export default Login;