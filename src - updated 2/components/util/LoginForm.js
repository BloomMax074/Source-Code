import React, {useState} from "react";
import {Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm () {
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    var api_path = "http://35.240.197.121:80";
    var access_token = ""
    let navigate = useNavigate();
    async function handleLogin(e) {
        e.preventDefault();
        const newLogin={
            username: username,
            password: password
        };
            
        try {
            var loginAPI = api_path + "/api/auth/login";
            var response = await axios.post(loginAPI, newLogin);
            access_token = response.data.access_token;
        } catch(err) {
            alert(err.response.data.detail)
        }
        
        if (access_token != "") {
            var meAPI = api_path + "/api/auth/me";
            var response = await axios.get(meAPI, { headers: {"Authorization" : `Bearer ${access_token}`} });
            var account_type = response.data.account_type;
            var fullname = response.data.fullname
            if (account_type == 1) {
                navigate('/StudentHP', {
                    state : {
                        access_token : access_token,
                        username : username,
                        fullname : fullname,
                        account_type : account_type,
                        api_path : api_path
                    },
                });
            }
            else if (account_type == 2) {
                navigate('/TeacherHP', {
                    state : {
                        access_token : access_token,
                        username : username,
                        fullname : fullname,
                        account_type : account_type,
                        api_path : api_path
                    },
                });
            }
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
                <input className="medium-blue-button" type="submit" value="Login"></input>
            </form>
        </div>
    );
}

export default LoginForm
