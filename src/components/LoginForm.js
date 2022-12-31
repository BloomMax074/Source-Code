import React, {useState} from "react";
import {Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm () {
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    let navigate = useNavigate();
    async function handleLogin(e) {
        e.preventDefault();
        const newLogin={
            username: username,
            password: password
        };
        var response = await axios.post("http://35.247.128.143:8000/api/auth/login", newLogin);
        var access_token = response.data.access_token;
        var response = await axios.get("http://35.247.128.143:8000/api/auth/me", { headers: {"Authorization" : `Bearer ${access_token}`} });
        var account_type = response.data.account_type;
        var fullname = response.data.fullname
        if (account_type == 1) {
            navigate('/StudentHP', {
                state : {
                    access_token : access_token,
                    username : username,
                    fullname : fullname,
                    account_type : account_type 
                },
            });
        }
        else if (account_type == 2) {
            navigate('/TeacherHP', {
                state : {
                    access_token : access_token,
                    username : username,
                    fullname : fullname,
                    account_type : account_type 
                },
            });
        }
    }    
    
    return (    
        <div className="login-form">
            <form onSubmit={handleLogin}>
                <h1>WACS</h1>
                <div className="login-form-input">
                    <input type="text" placeholder="Username" name="username" id="username" onChange={(e)=>setUsername(e.target.value)} required/>
                </div>
                <div className="login-form-input">
                    <input type="password" placeholder="Password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} required/>
                </div>
                <button className="login-button" type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm
