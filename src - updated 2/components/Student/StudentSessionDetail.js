import React from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const StudentSessionDetail = () => {
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
    var api_path = location.state.api_path;

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

    async function toSessionMenu(e) {
        e.preventDefault();
        var coursesAPI = api_path + "/api/courses/" + String(course.id) + "/sessions";
        var response = await axios.get(coursesAPI, { headers: {"Authorization" : `Bearer ${access_token}`} });
        var session_list =[]
        for (let session in response.data) {
            if (response.data[session].course_id === course.id && response.data[session].lecture_id === lecture.id) {
                session_list.push(response.data[session])
            }
        }
        navigate('/StudentSessionMenu', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                api_path : api_path,
                course_list : course_list,
                course : course,
                lecture_list : lecture_list,
                lecture : lecture,
                session_list : session_list
            },
        });
    }

    async function checkin(e) {
        e.preventDefault();
        var checkinAPI = api_path + "/api/sessions/" + String(session.id) + "/checkin";
        
        try {
            var response = await axios.post(checkinAPI,{}, { headers: {"Authorization" : `Bearer ${access_token}`} });
            alert(response.data.data)
        } catch (err) {
            alert(err.response.data.detail);
        }

    }

    return (
        <div className="container">
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
                            <th>CREATED</th>
                            <td>{session.created_at.slice(0,10)}</td>
                        </tr>
                        <tr>
                            <th>UPDATED</th>
                            <td>{session.updated_at}</td>
                        </tr>
                        <tr>
                            <th>START</th>
                            <td>{session.start.slice(0,10) + ", " + session.start.slice(11,19)+" + 00:00"}</td>
                        </tr>
                        <tr>
                            <th>END</th>
                            <td>{session.end.slice(0,10) + ", " + session.end.slice(11,19)+" + 00:00"}</td>
                        </tr>
                    </tbody> 
                </table>
                <input className="big-blue-button" type={"button"} value="CHECK IN" onClick={checkin}></input>
                <table className="navigation-table">
                    <tbody>    
                        <tr>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="HOME" onClick={toHomePage}></input>
                            </td>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="BACK" onClick={toSessionMenu}></input>
                            </td>
                        </tr>
                    </tbody> 
                </table>
            </form>
        </div>
    )
}

export default StudentSessionDetail