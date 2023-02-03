import React, { useState } from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
    let navigate = useNavigate();
    const location = useLocation();
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var api_path = location.state.api_path;
    var type = location.state.type;

    const [name_add, setNameAdd]=useState("");
    const [description_add, setDescriptionAdd]=useState("");
    
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

    async function goBack() {
        if (type === "Course") {
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

        if (type === "Lecture") {
            var course = location.state.course;
            var lecturesAPI = api_path + "/api/lectures";
            var response = await axios.get(lecturesAPI, { headers: {"Authorization" : `Bearer ${access_token}`} });
            var lecture_list = []
            for (let lecture in response.data) {
                if (response.data[lecture].course_id === course.id) {
                    lecture_list.push(response.data[lecture])
                }
            }

            var coursesAPI = api_path + "/api/courses";
            var response = await axios.get(coursesAPI, { headers: {"Authorization" : `Bearer ${access_token}`} });
            for (let ocourse in response.data) {
                if (response.data[ocourse].id === course.id) {
                    navigate('/TeacherLectureMenu', {
                        state : {
                            access_token : access_token,
                            username : username,
                            fullname : fullname,
                            account_type : account_type,
                            api_path : api_path,
                            course : response.data[ocourse],
                            lecture_list : lecture_list
                        },
                    });
                }
            }
        }
    }

    async function submitChange() {
        
        if (type === "Course") {
            var addCourseAPI = api_path + "/api/courses";
            const newCourse={
                name : name_add,
                description : description_add
            }
            var response = await axios.post(addCourseAPI, newCourse, { headers: {"Authorization" : `Bearer ${access_token}`} })
            document.getElementById('add-name').value = '';
            document.getElementById('add-description').value = '';
            alert(response.data.data)
        }

        if (type === "Lecture") {
            var course = location.state.course;
            var addLectureAPI = api_path + "/api/lectures";
            const newLecture={
                course_id : course.id,
                name : name_add,
                description : description_add
            }
            var response = await axios.post(addLectureAPI, newLecture, { headers: {"Authorization" : `Bearer ${access_token}`} })
            document.getElementById('add-name').value = '';
            document.getElementById('add-description').value = '';
            alert(response.data.data)
        }
    }


    return (
        <div className="container">
            <form>
                <h1>ADD NEW {type.toUpperCase()}</h1>

                <label htmlFor="add-name">{type} Name:</label>
			    <input type="text" placeholder={"Enter " + type + " Name"} id="add-name" onChange={(e)=>setNameAdd(e.target.value)}/>

                <label htmlFor="add-description">{type} Name:</label>
			    <input type="text" placeholder={"Enter " + type + " Description"} id="add-description" onChange={(e)=>setDescriptionAdd(e.target.value)}/>

                <input className="big-blue-button" type="button" value={"CREATE " + type.toUpperCase()} onClick={submitChange} ></input>

                <table className="navigation-table">
                    <tbody>
                        <tr>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="HOME" onClick={toHomePage}></input>
                            </td>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="BACK" onClick={goBack}></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default Add