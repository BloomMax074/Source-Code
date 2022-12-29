import React, { useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const StudentEditProfile = () => {
    let navigate = useNavigate();
    const location = useLocation();
    var access_token = location.state.access_token;
    var username = location.state.username;
    var account_type = location.state.account_type;
    const [fullname, setFullname]=useState("");
    const [oldFullname, setOldFullname]=useState(location.state.fullname);
    const [password, setPassword]=useState("");
    const [newPassword, setNewPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    async function handleChange(e) {
        e.preventDefault();
        const newFullname={
            fullname : fullname
        };
        var response = await axios.post("http://35.247.128.143:8000/api/auth/update-profile", newFullname, { headers: {"Authorization" : `Bearer ${access_token}`} });
        setOldFullname(fullname)
        document.getElementById('fullname').value = ''
        alert(response.data.message)
    }

    async function handleSavePassword(e) {
        e.preventDefault();
        const newPasswordSave={
            password : password,
            new_password : newPassword,
            confirm_password : confirmPassword
        };
        var response = await axios.post("http://35.247.128.143:8000/api/auth/change-password", newPasswordSave, { headers: {"Authorization" : `Bearer ${access_token}`} });
        document.getElementById('password').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        alert(response.data.message)
    }

    function toHomePage() {
        navigate('/StudentHP', {
            state : {
                access_token : access_token,
                username : username,
                fullname : oldFullname,
                account_type : account_type 
            },
        });
    }

    return (
        <div className="student-edit-profile">
            <form>
                <h1>STUDENT : PROFILE</h1>
                <table className="info-dashboard">
                    <tr>
                        <th>Fullname</th>
                        <td>{oldFullname}</td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td>{username}</td>
                    </tr>
                    <tr>
                        <th>Account Type</th>
                        <td>{account_type}</td>
                    </tr>
                </table>
                
                <label>Fullname:</label>
                <input type="text" placeholder={oldFullname} name="fullname" id="fullname" onChange={(e)=>setFullname(e.target.value)} ></input>
                <input type="button" className="change-button" value="Change" onClick={handleChange}></input>
                <label>Password: </label>
                <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)}></input> 
                <label>New Password: </label>
                <input type="password" name="newPassword" id="newPassword" onChange={(e)=>setNewPassword(e.target.value)}></input>
                <label>Confirm Password: </label>
                <input type="password" name="confirmPassword" id="confirmPassword" onChange={(e)=>setConfirmPassword(e.target.value)}></input>
                <input type="button" className="change-button" value="Save" onClick={handleSavePassword}></input>
                <table className="navigation-table">
                    <tr>
                        <td>
                            <input className="home-button" type={"button"} onClick={toHomePage} value="HOME"></input>
                        </td>
                        <td>
                            <input className="back-button" type={"button"} onClick={toHomePage} value="BACK"></input>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    )
}

export default StudentEditProfile