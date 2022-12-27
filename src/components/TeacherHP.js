import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherHP = () => {
    const location = useLocation()
    var access_token = location.state.access_token
    var username = location.state.username
    var fullname = location.state.fullname
    var account_type = location.state.account_type
    let navigate = useNavigate();
    return (
        <teacherhp>
            <div className="teacher-home-page">
                <form>
                    <h1>Welcome, Phạm Vũ Hải </h1>
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
                    <table className="navigation-table">
                        <tr>
                            <td>
                                <input className="student-list-button" type="button" value="STUDENT LIST"/>
                                <button className="view-course-button" onClick={() => {navigate('/TeacherCourseMenu') }}>
                                    COURSE LIST 
                                </button>
                                <button className="logout-button" onClick={() => {navigate('/LoginForm')}}>
                                    LOGOUT
                                </button>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </teacherhp>
    );
}

export default TeacherHP