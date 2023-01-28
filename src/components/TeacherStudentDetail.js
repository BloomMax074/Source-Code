import React  from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherStudentDetail = () => {
        let navigate = useNavigate();
        const location = useLocation();
        const access_token=location.state.access_token;
        const username = location.state.username;
        const fullname = location.state.fullname;
        const account_type = location.state.account_type;
        const student=location.state.student;

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

        async function toStudentList(e) {
            e.preventDefault();
            var response=await axios.get("http://35.240.197.121:80/api/users/",{ headers: { "Authorization" : `Bearer ${access_token}`} })
            console.log(response);
            navigate('/TeacherStudentMenu', {
                state : {
                    access_token : access_token,
                    username : username,
                    fullname : fullname,
                    account_type : account_type,
                    student_list : response.data
                },
            });
        }

        async function toDeleteStudent(e){
            e.preventDefault();
            const api1='http://35.240.197.121:80/api/users/'+String(student.id);
            console.log(api1);
            const response=await axios.delete(api1,{ headers: {"Authorization" : `Bearer ${access_token}`} });
            console.log(response);
            alert(response.data.data+' Successfully, you can push the BACK button to go back');
        }
    
        return (
                <div className="teacher-student-detail">
                    <form>       
                        <table className="info-table">
                            <tbody>   
                                <tr>
                                    <th>STUDENT USERNAME</th>
                                    <td>{student.username}</td>
                                </tr>
                                <tr>
                                    <th>STUDENT FULLNAME </th>
                                    <td>{student.fullname}</td>
                                </tr>
                                <tr>
                                    <th>STUDENT PASSWORD</th>
                                    <td>{student.password}</td>
                                </tr>
                                <tr>
                                    <th>STUDENT ACCOUNT-TYPE</th>
                                    <td>{student.account_type}</td>
                                </tr>
                                <tr>
                                    <th>DEVICE</th>
                                    <td>NULL</td>
                                </tr>                             
                            </tbody> 
                        </table>
                        <table className="navigation-table">
                            <tbody>
                                <tr>
                                    <td>
                                        <button className="delete-student" onClick={ toDeleteStudent }>
                                            DELETE STUDENT
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="navigation-table">
                            <tbody>
                                <tr>
                                    <td>
                                        <button className="home-button" onClick={ toHomePage }>
                                            HOME
                                        </button>
                                    </td>
                                    <td>
                                        <button className="back-button" onClick={ toStudentList }>
                                            BACK
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
        )
}

export default  TeacherStudentDetail