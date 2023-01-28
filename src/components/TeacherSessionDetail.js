import React, { useState } from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherSessionDetail = () => {
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
    var session = location.state.session;
    var session_list = location.state.session_list;
    const [end,EditEnd]= useState(location.state.session.end)
    const id2=session.id;

    async function DeleteSession(e){
       e.preventDefault();
        const api1='http://35.240.197.121:80/api/sessions/'+String(session.id);
        console.log(api1);
        const response=await axios.delete(api1,{ headers: {"Authorization" : `Bearer ${access_token}`} });
        console.log(response);
        alert(response.data.data+' Successfully, you can push the BACK button to go back');
    }

    function toUpdateSession(e){
        e.preventDefault();
        navigate('/TeacherSessionUpdate',{
            state:{
                 access_token:access_token,
                 username:username,
                 fullname:fullname,
                 account_type:account_type,
                 course:course,
                 course_list:course_list,
                 lecture:lecture,
                 lecture_list:lecture_list,
                 session:session,
                 session_list:session_list
            }
        })
    }

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

    async function toSessionMenu(e) {
        e.preventDefault();
        const api='http://35.240.197.121:80/api/lectures/';
        const api2=api+String(lecture.id)+'/sessions'
        const response=await axios.get(api2,{ headers: {"Authorization" : `Bearer ${access_token}`} })
        navigate('/TeacherSessionMenu',{
            state:{
                access_token:access_token,
                username:username,
                fullname:fullname,
                account_type:account_type,
                course:course,
                course_list:course_list,
                lecture:lecture,
                lecture_list:lecture_list,
                session_list:response.data,
            },
        });
    }

    async function EndSession(e){
        e.preventDefault();
        var stopApi="http://35.240.197.121:80/api/sessions/";
        stopApi = stopApi + String(session.id ) + "/end";
        var response=await axios.patch(stopApi,{},{ headers: {"Authorization" : `Bearer ${access_token}`} });
        console.log(response)
        EditEnd(response.data.data);   
    }
    /*{ end: 'update' }*/

    return (
            <div className="teacher-session-detail">
                <form>
                    <h1>{course.name}</h1>
                    <h1>{lecture.name}</h1>
                    <h1>{session.name}</h1>
                    <table className="info-table">
                        <tbody>   
                            <tr>
                                <th>SESSION NAME</th>
                                <td>{session.name}</td>
                            </tr>
                            <tr>
                                <th>SESSION ID</th>
                                <td>{session.id}</td>
                            </tr>
                            <tr>
                                <th>SESSION DESCRIPTION</th>
                                <td>{session.description}</td>
                            </tr>
                            <tr>
                                <th>CREATED AT</th>
                                <td>{session.created_at}</td>
                            </tr>
                            <tr>
                                <th>UPDATED AT</th>
                                <td>{session.updated_at}</td>
                            </tr>
                            <tr>
                                <th>START</th>
                                <td>{session.start}</td>
                            </tr>
                            <tr>
                                <th>END</th>
                                <td>{session.end}</td>
                            </tr>
                        </tbody> 
                    </table>
                    <input className="delete-session-button" type={"button"} value="END SESSION" onClick={EndSession}></input>

                    <table className="navigation-table">
                     <tr>
                        <td>
                        <button className="delete-session-button" onClick={DeleteSession}>
                        DELETE THIS SESSION
                        </button>
                     </td>
                     <td>
                        <button className="delete-session-button" onClick={toUpdateSession}>
                        UPDATE SESSION
                        </button>
                     </td>

                        </tr>
                        <tr>
                            <td>
                                <input className="home-button" type={"button"} value="HOME" onClick={toHomePage}></input>
                            </td>
                            <td>
                                <input className="back-button" type={"button"} value="BACK" onClick={toSessionMenu}></input>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
    )
}
export default TeacherSessionDetail