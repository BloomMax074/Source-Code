import React, {useState} from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AddAttendee = () => {
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
    
    var not_attendee_list = location.state.not_attendee_list;
    var student_list = [];
    for (let x in not_attendee_list) {
        if (not_attendee_list[x].account_type===1) {
            student_list.push(not_attendee_list[x])
        }
    }

    const [add_student_list, setAddStudentList] = useState(student_list);    
    const [search_term, setSearchTerm] = useState("");

    var not_attendee_filtered_list = add_student_list.filter((item) => {
        return (item.username + " - " + item.fullname).toLowerCase().includes(search_term.toLowerCase());
    });

    function addAttendee(select_id) {
        if (window.confirm('Are you sure you wish to check attendance for this student?')) {
            var addAttendeeAPI = api_path + "/api/sessions/"+ String(session.id) +"/attendees/" + String(select_id);
            axios.patch(addAttendeeAPI, {}, { headers: {"Authorization" : `Bearer ${access_token}`} });
            alert("Attendance List Updated");
            const newStudentList = student_list.filter((x)=>x.id !== select_id)
            setAddStudentList(newStudentList)
        }
    }

    async function goBack() {
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
    
    return(
        <div className="container">
            <form>
                <h1>{session.name} - Add Attendee</h1>
                
                <input type={"text"} placeholder={"Search for Students"} value={search_term} onChange={(e)=>{setSearchTerm(e.target.value)}}></input>

                <div className="account-list">
                    {not_attendee_filtered_list.map((item) => {
                        return (
                            <input type="button" 
                            id={item.id} 
                            key={item.id} 
                            value={item.username + " - " + item.fullname}
                            onClick={()=>{addAttendee(item.id)}}></input>
                        )})
                    }
                </div>

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

export default AddAttendee