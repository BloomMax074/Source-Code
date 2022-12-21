import React from "react"

const TeacherLectureMenu = () => {
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
                            <input type="button" value="Lecture 1"></input>
                            <input type="button" value="Lecture 2"></input>
                            <input type="button" value="Lecture 3"></input>
                            <input type="button" value="Lecture 4"></input>
                            <input type="button" value="Lecture 5"></input>
                            <input type="button" value="Lecture 6"></input>
                            <input type="button" value="Lecture 7"></input>
                            <input type="button" value="Lecture 8"></input>
                            <input type="button" value="Lecture 9"></input>
                            <input type="button" value="Lecture 10"></input>
                        </div>
                        <table className="navigation-table">
                            <tr>
                                <td>
                                    <input className="add-lecture-button" type={"button"} value="ADD LECTURE"></input>
                                </td>
                                <td>
                                    <input className="delete-lecture-button" type={"button"} value="DELETE LECTURE"></input>
                                </td>
                            </tr>
                        </table>
                        <table className="navigation-table">
                        <tr>
                            <td>
                                <input className="home-button" type={"button"} value="HOME"></input>
                            </td>
                            <td>
                                <input className="back-button" type={"button"} value="BACK"></input>
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