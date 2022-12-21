import React from "react"

const StudentLectureMenu = () => {
    return (
        <studentlecturemenu>
            <div className="student-lecture-menu">
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
                    </table>
                    <div className="lecture-list">
                        <input type="button" value="LECTURE 1"></input>
                        <input type="button" value="LECTURE 1"></input>
                        <input type="button" value="LECTURE 1"></input>
                        <input type="button" value="LECTURE 1"></input>
                        <input type="button" value="LECTURE 1"></input>
                        <input type="button" value="LECTURE 1"></input>
                        <input type="button" value="LECTURE 1"></input>
                        <input type="button" value="LECTURE 1"></input>
                        <input type="button" value="LECTURE 1"></input>
                    </div>
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
            </div>
        </studentlecturemenu>
    )
}

export default StudentLectureMenu