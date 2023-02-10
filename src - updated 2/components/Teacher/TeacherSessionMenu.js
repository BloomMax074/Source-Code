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
    var session_list = location.state.session_list;

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
                            <th>CREATED AT</th>
                            <td>{lecture.created_at}</td>
                        </tr>
                        <tr>
                            <th>UPDATED AT</th>
                            <td>{lecture.updated_at}</td>
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
                            <input type="button" key={item.id} value={item.name} ></input>
                        )
                    })}
                </div>
                <table className="navigation-table">
                    <tbody>
                        <tr>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="ADD SESSION"></input>
                            </td>
                            <td>
                                <input className="navigation-red-button" type={"button"} value="DELETE LECTURE"></input>
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