import React from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const StudentHP = () => {
    const location = useLocation()
    var access_token = location.state.access_token
    var username = location.state.username
    var fullname = location.state.fullname
    var account_type = location.state.account_type
    let navigate = useNavigate();
    
    function toEditProfile(e) {
        e.preventDefault();
        navigate('/StudentEditProfile', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type
            },
        });
    }
    
    async function toCourseMenu(e) {
        e.preventDefault();
        var response = await axios.get("http://35.240.197.121:80/api/courses", { headers: {"Authorization" : `Bearer ${access_token}`} });
        navigate('/StudentCourseMenu', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                course_list : response.data
            },
        });
    }
    
    return (
        <div className="student-home-page">
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
                <input className="auto-check-in-button" type="button" value="CHECK IN"/>
                <input className="view-course-button" type="button" onClick={toCourseMenu} value="VIEW COURSES"/>
                <input className="logout-button" type="button" onClick={() => {navigate('/LoginForm')}} value="LOGOUT"/>
            </form>
        </div>
    )
}

export default StudentHP