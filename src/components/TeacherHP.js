import React from "react";
import { useNavigate } from "react-router-dom";

function TeacherHP () {
    let navigate = useNavigate();
    return (
        <teacherhp>
            <div className="teacher-home-page">
                <form>
                    <h1>Welcome, Phạm Vũ Hải </h1>
                    <div className="info-dashboard">
                        <table>
                            <tr>
                                <th>Full Name</th>
                                <td>Phạm Vũ Hải</td>
                            </tr>
                            <tr>
                                <th>Lecturer ID</th>
                                <td>PRO-001</td>
                            </tr>
                            <tr>                       
                                <th>Course In Charge</th>
                                <td>HTML</td> <td>Java Script</td>
                            </tr>
                        </table>
                        <input className="edit-button" type="button" value="EDIT"/>
                    </div>
                    <table className="navigation-table">
                        <tr>
                            <td>
                                <input className="student-list-button" type="button" value="STUDENT LIST"/>
                                <button className="view-course-button" onClick={() => {navigate('/TeacherCourseMenu') }}>
                                    COURSE LIST 
                                </button>
                                <button className="logout-button" onClick={() => {navigate('/LoginForm')}}>
                                    LOGOUT
                                </button>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </teacherhp>
    );
}

export default TeacherHP