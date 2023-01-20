import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherSessionMenu = () => {
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
    const [session_list] = useState(location.state.session_list)
    
    function toHomePage(e) {
        e.preventDefault();
        navigate('/TeacherHP', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type 
            },
        });
    }

    function toAddSession(e){
        e.preventDefault();
        navigate('/AddSession',{
            state:{
             access_token : access_token,
             username : username,
             fullname : fullname,
             account_type : account_type,
             course : course,
             course_list : course_list,
             lecture : lecture,
             lecture_list : lecture_list,
             session_list:session_list
            },

        });
    }

    async function deleteSession(id){
        var delapi="http://35.240.197.121:80/api/sessions/";
        var delapi=delapi+{id};
        var response=await axios.delete(delapi,{ headers: {"Authorization" : `Bearer ${access_token}`} })
        console.log(response);
    }

    async function toLectureMenu(e) {
        var response = await axios.get("http://35.240.197.121:80/api/lectures", { headers: {"Authorization" : `Bearer ${access_token}`} });
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
                course_list : course_list,
                course : course,
                lecture_list : lecture_list
            },
        });
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
            <div className="teacher-session-menu">
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
                        </tbody>
                    </table>
                        <div className="session-list">
                            {session_list.map((item, index) => {
                                return (
                                    <input type="button" id={item.id} key={item.id} value={item.name} onClick={()=>{viewSessionDetail(item.id)}}></input>
                                )
                            })}  
                        </div>
                        <table className="navigation-table">
                            <tbody>
                                <tr>
                                    <td>
                                        <button className="add-session-button" onClick={toAddSession}>
                                            ADD SESSION
                                        </button>
                                    </td>
                                    <td>
                                        <button className="delete-session-button" onClick={deleteSession}>
                                            DELETE SESSION
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="navigation-table">
                            <tbody>  
                                <tr>
                                    <td>
                                        <input className="home-button" type={"button"} value="HOME" onClick={toHomePage}></input>
                                    </td>
                                    <td>
                                        <input className="back-button" type={"button"} value="BACK" onClick={toLectureMenu}></input>
                                    </td>
                                </tr>
                            </tbody> 
                        </table>                   
                </form>
            </div>
    )
}

export default  TeacherSessionMenu