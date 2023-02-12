import React, { useState } from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Dismiss = () => {
    let navigate = useNavigate();
    const location = useLocation();
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var api_path = location.state.api_path;
    var course = location.state.course;
    var course_list = location.state.course_list;
    var class_list = location.state.class_list;

    var teacher_list = [];
    var student_list = [];

    for (let x in class_list) {
        if (class_list[x].account_type===1) {
            student_list.push(class_list[x])
        }
    }
    for (let x in class_list) {
        if (class_list[x].account_type===2) {
            teacher_list.push(class_list[x])
        }
    }

    const [enrolled_student_list, setEnrolledStudent]=useState(student_list);
    const [enrolled_teacher_list, setEnrolledTeacher]=useState(teacher_list);

    const [search_term, setSearchTerm]=useState("");
    
    const teacher_filtered_list = enrolled_teacher_list.filter((item) => {
        return (item.username + " - " + item.fullname).toLowerCase().includes(search_term.toLowerCase());
    });

    const student_filtered_list = enrolled_student_list.filter((item) => {
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

    async function dismissTeacher(select_id) {
        var meAPI = api_path + "/api/auth/me";
        var response  = await axios.get(meAPI, { headers: { "Authorization" : `Bearer ${access_token}`} });
        if (response.data.id === select_id) {
            alert("You cannot dismiss yourself.")
        }
        else {
            if (window.confirm('Are you sure you wish dismiss this user??')) {
                var courseAPI = api_path + "/api/courses/"+String(course.id)+"/enroll"
                axios.delete(courseAPI, { data: {users : [select_id]}, headers: { "Authorization" : `Bearer ${access_token}`} })
                alert("User Dismissed")
                const newTeacherList = teacher_list.filter((x)=>x.id !== select_id)
                setEnrolledTeacher(newTeacherList)
                
            }
        }
    }

    async function dismissStudent(select_id) {
        if (window.confirm('Are you sure you wish dismiss this user??')) {
            var courseAPI = api_path + "/api/courses/"+String(course.id)+"/enroll"
            axios.delete(courseAPI, { data: {users : [select_id]}, headers: { "Authorization" : `Bearer ${access_token}`} })
            alert("User Dismissed")
            const newStudentList = student_list.filter((x)=>x.id !== select_id)
            setEnrolledStudent(newStudentList)
            
        }
    }

    return(
        <div className="container">
            <form>
                <h1>{course.name} - DISMISS</h1>
                <input type={"text"} placeholder={"Search for Students"} value={search_term} onChange={(e)=>setSearchTerm(e.target.value)}></input>
                
                <p style={{textAlign: "center", fontWeight: "bold", fontSize: "18sp"}}>Teacher</p>
                <div className="account-list">
                    {teacher_filtered_list.map((item) => {
                        return (
                            <input type="button" 
                            id={item.id} 
                            key={item.id} 
                            value={item.username + " - " + item.fullname}
                            onClick={()=>{dismissTeacher(item.id)}}></input>
                        )})
                    }  
                </div>
                <p style={{textAlign: "center", fontWeight: "bold", fontSize: "18sp"}}>Student</p>
                <div className="account-list">
                    {student_filtered_list.map((item) => {
                        return (
                            <input type="button" 
                            id={item.id} 
                            key={item.id} 
                            value={item.username + " - " + item.fullname}
                            onClick={()=>{dismissStudent(item.id)}}></input>
                        )})
                    }  
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

export default Dismiss

