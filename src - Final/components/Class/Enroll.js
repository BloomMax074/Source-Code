import React, { useState } from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Enroll = () => {
    let navigate = useNavigate();
    const location = useLocation();
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var api_path = location.state.api_path;
    var course = location.state.course;
    var course_list = location.state.course_list;
    var unenrolled_list = location.state.unenrolled_list;

    var teacher_list = [];
    var student_list = [];

    for (let x in unenrolled_list) {
        if (unenrolled_list[x].account_type===1) {
            student_list.push(unenrolled_list[x])
        }
    }
    for (let x in unenrolled_list) {
        if (unenrolled_list[x].account_type===2) {
            teacher_list.push(unenrolled_list[x])
        }
    }

    const [unenrolled_student_list, setUnenrolledStudent]=useState(student_list);
    const [unenrolled_teacher_list, setUnenrolledTeacher]=useState(teacher_list);

    const [search_term, setSearchTerm]=useState("");
    
    const student_filtered_list = unenrolled_student_list.filter((item) => {
        return (item.username + " - " + item.fullname).toLowerCase().includes(search_term.toLowerCase());
    });

    const teacher_filtered_list = unenrolled_teacher_list.filter((item) => {
        return (item.username + " - " + item.fullname).toLowerCase().includes(search_term.toLowerCase());
    });
    
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
        var classListAPI = api_path + "/api/courses/" + course.id + "/enroll";
        var response = await axios.get(classListAPI, { headers: { "Authorization" : `Bearer ${access_token}`} });
        var class_list = response.data;
        navigate('/ClassList', { 
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                api_path : api_path,
                course : course,
                course_list : course_list,
                class_list : class_list
            },
        });
    }

    function enrollTeacher(id) {
        var enrollAPI = api_path +"/api/courses/"+String(course.id)+"/enroll"
        const newUser = {
            users : [id]
        }
        axios.post(enrollAPI, newUser, { headers: { "Authorization" : `Bearer ${access_token}`} })
        var updateRoleAPI = api_path + "/api/courses/"+String(course.id)+"/role"
        const newUserRole = {
            user_id : id,
            role_id : 2
        }
        axios.patch(updateRoleAPI, newUserRole, { headers: { "Authorization" : `Bearer ${access_token}`} })
        alert("User Enrolled")
        const newTeacherList = teacher_list.filter((x)=>x.id !== id)
        setUnenrolledTeacher(newTeacherList)
    }

    function enrollStudent(id) {
        var enrollAPI = api_path +"/api/courses/"+String(course.id)+"/enroll"
        const newUser = {
            users : [id]
        }
        axios.post(enrollAPI, newUser, { headers: { "Authorization" : `Bearer ${access_token}`} })
        alert("User Enrolled")
        const newStudentList = student_list.filter((x)=>x.id !== id)
        setUnenrolledStudent(newStudentList)
    }

    return(
        <div className="container">
            <form>
                <h1>{course.name} - Enroll</h1>
                
                <input type={"text"} value={search_term} placeholder="Search" onChange={(e)=>setSearchTerm(e.target.value)}></input>
                
                <p style={{textAlign: "center", fontWeight: "bold", fontSize: "18sp"}}>Teacher</p>
                
                <div className="account-list">                
                    {teacher_filtered_list.map((item) => {
                        return (
                            <input type={"button"} key={item.id} value={item.username + " - " + item.fullname} onClick={()=>{enrollTeacher(item.id)}}></input>
                        )
                    })}
                </div>

                <p style={{textAlign: "center", fontWeight: "bold", fontSize: "18sp"}}>Student</p>
                
                <div className="account-list">                
                    {student_filtered_list.map((item) => {
                        return (
                            <input type={"button"} key={item.id} value={item.username + " - " + item.fullname} onClick={()=>{enrollStudent(item.id)}}></input>
                        )
                    })}
                </div>

                <table className="navigation-table">
                    <tbody>
                        <tr>
                            <td>
                                <input className="navigation-blue-button" type={"button"}  value="HOME" onClick={toHomePage}></input>
                            </td>
                            <td>
                                <input className="navigation-blue-button" type={"button"}  value="BACK" onClick={goBack}></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default Enroll