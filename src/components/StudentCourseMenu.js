import React, { useState } from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const StudentCourseMenu = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const [course_list, setCourseList] = useState(location.state.course_list);
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;

    function toHomePage() {
        navigate('/StudentHP', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type 
            },
        });
    }

    async function viewCourseDetail(select_id) {
        for (let course in course_list) {
            if (course_list[course].id == select_id){
                var response = await axios.get("http://35.240.197.121:80/api/lectures", { headers: {"Authorization" : `Bearer ${access_token}`} });
                var lecture_list = []
                for (let lecture in response.data) {
                    if (response.data[lecture].course_id == select_id) {
                        lecture_list.push(response.data[lecture])
                    }
                }
                navigate('/StudentLectureMenu', {
                    state : {
                        access_token : access_token,
                        username : username,
                        fullname : fullname,
                        account_type : account_type,
                        course_list : course_list,
                        course : course_list[course],
                        lecture_list : lecture_list
                    },
                });
            }
        }
    }

    return (
        <div className="student-course-menu">
            <form>
                <h1>ENROLLED COURSES</h1>
                <div className="course-list">
                    {course_list.map((item, index) => {
                        return (
                            <input type="button" id={item.id} key={item.id} value={item.name} onClick={()=>{viewCourseDetail(item.id)}}></input>
                        )
                    })}
                </div>
                <table className="navigation-table">
                    <tbody>   
                        <tr>
                            <td>
                                <input className="home-button" type={"button"} onClick={toHomePage} value="HOME"></input>
                            </td>
                            <td>
                                <input className="back-button" type={"button"} onClick={toHomePage} value="BACK"></input>
                            </td>
                        </tr>
                    </tbody> 
                </table>
            </form>
        </div>
    )
}

export default StudentCourseMenu