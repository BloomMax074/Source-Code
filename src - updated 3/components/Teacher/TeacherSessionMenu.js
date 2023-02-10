import React from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherSessionMenu = () => {
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

    if (lecture.updated_at != null) {
        var lecture_updated_at = lecture.updated_at.slice(0,10)
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

    async function toLectureMenu() {
        var lecturesAPI = api_path + "/api/lectures";
        var response = await axios.get(lecturesAPI, { headers: {"Authorization" : `Bearer ${access_token}`} });
        var lecture_list = []
        for (let lecture in response.data) {
            if (response.data[lecture].course_id === course.id) {
                lecture_list.push(response.data[lecture])
            }
        }
        navigate('/TeacherLectureMenu', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                api_path : api_path,
                course_list : course_list,
                course : course,
                lecture_list : lecture_list
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
                course_list : course_list,
                lecture: lecture,
                type : "Lecture",
                name_placeholder : lecture.name,
                description_placeholder : lecture.description
            },
        });
    }

    async function deleteLecture() {
        if (window.confirm('Are you sure you wish to delete this lecture?')) {
            var delLectureAPI = api_path + "/api/lectures/" + String(lecture.id);
            axios.delete(delLectureAPI, { headers: {"Authorization" : `Bearer ${access_token}`} })
            alert("Lecture Deleted")

            var lecturesAPI = api_path + "/api/lectures";
            var response = await axios.get(lecturesAPI, { headers: {"Authorization" : `Bearer ${access_token}`} });
            var lecture_list = []
            for (let lecture in response.data) {
                if (response.data[lecture].course_id === course.id) {
                    lecture_list.push(response.data[lecture])
                }
            }
            navigate('/TeacherLectureMenu', {
                state : {
                    access_token : access_token,
                    username : username,
                    fullname : fullname,
                    account_type : account_type,
                    api_path : api_path,
                    course_list : course_list,
                    course : course,
                    lecture_list : lecture_list
                },
            });
        }
    }

    function viewSessionDetail(select_id) {
        for (let session in session_list) {
            if (session_list[session].id === select_id) {
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
                        session : session_list[session]
                    },
                });
            }
        }
    }

    function toCreateSession() {
        navigate('/CreateSession', {
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
                session_list : session_list
            },
        });
    }
    
    return (
        <div className="container">
            <form>
                <h1>{course.name}</h1>
                <h1>{lecture.name}</h1>
                <table className="info-table">
                    <tbody>
                        <tr>
                            <th>LECTURE NAME</th>
                            <td>{lecture.name}</td>
                        </tr>              
                        <tr>
                            <th>LECTURE DESCRIPTION</th>
                            <td>{lecture.description}</td>
                        </tr>
                        <tr>
                            <th>CREATED</th>
                            <td>{lecture.created_at.slice(0, 10)}</td>
                        </tr>
                        <tr>
                            <th>UPDATED</th>
                            <td>{lecture_updated_at}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input type={"button"} className="edit-button" value="Edit" onClick={toEdit}></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="list">
                    {session_list.map((item) => {
                        return (
                            <input type="button" key={item.id} value={item.name} onClick={()=>{viewSessionDetail(item.id)}}></input>
                        )
                    })}
                </div>
                <table className="navigation-table">
                    <tbody>
                        <tr>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="CREATE SESSION" onClick={toCreateSession}></input>
                            </td>
                            <td>
                                <input className="navigation-red-button" type={"button"} value="DELETE LECTURE" onClick={deleteLecture}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="HOME" onClick={toHomePage}></input>
                            </td>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="BACK" onClick={toLectureMenu}></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default TeacherSessionMenu