import React from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherCourseMenu = () => {
    let navigate = useNavigate();
    const location = useLocation();
    var course_list = location.state.course_list;
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var api_path = location.state.api_path;

    function toHomePage() {
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

    function toAddCoursePage() {
        navigate('/Add', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                api_path : api_path,
                type : "Course"
            },
        });
    }

    async function viewCourseDetail(select_id){
        var lecturesAPI = api_path + "/api/lectures";
        for (let course in course_list) {
            if (course_list[course].id === select_id){
                var response = await axios.get(lecturesAPI, { headers: {"Authorization" : `Bearer ${access_token}`} });
                var lecture_list = []
                for (let lecture in response.data) {
                    if (response.data[lecture].course_id === select_id) {
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
                        course : course_list[course],
                        lecture_list : lecture_list
                    },
                });
            }
        }
    }

    return (   
        <div className="container">
            <form>
                <h1>ALL COURSES</h1>    
                <div className="list">
                    {course_list.map((item) => {
                        return (
                            <input type="button" key={item.id} value={item.name} onClick={()=>{viewCourseDetail(item.id)}}></input>
                        )
                    })}
                </div>
                <input type="button" className="big-blue-button" value="ADD COURSE" onClick={toAddCoursePage}></input>
                <table className="navigation-table">
                    <tbody>                        
                        <tr>
                            <td>
                                <input type="button" className="navigation-blue-button" value="HOME" onClick={toHomePage}></input>
                            </td>
                            <td>
                                <input type="button" className="navigation-blue-button" value="BACK" onClick={toHomePage}></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default TeacherCourseMenu