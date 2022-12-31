import React from "react";
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherHP = () => {
    const location = useLocation()
    var access_token = location.state.access_token
    var username = location.state.username
    var fullname = location.state.fullname
    var account_type = location.state.account_type
    let navigate = useNavigate();

    function toEditProfile(e) {
        e.preventDefault();
        navigate('/TeacherEditProfile', {
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
        var response = await axios.get("http://35.247.128.143:8000/api/courses", { headers: { "Authorization" : `Bearer ${access_token}`} });
        navigate('/TeacherCourseMenu', { 
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
            <div className="teacher-home-page">
                <form>
                    <h1>Welcome : TEACHER </h1>
                    <div className="info-dashboard">
                        <table>
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
                        </table>
                        <input className="edit-button" type="button" value="EDIT PROFILE" onclick={toEditProfile}/>
                    </div>
                    <input className="student-list-button" type="button" value="STUDENT LIST"/>
                    <input className="view-course-button" type="button" onClick={toCourseMenu} value="VIEW COURSE" />
                    <input className="logout-button" type="button" onClick={() => {navigate('/LoginForm')}} value="LOGOUT"/>
                </form>
            </div>
    )
}

export default TeacherHP