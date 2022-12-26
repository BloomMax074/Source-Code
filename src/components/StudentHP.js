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
    return (
        <div className="student-home-page">
            <form>
                <h1>WELCOME : STUDENT</h1>
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
                    <input className="edit-button" type="button" value="EDIT"/>
                </div>
                <input className="auto-check-in-button" type="button" value="CHECK IN"/>
                <input className="view-course-button" type="button" onClick={() => {navigate('/StudentCourseMenu')}} value="VIEW COURSES"/>
                <input className="logout-button" type="button" onClick={() => {navigate('/LoginForm')}} value="LOGOUT"/>
            </form>
        </div>
    )
}

export default StudentHP