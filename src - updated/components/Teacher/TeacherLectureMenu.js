import React from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


const TeacherLectureMenu = () => {
    let navigate = useNavigate();
    const location = useLocation();
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var api_path = location.state.api_path;
    var course = location.state.course;
    var course_list = location.state.course_list;
    var lecture_list = location.state.lecture_list;

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

    function toAdd(e) {
        e.preventDefault();
        navigate('/Add', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                api_path : api_path,
                course : course,
                type : "Lecture"
            },
        });
    }

    function toEdit(e) {
        e.preventDefault();
        navigate('/Edit', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                api_path : api_path,
                course : course,
                course_list: course_list,
                lecture_list: lecture_list,
                type : "Course",
                name_placeholder : course.name,
                description_placeholder : course.description
            },
        });
    }

    async function toCourseMenu(e) {
        e.preventDefault();
        var coursesAPI = api_path + "/api/courses";
        var response = await axios.get(coursesAPI, { headers: { "Authorization" : `Bearer ${access_token}`} });
        navigate('/TeacherCourseMenu', { 
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                api_path : api_path,
                course_list : response.data
            },
        });
    }

    async function viewLectureDetail(select_id) {
        for (let lecture in lecture_list) {
            if (lecture_list[lecture].id === select_id) {
                var sessionsAPI = api_path + "/api/courses/" + String(course.id) + "/sessions";
                var response = await axios.get(sessionsAPI, { headers: {"Authorization" : `Bearer ${access_token}`} });
                var session_list =[]
                for (let session in response.data) {
                    if (response.data[session].course_id === course.id && response.data[session].lecture_id === select_id) {
                        session_list.push(response.data[session])
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
                        lecture : lecture_list[lecture],
                        session_list : session_list
                    },
                });
            }
        }
    }
    
    async function deleteCourse() {
        if (window.confirm('Are you sure you wish to delete this course?')) {
            var delCourseAPI = api_path + "/api/courses/" + String(course.id);
            var response = await axios.delete(delCourseAPI, { headers: {"Authorization" : `Bearer ${access_token}`} })
            alert(response.data.data)
            var coursesAPI = api_path + "/api/courses";
            var response = await axios.get(coursesAPI, { headers: { "Authorization" : `Bearer ${access_token}`} });
            navigate('/TeacherCourseMenu', { 
                state : {
                    access_token : access_token,
                    username : username,
                    fullname : fullname,
                    account_type : account_type,
                    api_path : api_path,
                    course_list : response.data
                },
            });
        }
    }

    return (
        <div className="container">
            <form>
                <h1>{course.name}</h1>
                <table className="info-table">
                    <tbody>
                        <tr>
                            <th>COURSE NAME</th>
                            <td>{course.name}</td>
                        </tr>
                        <tr>
                            <th>COURSE DESCRIPTION</th>
                            <td>{course.description}</td>
                        </tr>
                        <tr>
                            <th>CREATED AT</th>
                            <td>{course.created_at}</td>
                        </tr>
                        <tr>
                            <th>UPDATED AT</th>
                            <td>{course.updated_at}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input type={"button"} className="edit-button" value="Edit" onClick={toEdit}></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="list">
                    {lecture_list.map((item) => {
                        return (
                            <input type="button" key={item.id} value={item.name} onClick={()=>viewLectureDetail(item.id)}></input>
                        )
                    })}
                </div>
                
                <input type="button" className="big-blue-button" value="CLASS LIST"></input>
                
                <table className="navigation-table">
                    <tbody>
                        <tr>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="NEW LECTURE" onClick={toAdd}></input>
                            </td>
                            <td>
                                <input className="navigation-red-button" type={"button"} value="DELETE COURSE" onClick={deleteCourse}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="HOME" onClick={toHomePage}></input>
                            </td>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="BACK" onClick={toCourseMenu}></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default  TeacherLectureMenu