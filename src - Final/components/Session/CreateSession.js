import React, { useState } from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateSession = () => {
    let navigate=useNavigate();
    const location=useLocation();
    var access_token=location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var api_path = location.state.api_path;
    var course = location.state.course;
    var course_list = location.state.course_list;
    var lecture = location.state.lecture;
    var lecture_list = location.state.lecture_list;

    const [session_name_created, setSessionNameCreated]=useState("");
    const [session_description_created, setSessionDescriptionCreated]=useState("");
    const [session_time_start, setSessionTimeStart]=useState("");
    const [session_time_end, setSessionTimeEnd]=useState("");
    const [session_date_start, setSessionDateStart]=useState("");
    const [session_date_end, setSessionDateEnd]=useState("");

    
    function toHomePage() {
        navigate('/TeacherHP', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                api_path : api_path
            },
        });
    }

    async function goBack() {
        var sessionsAPI = api_path + "/api/courses/" + String(course.id) + "/sessions";
        var response = await axios.get(sessionsAPI, { headers: {"Authorization" : `Bearer ${access_token}`} });
        var session_list =[]
        for (let session in response.data) {
            if (response.data[session].course_id === course.id && response.data[session].lecture_id === lecture.id) {
                session_list.push(response.data[session]);
            }
        }

        navigate('/TeacherSessionMenu', {
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
    
    function createSession() {
        if (session_time_start === "" || session_date_start === "" || session_time_end === "" || session_date_end === "" || session_name_created === "") {
            alert("Name, Start Time & End Time are required!");
        }
        else {
            var sessionAPI = api_path + "/api/sessions"
            var newSession = {
                lecture_id : lecture.id,
                name : session_name_created,
                description : session_description_created,
                start : String(session_date_start) + "T"+String(session_time_start)+":00+07:00",
                end : String(session_date_end) + "T"+String(session_time_end)+":00+07:00",
            }
            axios.post(sessionAPI, newSession, { headers: {"Authorization" : `Bearer ${access_token}`} })
            alert("Session Created")
        }    
    }

    return (
        <div className="container">
            <form>
                <h1>CREATE SESSION</h1>

                <label htmlFor="create-session-name">Session Name:</label>
			    <input type="text" placeholder={"Session Name"} id="create-session-name" onChange={(e)=>setSessionNameCreated(e.target.value)}/>

                <label htmlFor="create-session-description">Session Description:</label>
			    <input type="text" placeholder={"Session Description"} id="create-session-description" onChange={(e)=>setSessionDescriptionCreated(e.target.value)}/>
            
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="create-session-start">Start Time:</label>
                            </td>
                            <td>
                                <input type="time" id="create-session-start" required onChange={(e)=>{setSessionTimeStart(e.target.value)}}></input>
                            </td>
                            <td>
                                <input type="date" id="create-session-start-date" required onChange={(e)=>{setSessionDateStart(e.target.value)}}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="create-session-end">End Time:</label>
                            </td>
                            <td>
                                <input type="time" id="create-session-end" required onChange={(e)=>{setSessionTimeEnd(e.target.value)}}></input>
                            </td>
                            <td>
                                <input type="date" id="create-session-end-date" required onChange={(e)=>{setSessionDateEnd(e.target.value)}}></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p> </p>
                
                <input type={"button"} className="big-blue-button" value={"CREATE SESSION"} onClick={createSession}></input>

                <table className="navigation-table">
                    <tbody>
                        <tr>
                            <td>
                                <input className="navigation-blue-button" type={"button"} onClick={toHomePage} value="HOME"></input>
                            </td>
                            <td>
                                <input className="navigation-blue-button" type={"button"} onClick={goBack} value="BACK"></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            
            
            </form>
        </div>
    )
}

export default CreateSession