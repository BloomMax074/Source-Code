import React from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherHP = () => {
    const location = useLocation()
    var access_token = location.state.access_token
    var username = location.state.username
    var fullname = location.state.fullname
    var account_type = location.state.account_type
    var api_path = location.state.api_path

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

    async function toCourseMenu(e) {
        e.preventDefault();
        var coursesAPI = api_path + "/api/courses";
        var response = await axios.get(coursesAPI, { headers: { "Authorization" : `Bearer ${access_token}`} });
        navigate('/TeacherCourseMenu', { 
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

    async function toAccountMenu(e) {
        e.preventDefault();
        var accountAPI = api_path + "/api/users";
        var response = await axios.get(accountAPI, { headers: { "Authorization" : `Bearer ${access_token}`} })
        console.log(response.data)
        navigate('/AccountList', { 
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                api_path : api_path,
                account_list : response.data
            },
        });
    }

    let navigate = useNavigate();
    return (
        <div className="container">
            <form>
                <h1>WELCOME : TEACHER</h1>
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
                    <input className="edit-button" type="button" value="EDIT" onClick={toEditProfile}/>
                </div>
                <input className="medium-blue-button" type="button" onClick={toAccountMenu} value="ACCOUNT LIST"/>
                <input className="medium-blue-button" type="button" onClick={toCourseMenu} value="VIEW COURSES"/>
                <input className="medium-red-button" type="button" onClick={()=>{navigate('/LoginForm')}} value="LOGOUT"/>
            </form>
        </div>
    );
}

export default TeacherHP