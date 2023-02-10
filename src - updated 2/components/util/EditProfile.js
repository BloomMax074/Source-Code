import React, { useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
    let navigate = useNavigate();
    const location = useLocation();
    var access_token = location.state.access_token;
    var username = location.state.username;
    var account_type = location.state.account_type;
    var api_path = location.state.api_path;
    var title;

    if(account_type===1){
        title = "STUDENT"
    }
    else if (account_type===2){
        title = "TEACHER"
    }

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
        var updateProfileAPI = api_path + "/api/auth/update-profile";
        var response = await axios.post(updateProfileAPI, newFullname, { headers: {"Authorization" : `Bearer ${access_token}`} });
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
        try {    
            var changePasswordAPI = api_path + "/api/auth/change-password";
            var response = await axios.post(changePasswordAPI, newPasswordSave, { headers: {"Authorization" : `Bearer ${access_token}`} });
            document.getElementById('password').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
            alert(response.data.message)
        } catch(err) {
            alert(err.response.data.detail)
        }
    }

    function toHomePage() {
        if (account_type === 1) {
            navigate('/StudentHP', {
                state : {
                    access_token : access_token,
                    username : username,
                    fullname : oldFullname,
                    account_type : account_type,
                    api_path : api_path
                },
            });
        }
        else if (account_type === 2) {
            navigate('/TeacherHP', {
                state : {
                    access_token : access_token,
                    username : username,
                    fullname : oldFullname,
                    account_type : account_type,
                    api_path : api_path
                },
            });
        }
        
    }

    return (
        <div className="container">
            <form>
                <h1>{title} : PROFILE</h1>
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
                    <tbody>
                        <tr>
                            <td>
                                <input className="navigation-blue-button" type={"button"} onClick={toHomePage} value="HOME"></input>
                            </td>
                            <td>
                                <input className="navigation-blue-button" type={"button"} onClick={toHomePage} value="BACK"></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default EditProfile