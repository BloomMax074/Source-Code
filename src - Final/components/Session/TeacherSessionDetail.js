import React from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherSessionDetail = () => {
    let navigate = useNavigate();
    const location = useLocation();
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var api_path = location.state.api_path;
    var course = location.state.course;
    var course_list = location.state.course_list;
    var lecture = location.state.lecture;
    var lecture_list = location.state.lecture_list;
    var session_list = location.state.session_list;
    var session = location.state.session;

    var date_created = String(new Date(session.created_at));
    var date_start = String(new Date(session.start));
    var date_end = String(new Date(session.end));

    if (session.updated_at != null) {
        var date_updated = String(new Date(session.updated_at))
    }

    function toHomePage(e) {
        e.preventDefault();
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

    async function deleteSession() {
        if (window.confirm('Are you sure you wish to delete this session?')) {
            var deleteSessionAPI = api_path + "/api/sessions/" + String(session.id)
            try {
                axios.delete(deleteSessionAPI,{ headers: {"Authorization" : `Bearer ${access_token}`} });
                alert("Session Deleted.")

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
            } catch(err) {
                console.log(err)
            }
        }
    }

    async function toAttendee() {
        var attendeeAPI = api_path + "/api/sessions/" + String(session.id) + "/attendees";
        var response = await axios.get(attendeeAPI, { headers: {"Authorization" : `Bearer ${access_token}`} });
        navigate('/Attendee', {
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
                session_list : session_list,
                session : session,
                attendee_list : response.data.data
            },
        });
    }

    async function endSession() {
        if (window.confirm('Are you sure you wish to end this session?')) {
            var endSessionAPI = api_path + "/api/sessions/"+ String(session.id) +"/end"
            try {
                axios.patch(endSessionAPI, {}, { headers: {"Authorization" : `Bearer ${access_token}`} });
                alert("Session Ended!")
            } catch(err) {
                console.log(err)
            }
        }
    }

    function toEditSession() {
        navigate('/EditSession', {
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
                session_list : session_list,
                session : session,
                name_placeholder : session.name,
                description_placeholder : session.description,
                start_placeholder : session.start,
                end_placeholder : session.end
            },
        });
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
                            <td>{date_created}</td>
                        </tr>
                        <tr>
                            <th>UPDATED</th>
                            <td>{date_updated}</td>
                        </tr>
                        <tr>
                            <th>START</th>
                            <td>{date_start}</td>
                        </tr>
                        <tr>
                            <th>END</th>
                            <td>{date_end}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input type={"button"} className="edit-button" value="Edit" onClick={toEditSession}></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <input type={"button"} className="big-blue-button" value={"ATTENDEE"} onClick={toAttendee}></input>
                
                <table className="navigation-table">
                    <tbody>
                        <tr>
                            <td>
                                <input className="navigation-red-button" type={"button"} value="END SESSION" onClick={endSession}></input>
                            </td>
                            <td>
                                <input className="navigation-red-button" type={"button"} value="DELETE SESSION" onClick={deleteSession}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="HOME" onClick={toHomePage}></input>
                            </td>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="BACK" onClick={goBack}></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}
export default TeacherSessionDetail