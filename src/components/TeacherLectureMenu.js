import React from "react"
import { useNavigate } from "react-router-dom";

const TeacherLectureMenu = () => {
    let navigate = useNavigate();
    return (
        <teacherlecturemenu>
            <div className="teacher-lecture-menu">
                <form>
                    <h1>Python</h1>
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
                            <th>COURSE DESCRIPTION</th>
                            <td>A course in Python programing Language.</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input type={"button"} className="edit-button" value="Edit"></input>
                            </td>
                        </tr>
                    </table>
                    <form>
                        <div className="lecture-list">
                        <input type="button" value="Lecture 1" onClick={() => {navigate('/TeacherSessionMenu')}}></input>
                        <input type="button" value="Lecture 1" onClick={() => {navigate('/TeacherSessionMenu')}}></input>
                        <input type="button" value="Lecture 1" onClick={() => {navigate('/TeacherSessionMenu')}}></input>
                        <input type="button" value="Lecture 1" onClick={() => {navigate('/TeacherSessionMenu')}}></input>
                        <input type="button" value="Lecture 1" onClick={() => {navigate('/TeacherSessionMenu')}}></input>
                        <input type="button" value="Lecture 1" onClick={() => {navigate('/TeacherSessionMenu')}}></input>
                        <input type="button" value="Lecture 1" onClick={() => {navigate('/TeacherSessionMenu')}}></input>
                        <input type="button" value="Lecture 1" onClick={() => {navigate('/TeacherSessionMenu')}}></input>
                        <input type="button" value="Lecture 1" onClick={() => {navigate('/TeacherSessionMenu')}}></input>
                        <input type="button" value="Lecture 1" onClick={() => {navigate('/TeacherSessionMenu')}}></input>
                        </div>

                        <table className="navigation-table">
                            <tr>
                                <td>
                                    <button className="add-lecture-button" onClick={() => {navigate('/AddLecture') }}>
                                        ADD LECTURE
                                    </button>
                                </td>
                                <td>
                                    <input className="delete-lecture-button" type={"button"} value="DELETE LECTURE"></input>
                                </td>
                            </tr>
                        </table>
                        <table className="navigation-table">
                            <tr>
                                <td>
                                    <button className="home-button" onClick={() => {navigate('/TeacherHP') }}>
                                        HOME
                                    </button>
                                </td>
                                <td>
                                    <button className="back-button" onClick={() => {navigate('/TeacherCourseMenu')}}>
                                        BACK
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </form>
                </form>
            </div>
        </teacherlecturemenu>
    )
}

export default  TeacherLectureMenu