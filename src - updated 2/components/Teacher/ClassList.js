import React, {useState} from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ClassList = () => {
    let navigate = useNavigate();
    const location = useLocation();
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var api_path = location.state.api_path;
    var course = location.state.course;
    var course_list = location.state.course_list;
    var class_list = location.state.class_list;
    
    const [search_term, setSearchTerm]=useState("");
    

    const filtered_list = class_list.filter((item) => {
        return (item.username + " - " + item.fullname).toLowerCase().includes(search_term.toLowerCase());
      });
    
    
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

    

    async function goBack(e) {
        e.preventDefault();
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

    async function toDismiss() {
        navigate('/ClassManage', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                api_path : api_path,
                course_list : course_list,
                course : course,
                class_list : location.state.class_list,
                type : "Dismiss"
            },
        });
    }

    return (
        <div className="container">
            <form>
                <h1>{course.name} - Class List</h1>
                <input type={"text"} value={search_term} placeholder="Search for Students" onChange={(e)=>setSearchTerm(e.target.value)}></input>
                <div className="list">
                    <ul>
                        {filtered_list.map((item) => {
                            return (
                                <li style={{marginBottom:"10px"}} key={item.id}>{item.username + " - " + item.fullname}</li>
                            )
                        })}
                    </ul>
                </div>
                
                <input type="button" className="big-blue-button" value="EXPORT"></input>
                
                <table className="navigation-table">
                    <tbody>
                        <tr>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="ENROLL" ></input>
                            </td>
                            <td>
                                <input className="navigation-red-button" type={"button"} value="DISMISS" onClick={toDismiss}></input>
                            </td>
                        </tr>
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

export default ClassList