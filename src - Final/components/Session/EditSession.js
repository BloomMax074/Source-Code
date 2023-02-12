import React, { useState } from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditSession = () => {
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
    var session = location.state.session;

    const [session_name_edited, setSessionNameEdited]=useState("");
    const [session_description_edited, setSessionDescriptionEdited]=useState("");
    const [session_time_start_edited, setSessionTimeStartEdited]=useState("");
    const [session_time_end_edited, setSessionTimeEndEdited]=useState("");
    const [session_date_start_edited, setSessionDateStartEdited]=useState("");
    const [session_date_end_edited, setSessionDateEndEdited]=useState("");

    const [session_name_placeholder, setSessionNamePlaceholder]=useState(location.state.name_placeholder);
    const [session_description_placeholder, setSessionDescriptionPlaceholder]=useState(location.state.description_placeholder);
    const [session_start_placeholder, setSessionStartPlaceholder]=useState(String(location.state.start_placeholder));
    const [session_end_placeholder, setSessionEndPlaceholder]=useState(String(location.state.end_placeholder));

    function editSession() {
        var sessionAPI = api_path + "/api/sessions/" + String(session.id)
        var sessionUpdated={}
        var proceed = false;
        if (session_name_edited !== "") {
            sessionUpdated.name = session_name_edited;
            proceed = true;
        }
        if (session_description_edited !== "") {
            sessionUpdated.description = session_description_edited;
            proceed = true;
        }
        if (session_time_start_edited !== "" || session_date_start_edited !== "") {
            if ((session_time_start_edited !== "" && session_date_start_edited === "") || (session_time_start_edited === "" && session_date_start_edited !== "")) {
                alert("Start Time input incomplete!")
            } else if (session_time_start_edited !== "" && session_date_start_edited !== "") {
                sessionUpdated.start = String(session_date_start_edited) + "T"+String(session_time_start_edited)+":00+07:00";
                proceed = true
            }
        }
        if (session_time_end_edited !== "" || session_date_end_edited !== "") {
            if ((session_time_end_edited !== "" && session_date_end_edited === "") || (session_time_end_edited === "" && session_date_end_edited !== "")) {
                alert("End Time input incomplete!")
                proceed = false;
            } else if (session_time_end_edited !== "" && session_date_end_edited !== "") {
                sessionUpdated.end = String(session_date_end_edited) + "T"+String(session_time_end_edited)+":00+07:00";
                proceed = true;
            }
        }
        if(proceed) {
            axios.patch(sessionAPI, sessionUpdated, { headers: {"Authorization" : `Bearer ${access_token}`} });
            alert("Session Updated")
            if (session_name_edited !== "") {
                setSessionNamePlaceholder(session_name_edited);
            }
            if (session_description_edited !== "") {
                setSessionDescriptionPlaceholder(session_description_edited);
            }
            if (session_time_start_edited !== "" && session_date_start_edited !== "") {
                setSessionStartPlaceholder(String(new Date(sessionUpdated.start)));
            }
            if (session_time_end_edited !== "" && session_date_end_edited !== "") {
                setSessionEndPlaceholder(String(new Date(sessionUpdated.end)));
            } 
            document.getElementById("edit-session-name").value = "";
            document.getElementById("edit-session-description").value = "";
            document.getElementById("edit-session-start").value = "";
            document.getElementById("edit-session-end").value = "";
            document.getElementById("edit-session-start-date").value = "";
            document.getElementById("edit-session-end-date").value = "";
        }
    }

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
        var session_list =[]
        var sessionListAPI = api_path + "/api/courses/"+String(course.id)+"/sessions"
        var response = await axios.get(sessionListAPI, { headers: {"Authorization" : `Bearer ${access_token}`} })
        for (let x in response.data) {
            if(response.data[x].id === session.id) {
                navigate('/TeacherSessionDetail', {
                    state : {
                        access_token : access_token,
                        username : username,
                        fullname : fullname,
                        account_type : account_type,
                        api_path: api_path,
                        course_list : course_list,
                        course : course,
                        lecture_list : lecture_list,
                        lecture : lecture,
                        session_list : session_list,
                        session : response.data[x]
                    },
                });
            }
        }
    }
    
    return(
        <div className="container">
            <form>
                <h1>EDIT SESSION</h1>

                <label htmlFor="edit-session-name">Session Name:</label>
			    <input type="text" placeholder={session_name_placeholder} id="edit-session-name" onChange={(e)=>setSessionNameEdited(e.target.value)}/>
            
                <label htmlFor="edit-session-description">Session Description:</label>
			    <input type="text" placeholder={session_description_placeholder} id="edit-session-description" onChange={(e)=>setSessionDescriptionEdited(e.target.value)}/>

                <table>
                    <tbody>
                        <tr>
                            <td rowSpan={1}>
                                <label htmlFor="edit-session-start">Current Start Time:</label>
                            </td>
                            <td colSpan={2}>
                                {String(new Date(session_start_placeholder))}
                            </td>
                        </tr>
                        <tr>
                            <td rowSpan={1}>
                                <label htmlFor="edit-session-start">Start Time:</label>
                            </td>
                            <td>
                                <input type="time" id="edit-session-start" required onChange={(e)=>{setSessionTimeStartEdited(e.target.value)}}></input>
                            </td>
                            <td>
                                <input type="date" id="edit-session-start-date" required onChange={(e)=>{setSessionDateStartEdited(e.target.value)}}></input>
                            </td>
                        </tr>
                        <tr>
                            <td rowSpan={1}>
                                <label htmlFor="edit-session-end">Current End Time:</label>
                            </td>
                            <td colSpan={2}>
                                {String(new Date(session_end_placeholder))}
                            </td>
                        </tr>
                        <tr>
                            <td rowSpan={1}>
                                <label htmlFor="edit-session-end">End Time:</label>
                            </td>
                            <td>
                                <input type="time" id="edit-session-end" required onChange={(e)=>{setSessionTimeEndEdited(e.target.value)}}></input>
                            </td>
                            <td>
                                <input type="date" id="edit-session-end-date" required onChange={(e)=>{setSessionDateEndEdited(e.target.value)}}></input>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p> </p>

                <input type={"button"} className="big-blue-button" value={"EDIT SESSION"} onClick={editSession}></input>

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

export default EditSession

