import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherLectureMenu = () => {
    const location = useLocation();
    let navigate = useNavigate();
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var course = location.state.course;
    var course_list = location.state.course_list;
    const [lecture_list] = useState(location.state.lecture_list);

    async function viewLectureDetail(select_id) {
        const api='http://35.240.197.121:80/api/lectures/';
        const api2=api+String(select_id)+'/sessions'   
        const response=await axios.get(api2,{ headers: {"Authorization" : `Bearer ${access_token}`} })
        for (let lecture in lecture_list) {
            if (lecture_list[lecture].id === select_id) {
                navigate('/TeacherSessionMenu', {
                    state : {
                        access_token : access_token,
                        username : username,
                        fullname : fullname,
                        account_type : account_type,
                        course_list : course_list,
                        course : course,
                        lecture_list : lecture_list,
                        lecture : lecture_list[lecture],
                        session_list : response.data
                    },
                });
            }
        }    
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

    async function toCourseMenu(e) {
        e.preventDefault();
        var response = await axios.get("http://35.240.197.121:80/api/courses", { headers: {"Authorization" : `Bearer ${access_token}`} });
        navigate('/TeacherCourseMenu', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                course_list : response.data
            },
        });
    }

    function goToLecture(){      
        navigate('/AddLecture',{
            state:{
                access_token:access_token,
                username:username,
                fullname:fullname,
                account_type:account_type,
                course:course,
                course_list:course_list,
                lecture_list:lecture_list,
            },
        });
    }

    return (
            <div className="teacher-lecture-menu">
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
                        </tbody>
                    </table>
                    <div className="lecture-list">
                        {lecture_list.map((item, index) => {
                            return (
                                <input type="button" id={item.id} key={item.id} value={item.name} onClick={()=>{viewLectureDetail(item.id)}}></input>
                            )
                        })}
                    </div>
                    <table className="navigation-table">
                        <tbody>
                            <tr>
                                <td>
                                    <button className="add-student-button" onClick={ goToLecture }>
                                        ADD LECTURE
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
                                    <input className="back-button" type={"button"} value="BACK" onClick={toCourseMenu}></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
    )
}

export default  TeacherLectureMenu