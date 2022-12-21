import React from "react"

const TeacherSessionMenu = () => {
    return (
        <teachersessionmenu>
            <div className="teacher-session-menu">
                <form>
                    <h1>PYTHON</h1>
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
                            <td>A course in python programming language.</td>
                        </tr>
                        <tr>
                            <th>LECTURE 1</th>
                            <td>12/10/2022</td>
                        </tr>
                        <tr>
                            <th>LECTURE DESCRIPTION</th>
                            <td>Python data types & fundamentals.</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input type={"button"} className="edit-button" value="Edit"></input>
                            </td>
                        </tr>
                    </table>
                    <form>
                        <div className="session-list">
                            <input type="button" value="Session 1"></input>
                            <input type="button" value="Session 2"></input>
                            <input type="button" value="Session 3"></input>
                            <input type="button" value="Session 4"></input>
                            <input type="button" value="Session 5"></input>
                            <input type="button" value="Session 6"></input>
                            <input type="button" value="Session 7"></input>
                            <input type="button" value="Session 8"></input>
                            <input type="button" value="Session 9"></input>
                            <input type="button" value="Session 10"></input>
                        </div>
                        <table className="navigation-table">
                            <tr>
                                <td>
                                    <input className="add-session-button" type={"button"} value="ADD NEW SESSION"></input>
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
        </teachersessionmenu>
    )
}

export default  TeacherSessionMenu