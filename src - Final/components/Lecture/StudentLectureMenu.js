import React from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const StudentLectureMenu = () => {
    const location = useLocation();
    let navigate = useNavigate();
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var course = location.state.course;
    var course_list = location.state.course_list;
    var api_path = location.state.api_path;
    var lecture_list = location.state.lecture_list;

    if (course.updated_at != null) {
        var course_updated_at = String(new Date(course.updated_at));
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
                navigate('/StudentSessionMenu', {
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

    function toHomePage(e) {
        e.preventDefault();
        navigate('/StudentHP', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                api_path : api_path
            },
        });
    }

    async function toCourseMenu(e) {
        e.preventDefault();
        var coursesAPI = api_path + "/api/courses";
        var response = await axios.get(coursesAPI, { headers: {"Authorization" : `Bearer ${access_token}`} });
        navigate('/StudentCourseMenu', {
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
                            <th>CREATED</th>
                            <td>{String(new Date(course.created_at))}</td>
                        </tr>
                        <tr>
                            <th>UPDATED</th>
                            <td>{course_updated_at}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="list">
                    {lecture_list.map((item) => {
                        return (
                            <input type="button" key={item.id} value={item.name} onClick={()=>{viewLectureDetail(item.id)}}></input>
                        )
                    })}
                </div>
                <table className="navigation-table">
                    <tbody>
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

export default StudentLectureMenu