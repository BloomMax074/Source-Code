import React from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const StudentHistory = () => {
    const location = useLocation();
    let navigate = useNavigate();
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var api_path = location.state.api_path;
    
    var history_list = [
        {
            course_name : "Python",
            lecture_name : "Lecture 1",
            session_name : "Session 1",
            created_at : "2023-01-18, 08:32:12+00:00"
        },
        {
            course_name : "Python",
            lecture_name : "Lecture 1",
            session_name : "Session 2",
            created_at : "2023-01-18, 10:28:29+00:00"
        },
        {
            course_name : "Python",
            lecture_name : "Lecture 2",
            session_name : "Session 1",
            created_at : "2023-01-19, 08:35:40+00:00"
        },
        {
            course_name : "Python",
            lecture_name : "Lecture 2",
            session_name : "Session 2",
            created_at : "2023-01-18, 10:27:01+00:00"
        },
    ]

    function toHomePage(e) {
        e.preventDefault();
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
    
    return (
        <div className="container">
            <form>
                <h1>ATTENDANCE HISTORY</h1>
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
                </div>
                <div className="list">
                    <ul>
                    {history_list.map((item) => {
                        return (
                            <li style={{marginBottom:"10px"}} key="item.course_name">{item.course_name} - {item.lecture_name} - {item.session_name} - {item.created_at}</li>  
                        )
                    })}
                    </ul>
                </div>
                <input type={"button"} className="big-blue-button" value={"EXPORT"}></input>
                <table className="navigation-table">
                    <tbody>  
                        <tr>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="HOME" onClick={toHomePage}></input>
                            </td>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="BACK" onClick={toHomePage}></input>
                            </td>
                        </tr>
                    </tbody> 
                </table>
            </form>
        </div>
    )
}

export default StudentHistory