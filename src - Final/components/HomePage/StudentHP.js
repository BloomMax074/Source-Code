import React from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const StudentHP = () => {
    const location = useLocation()
    var access_token = location.state.access_token
    var username = location.state.username
    var fullname = location.state.fullname
    var account_type = location.state.account_type
    var api_path = location.state.api_path
    
    let navigate = useNavigate();
    
    function toEditProfile(e) {
        e.preventDefault();
        navigate('/EditProfile', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                api_path : api_path
            },
        });
    }

    async function toHistory(e) {
        e.preventDefault();
        var historyAPI = api_path + "/api/sessions/history";
        var response = await axios.get(historyAPI, { headers: {"Authorization" : `Bearer ${access_token}`} })
        navigate('/StudentHistory', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                api_path : api_path,
                history_list : response.data.data
            },
        });

    }
    
    async function toCourseMenu(e) {
        e.preventDefault();
        var courseAPI = api_path + "/api/courses"
        var response = await axios.get(courseAPI, { headers: {"Authorization" : `Bearer ${access_token}`} });
        navigate('/StudentCourseMenu', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                api_path : api_path,
                course_list : response.data
            },
        });
    }

    async function toActiveSession(e) {
        e.preventDefault();
        var activeSessionAPI = api_path + "/api/sessions/active-sessions"
        var response = await axios.get(activeSessionAPI, { headers: {"Authorization" : `Bearer ${access_token}`} })
        navigate('/ActiveSession', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                api_path : api_path,
                active_session_list : response.data.data
            },
        });
    }
    
    return (
        <div className="container">
            <form>
                <h1>WELCOME : STUDENT</h1>
                <div className="info-dashboard">
                    <table>
                        <tbody>   
                            <tr>
                                <th>Full Name</th>
                                <td>{fullname}</td>
                            </tr>
                            <tr>
                                <th>Username</th>
                                <td>{username}</td>
                            </tr>
                            <tr>
                                <th>Account Type</th>
                                <td>{account_type}</td>
                            </tr>
                        </tbody> 
                    </table>
                    <input className="edit-button" type="button" value="EDIT PROFILE" onClick={toEditProfile}/>
                </div>
                <input className="medium-blue-button" type="button" value="ACTIVE SESSIONS" onClick={toActiveSession}/>
                <input className="medium-blue-button" type="button" value="HISTORY" onClick={toHistory}/>
                <input className="medium-blue-button" type="button" onClick={toCourseMenu} value="VIEW COURSES"/>
                <input className="medium-red-button" type="button" onClick={() => {navigate('/LoginForm')}} value="LOGOUT"/>
            </form>
        </div>
    )
}

export default StudentHP