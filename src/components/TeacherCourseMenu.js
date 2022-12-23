import React from "react"
import { useNavigate } from "react-router-dom";

const TeacherCourseMenu = () => {
    let navigate = useNavigate();
    return (
        <teachercoursemenu>
            <div className="teacher-course-menu">
                <form>
                    <h1>Course MENU</h1>
                    <form>
                        <div className="course-list">
                            <input type="button" value="COURSE 1" onClick={() => {navigate('/TeacherLectureMenu')}}></input>
                            <input type="button" value="COURSE 1" onClick={() => {navigate('/TeacherLectureMenu')}}></input>
                            <input type="button" value="COURSE 1" onClick={() => {navigate('/TeacherLectureMenu')}}></input>
                            <input type="button" value="COURSE 1" onClick={() => {navigate('/TeacherLectureMenu')}}></input>
                            <input type="button" value="COURSE 1" onClick={() => {navigate('/TeacherLectureMenu')}}></input>
                            <input type="button" value="COURSE 1" onClick={() => {navigate('/TeacherLectureMenu')}}></input>
                            <input type="button" value="COURSE 1" onClick={() => {navigate('/TeacherLectureMenu')}}></input>
                            <input type="button" value="COURSE 1" onClick={() => {navigate('/TeacherLectureMenu')}}></input>
                            <input type="button" value="COURSE 1" onClick={() => {navigate('/TeacherLectureMenu')}}></input>
                            <input type="button" value="COURSE 1" onClick={() => {navigate('/TeacherLectureMenu')}}></input>
                        </div>
                        <table className="navigation-table">
                            <button className="add-course-button" onClick={() => {navigate('/AddCourse') }}>
                                ADD NEW COURSE
                            </button>
                        </table>
                        <table className="navigation-table">
                            <tr>
                                <td>
                                    <button className="home-button" onClick={() => {navigate('/TeacherHP') }}>
                                        HOME
                                    </button>
                                </td>
                                <td>
                                    <button className="back-button" onClick={() => {navigate('/TeacherHP')}}>
                                        BACK
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </form>
                </form>
            </div>
        </teachercoursemenu>
    )
}

export default TeacherCourseMenu