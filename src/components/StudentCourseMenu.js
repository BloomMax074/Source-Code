import React from "react"
import { useNavigate } from "react-router-dom";

const StudentCourseMenu = () => {
    let navigate = useNavigate();
    return (
        <studentcoursemenu>
            <div className="student-course-menu">
                <form>
                    <h1>ENROLLED COURSES</h1>
                    <form>
                        <div className="course-list">
                            <input type="button" value="COURSE 1" onClick={() => {navigate('/StudentLectureMenu')}}></input>
                            <input type="button" value="COURSE 1" onClick={() => {navigate('/StudentLectureMenu')}}></input>
                            <input type="button" value="COURSE 1" onClick={() => {navigate('/StudentLectureMenu')}}></input>
                            <input type="button" value="COURSE 1" onClick={() => {navigate('/StudentLectureMenu')}}></input>
                            <input type="button" value="COURSE 1" onClick={() => {navigate('/StudentLectureMenu')}}></input>
                            <input type="button" value="COURSE 1" onClick={() => {navigate('/StudentLectureMenu')}}></input>
                            <input type="button" value="COURSE 1" onClick={() => {navigate('/StudentLectureMenu')}}></input>
                            <input type="button" value="COURSE 1" onClick={() => {navigate('/StudentLectureMenu')}}></input>
                            <input type="button" value="COURSE 1" onClick={() => {navigate('/StudentLectureMenu')}}></input>
                            <input type="button" value="COURSE 1" onClick={() => {navigate('/StudentLectureMenu')}}></input>
                            <input type="button" value="COURSE 1" onClick={() => {navigate('/StudentLectureMenu')}}></input>
                        </div>
                        <table className="navigation-table">
                            <tr>
                                <td>
                                    <input className="home-button" type={"button"} onClick={() => {navigate('/StudentHP')}} value="HOME"></input>
                                </td>
                                <td>
                                    <input className="back-button" type={"button"} onClick={() => {navigate('/StudentHP')}} value="BACK"></input>
                                </td>
                            </tr>
                        </table>
                    </form>
                </form>
            </div>
        </studentcoursemenu>
    )
}

export default StudentCourseMenu