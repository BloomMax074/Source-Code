import React, { useState } from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
    let navigate = useNavigate();
    const location = useLocation();
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var api_path = location.state.api_path;
    var type = location.state.type;
    var course;

    const [name_placeholder, setNamePlaceholder]=useState(location.state.name_placeholder);
    const [description_placeholder, setDescriptionPlaceholder]=useState(location.state.description_placeholder);

    const [name_edited, setNameEdited]=useState("");
    const [description_edited, setDescriptionEdited]=useState("");

    if (type === "Course") {
        course = location.state.course;
    }

    if (type === "Lecture") {
        course = location.state.course;
        var course_list = location.state.course_list;
        var lecture = location.state.lecture;
    }

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
        var response;
        var lecturesAPI;
        if (type === "Course") {
            lecturesAPI = api_path + "/api/lectures";
            response = await axios.get(lecturesAPI, { headers: {"Authorization" : `Bearer ${access_token}`} });
            var lecture_list = []
            for (let lecture in response.data) {
                if (response.data[lecture].course_id === course.id) {
                    lecture_list.push(response.data[lecture])
                }
            }

            var coursesAPI = api_path + "/api/courses";
            response = await axios.get(coursesAPI, { headers: {"Authorization" : `Bearer ${access_token}`} });
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
                            course_list : location.state.course_list,
                            lecture_list : lecture_list
                        },
                    });
                }
            }
        }

        if (type === "Lecture") {
            lecturesAPI = api_path + "/api/lectures";
            response = await axios.get(lecturesAPI, { headers: {"Authorization" : `Bearer ${access_token}`} });
            for (let x in response.data) {
                if (response.data[x].id === lecture.id) {
                    lecture = response.data[x];
                }
            }

            var sessionAPI = api_path + "/api/courses/" + String(course.id) + "/sessions"
            response = await axios.get(sessionAPI, { headers: {"Authorization" : `Bearer ${access_token}`} });
            var session_list = [];
            for (let session in response.data) {
                if (response.data[session].lecture_id === lecture.id) {
                    session_list.push(response.data[session])
                }
            }

            navigate('/TeacherSessionMenu', {
                state : {
                    access_token : access_token,
                    username : username,
                    fullname : fullname,
                    account_type : account_type,
                    api_path : api_path,
                    course : course,
                    course_list : course_list,
                    lecture : lecture,
                    session_list : session_list
                },
            }); 
        }
    }

    async function submitChange() {
        var response;
        if (type === "Course") {
            var changeCourseAPI = api_path + "/api/courses/" + course.id;
            if (name_edited.length === 0) {
                const course_edited = {
                    description : description_edited
                }
                response = await axios.patch(changeCourseAPI, course_edited, { headers: {"Authorization" : `Bearer ${access_token}`} })
                setDescriptionPlaceholder(description_edited);
                alert(response.data.data);
            }
            else if (description_edited.length === 0) {
                const course_edited = {
                    name : name_edited
                }
                response = await axios.patch(changeCourseAPI, course_edited, { headers: {"Authorization" : `Bearer ${access_token}`} })
                setNamePlaceholder(name_edited)
                alert(response.data.data);
            }
            else {
                const course_edited = {
                    name : name_edited,
                    description : description_edited
                }
                setNamePlaceholder(name_edited);
                setDescriptionPlaceholder(description_edited);
                response = await axios.patch(changeCourseAPI, course_edited, { headers: {"Authorization" : `Bearer ${access_token}`} })
                alert(response.data.data);
            }
        }

        if (type === "Lecture") {
            var changeLectureAPI = api_path + "/api/lectures/" + lecture.id;
            if (name_edited.length === 0) {
                const lecture_edited = {
                    description : description_edited
                }
                response = await axios.patch(changeLectureAPI, lecture_edited, { headers: {"Authorization" : `Bearer ${access_token}`} })
                setDescriptionPlaceholder(description_edited);
                alert(response.data.data);
            }
            else if (description_edited.length === 0) {
                const lecture_edited = {
                    name : name_edited
                }
                response = await axios.patch(changeLectureAPI, lecture_edited, { headers: {"Authorization" : `Bearer ${access_token}`} })
                setNamePlaceholder(name_edited)
                alert(response.data.data);
            }
            else {
                const lecture_edited = {
                    name : name_edited,
                    description : description_edited
                }
                setNamePlaceholder(name_edited);
                setDescriptionPlaceholder(description_edited);
                response = await axios.patch(changeLectureAPI, lecture_edited, { headers: {"Authorization" : `Bearer ${access_token}`} })
                alert(response.data.data);
            }

        }

        document.getElementById('edit-name').value = '';
        document.getElementById('edit-description').value = '';
    }
        
    return (
        <div className="container">
            <form>
                <h1>EDIT {type.toUpperCase()}</h1>
			    
                <label htmlFor="edit-name">{type} Name:</label>
			    <input type="text" placeholder={name_placeholder} id="edit-name" onChange={(e)=>setNameEdited(e.target.value)}/>
                
                <label htmlFor="edit-description">{type} Description:</label>
                <input type="text" placeholder={description_placeholder} id="edit-description" onChange={(e)=>setDescriptionEdited(e.target.value)}/>
                
                <input className="big-blue-button" type="button" value={"EDIT " + type.toUpperCase()} onClick={submitChange}></input>
                
                <table className="navigation-table">
                    <tbody>
                        <tr>
                            <td>
                                <input className="navigation-blue-button" type={"button"} onClick={toHomePage} value="HOME"></input>
                            </td>
                            <td>
                                <input className="navigation-blue-button" type={"button"} onClick={goBack} value="BACK"></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default Edit