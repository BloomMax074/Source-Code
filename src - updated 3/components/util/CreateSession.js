import React, { useState } from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment, * as moments from 'moment';

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
    var session_list=location.state.session_list;

    const [session_name_created, setSessionNameCreated]=useState("");
    const [session_description_created, setSessionDescriptionCreated]=useState("");
    const [session_time_start, setSessionTimeStart]=useState("");
    const [session_time_end, setSessionTimeEnd]=useState("");

    
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

    function goBack() {

    }
    
    function createSession() {
        console.log(session_time_start)
        console.log(session_time_end)
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
                                <input type="time" placeholder={"Start Time"} id="create-session-start" required onChange={(e)=>{setSessionTimeStart(e.target.value)}}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="create-session-end">End Time:</label>
                            </td>
                            <td>
                                <input type="time" placeholder={"End Time"} id="create-session-end" required onChange={(e)=>{setSessionTimeEnd(e.target.value)}}></input>
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