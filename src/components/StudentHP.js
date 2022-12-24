import React from "react"
import { useNavigate } from "react-router-dom";

const StudentHP = () => {
    let navigate = useNavigate();
    return (
        <studenthp>
            <div className="student-home-page">
                <form>
                    <h1>Welcome, Cao Hoàng Minh</h1>
                    <div className="info-dashboard">
                        <table>
                            <tr>
                                <th>Full Name</th>
                                <td>Cao Hoàng Minh</td>
                            </tr>
                            <tr>
                                <th>IP Address</th>
                                <td>bruhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</td>
                            </tr>
                            <tr>
                                <th>MAC Address</th>
                                <td>bruhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</td>
                            </tr>
                        </table>
                        <input className="edit-button" type="button" value="EDIT"/>
                    </div>
                    <input className="auto-check-in-button" type="button" value="CHECK IN"/>
                    <input className="view-course-button" type="button" onClick={() => {navigate('/StudentCourseMenu')}} value="VIEW COURSES"/>
                    <input className="logout-button" type="button" onClick={() => {navigate('/LoginForm')}} value="LOGOUT"/>
                </form>
            </div>
        </studenthp>
    )
}

export default StudentHP