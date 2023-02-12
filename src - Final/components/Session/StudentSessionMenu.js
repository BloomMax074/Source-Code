import React from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const StudentSessionMenu = () => {
    const location = useLocation();
    let navigate = useNavigate();
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var course = location.state.course;
    var course_list = location.state.course_list;
    var lecture = location.state.lecture;
    var lecture_list = location.state.lecture_list;
    var session_list = location.state.session_list;
    var api_path = location.state.api_path;

    if (lecture.updated_at != null) {
        var lecture_updated_at = String(new Date(lecture.updated_at));
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

    async function toLectureMenu(e) {
        var lecturesAPI = api_path + "/api/lectures";
        var response = await axios.get(lecturesAPI, { headers: {"Authorization" : `Bearer ${access_token}`} });
        var lecture_list = []
        for (let lecture in response.data) {
            if (response.data[lecture].course_id === course.id) {
                lecture_list.push(response.data[lecture])
            }
        }
        navigate('/StudentLectureMenu', {
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

    function viewSessionDetail(select_id) {
        for (let session in session_list) {
            if (session_list[session].id === select_id) {
                navigate('/StudentSessionDetail', {
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
                            <td>{String(new Date(lecture.created_at))}</td>
                        </tr>
                        <tr>
                            <th>UPDATED</th>
                            <td>{lecture_updated_at}</td>
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

export default StudentSessionMenu