import React from "react"
import { useNavigate } from "react-router-dom";

const TeacherSessionDetail = () => {
    let navigate = useNavigate();
    return (
        <teachersessiondetail>
            <div className="teacher-session-detail">
                <form>
                    <h1>Course Name</h1>
                    <table className="info-table">
                    <tr>
                            <th>COURSE NAME</th>
                            <td>Python</td>
                        </tr>
                        <tr>
                            <th>COURSE ID</th>
                            <td>P01</td>
                        </tr>
                        <tr>
                            <th>LECTURE 1</th>
                            <td>12/10/2022</td>
                        </tr>
                        <tr>
                            <th>SESSION 1</th>
                            <td>10h00 - 10h10</td>
                        </tr>
                    </table>
                    <table className="navigation-table">
                            <tr>
                                <td>
                                    <button className="start-session-button" onClick={() => {navigate('/') }}>
                                        START
                                    </button>
                                </td>
                                <td>
                                    <button className="end-session-button" onClick={() => {navigate('/')}}>
                                        END
                                    </button>
                                </td>
                            </tr>
                        </table>
                    <table className="navigation-table">
                        <tr>
                            <td>
                                <input className="home-button" type={"button"} value="HOME" onClick={() => {navigate('/TeacherHP')}}></input>
                            </td>
                            <td>
                                <input className="back-button" type={"button"} value="BACK" onClick={() => {navigate('/TeacherSessionMenu')}}></input>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </teachersessiondetail>
    )
}
export default TeacherSessionDetail