import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherStudentDetail = () => {
        const location = useLocation();
        let navigate = useNavigate();
        const access_token=location.state.access_token;
        const username = location.state.username;
        const fullname = location.state.fullname;
        const account_type = location.state.account_type;
        const student_list = location.state.student_list;
        const student=location.state.student;

        function toHomePage(e) {
            e.preventDefault();
            navigate('/TeacherHP', {
                state : {
                    access_token : access_token,
                    username : username,
                    fullname : fullname,
                    account_type : account_type 
                },
            });
        }
    
        return (
                <div className="teacher-session-detail">
                    <form>
                        
                        <table className="info-table">
                            <tbody>   
                                <tr>
                                    <th>STUDENT USERNAME</th>
                                    <td>{student.username}</td>
                                </tr>
                                <tr>
                                    <th>STUDENT FULLNAME </th>
                                    <td>{student.fullname}</td>
                                </tr>
                                <tr>
                                    <th>STUDENT PASSWORD</th>
                                    <td>{student.password}</td>
                                </tr>
                                <tr>
                                    <th>STUDENT ACCOUNT-TYPE</th>
                                    <td>{student.account_type}</td>
                                </tr>
                                <tr>
                                    <th>CREATED AT</th>
                                    <td>NULL</td>
                                </tr>
                                <tr>
                                    <th>UPDATED AT</th>
                                    <td>NULL</td>
                                </tr>
                                <tr>
                                    <th>DEVICE</th>
                                    <td>NULL</td>
                                </tr>
                               
                            </tbody> 
                        </table>
                        <table className="navigation-table">
                            <tr>
                                <td>
                                    <button className="home-button" onClick={() => {navigate('/TeacherHP') }}>
                                        HOME
                                    </button>
                                </td>
                                <td>
                                    <button className="back-button" onClick={() => {navigate('/TeacherHP')}}>
                                        BACK
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
        )
}

export default  TeacherStudentDetail