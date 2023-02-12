import React, {useState} from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {CSVLink} from "react-csv"

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
    var teacher_list = [];
    var student_list = [];

    for (let x in class_list) {
        if (class_list[x].role_id===1) {
            student_list.push(class_list[x])
        }
    }
    for (let x in class_list) {
        if (class_list[x].role_id===2) {
            teacher_list.push(class_list[x])
        }
    }
    
    const [search_term, setSearchTerm]=useState("");
    

    const student_filtered_list = student_list.filter((item) => {
        return (item.username + " - " + item.fullname).toLowerCase().includes(search_term.toLowerCase());
    });

    const teacher_filtered_list = teacher_list.filter((item) => {
        return (item.username + " - " + item.fullname).toLowerCase().includes(search_term.toLowerCase());
    });

    const csvLinkEl = React.createRef();
    const headers=[
        {label:"User Name",key:"username"},
        {label:"Full Name",key:"fullname"},
        {label:"Role",key:"role_id"}
    ]

    function exportList() {
        csvLinkEl.current.link.click();
    }
    
    
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

    async function toEnroll() {
        var userAPI = api_path + "/api/users"
        var response = await axios.get(userAPI, { headers: {"Authorization" : `Bearer ${access_token}`} });
        var account_list = response.data
        var unenrolled_list = arrayDifference(account_list, class_list)

        navigate('/Enroll', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                api_path : api_path,
                course : course,
                course_list : course_list,
                unenrolled_list : unenrolled_list
            },
        });       

    }

    function isEqual(a, b) {
        if(a["id"] === b["id"]) {
            return true
        }
        else {
            return false
        }
    }

    function arrayDifference(arrayA, arrayB) {
        return arrayA.filter(itemA => !arrayB.some(itemB => isEqual(itemA, itemB)));
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

    function toDismiss() {
        navigate('/Dismiss', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                api_path : api_path,
                course_list : course_list,
                course : course,
                class_list : class_list
            },
        });
    }

    return (
        <div className="container">
            <form>
                <h1>{course.name} - Class List</h1>
                <table className="info-table">
                    <tbody>    
                        <tr>
                            <th>Total number of Students:</th>
                            <td>{student_list.length}</td>
                        </tr>
                        <tr>
                            <th>Total number of Teachers:</th>
                            <td>{teacher_list.length}</td>
                        </tr>
                    </tbody>
                </table>

                <input type={"text"} value={search_term} placeholder="Search" onChange={(e)=>setSearchTerm(e.target.value)}></input>
                
                <p style={{textAlign: "center", fontWeight: "bold", fontSize: "18sp"}}>Teacher</p>
                <div className="account-list">
                    <ul>
                        {teacher_filtered_list.map((item) => {
                            return (
                                <li style={{marginBottom:"10px"}} key={item.id}>{item.username + " - " + item.fullname}</li>
                            )
                        })}
                    </ul>
                </div>
                
                <p style={{textAlign: "center", fontWeight: "bold", fontSize: "18sp"}}>Students</p>
                <div className="account-list">
                    <ul>
                        {student_filtered_list.map((item) => {
                            return (
                                <li style={{marginBottom:"10px"}} key={item.id}>{item.username + " - " + item.fullname}</li>
                            )
                        })}
                    </ul>
                </div>
                
                <button type="button" className="big-blue-button" value="EXPORT" onClick={exportList}>
                    EXPORT
                    <CSVLink
                        headers={headers}
                        filename={course.name+"_Class List.csv"}
                        data={class_list}
                        ref={csvLinkEl}></CSVLink>
                </button>
                
                <table className="navigation-table">
                    <tbody>
                        <tr>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="ENROLL" onClick={toEnroll}></input>
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