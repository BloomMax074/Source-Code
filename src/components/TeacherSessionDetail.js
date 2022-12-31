import React, { useState } from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherSessionDetail = () => {
    const location = useLocation();
    let navigate = useNavigate();
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var course = location.state.course;
    var course_list = location.state.course_list;
    var lecture = location.state.lecture;
    var lecture_list = location.state.lecture_list;
    var session = location.state.session;
    var session_list = location.state.session_list;

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

    async function toSessionMenu(e) {
        e.preventDefault();
        var api_path = "http://35.247.128.143:8000/api/courses/";
        api_path = api_path + String(lecture.id) + "/sessions";
        var response = await axios.get(api_path, { headers: {"Authorization" : `Bearer ${access_token}`} });
        var session_list =[]
        for (let session in response.data) {
            if (response.data[session].course_id == course.id && response.data[session].lecture_id == lecture.id) {
                session_list.push(response.data[session])
            }
        }
        navigate('/TeacherSessionMenu', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                course_list : course_list,
                course : course,
                lecture_list : lecture_list,
                lecture : lecture,
                session_list : session_list
            },
        });
    }

    return (
            <div className="teacher-session-detail">
                <form>
                    <h1>{course.name}</h1>
                    <h1>{lecture.name}</h1>
                    <h1>{session.name}</h1>
                    <table className="info-table">
                        <tbody>   
                            <tr>
                                <th>SESSION NAME</th>
                                <td>{session.name}</td>
                            </tr>
                            <tr>
                                <th>SESSION DESCRIPTION</th>
                                <td>{session.description}</td>
                            </tr>
                            <tr>
                                <th>CREATED AT</th>
                                <td>{session.created_at}</td>
                            </tr>
                            <tr>
                                <th>UPDATED AT</th>
                                <td>{session.updated_at}</td>
                            </tr>
                            <tr>
                                <th>START</th>
                                <td>{session.start}</td>
                            </tr>
                            <tr>
                                <th>END</th>
                                <td>{session.end}</td>
                            </tr>
                        </tbody> 
                    </table>
                    <input className="end-session-button" type={"button"} value="END SESSION" onClick={""}></input>
                    <table className="navigation-table">
                        <tr>
                            <td>
                                <input className="home-button" type={"button"} value="HOME" onClick={toHomePage}></input>
                            </td>
                            <td>
                                <input className="back-button" type={"button"} value="BACK" onClick={toSessionMenu}></input>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
    )
}
export default TeacherSessionDetail