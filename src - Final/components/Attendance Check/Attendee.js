import React, { useState } from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {CSVLink} from "react-csv"

const Attendee = () => {
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
    var attendee_list = location.state.attendee_list;

    const [search_term, setSearchTerm] = useState("");

    const attendee_filtered_list = attendee_list.filter((item) => {
        return (item.username + " - " + item.name).toLowerCase().includes(search_term.toLowerCase());
    });

    const csvLinkEl = React.createRef();
    const headers=[
        {label:"User Name",key:"username"},
        {label:"Full Name",key:"name"},
        {label:"Time",key:"checkin_time"}
    ]

    function exportList() {
        csvLinkEl.current.link.click();
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
    
    async function toAddAttendee() {
        var enrolledAPI = api_path + "/api/courses/" + course.id + "/enroll"
        var enrolled_list = (await axios.get(enrolledAPI, { headers: {"Authorization" : `Bearer ${access_token}`} })).data

        var not_attendee_list = arrayDifference(enrolled_list, attendee_list)
        for (let item in not_attendee_list) {
            if (not_attendee_list[item].account_type === 2) {
                not_attendee_list.splice(item, 1);
            }
        }
        navigate('/AddAttendee', {
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
                not_attendee_list : not_attendee_list
            },
        });
    }

    function isEqual(a, b) {
        if(a["id"] === b["id"]) {
            return true
        }
        else {
            return false
        }
    }

    function arrayDifference(arrayA, arrayB) {
        return arrayA.filter(itemA => !arrayB.some(itemB => isEqual(itemA, itemB)));
    }

    function goBack() {
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
                session : session
            },
        });
    }

    


    return (
        <div className="container">
            <form>
                <h1>{session.name} - Attendee</h1>
                <input type="text" placeholder="Search for students" value={search_term} onChange={(e)=>{setSearchTerm(e.target.value)}}></input>
                <div className="list">
                    <ul>
                    {attendee_filtered_list.map((item) => {
                        return (
                            <li style={{marginBottom:"10px"}} key={item.id}>{item.username} - {item.name} - {String(new Date(item.checkin_time))}</li>  
                        )
                    })}
                    </ul>
                </div>
                
                
                <table className="navigation-table">
                    <tbody>  
                        <tr>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="ADD" onClick={toAddAttendee}></input>
                            </td>
                            <td>
                                <button type="button" className="navigation-blue-button" value="EXPORT" onClick={exportList}>
                                EXPORT
                                <CSVLink
                                    headers={headers}
                                    filename={course.name+"_"+lecture.name+"_"+session.name+"_Attendees.csv"}
                                    data={attendee_list}
                                    ref={csvLinkEl}></CSVLink>
                                </button>
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

export default Attendee