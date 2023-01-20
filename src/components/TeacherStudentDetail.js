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
        const student_list = location.state.student_list;
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

        function toStudentList(e) {
            e.preventDefault();
            navigate('/TeacherStudentMenu', {
                state : {
                    access_token : access_token,
                    username : username,
                    fullname : fullname,
                    account_type : account_type,
                    student_list : student_list
                },
            });
        }

        async function toDeleteStudent(id){
            var deleteapi="http://35.240.197.121:80/api/users/";
            var deletestudentapi=deleteapi+{id};
            var response = await axios.delete(deletestudentapi,{ headers: {"Authorization" : `Bearer ${access_token}`} })
            console.log(response);           
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