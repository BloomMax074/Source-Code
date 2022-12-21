import React from "react"

const StudentSessionMenu = () => {
    return (
        <studentsessionmenu>
            <div className="student-session-menu">
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
                            <th>LECTURE 1</th>
                            <td>12/10/2022</td>
                        </tr>
                        <tr>
                            <th>LECTURE DESCRIPTION</th>
                            <td>Python data types & fundamentals.</td>
                        </tr>
                    </table>
                    <div className="session-list">
                        <input type="button" value="SESSION 1"></input>
                        <input type="button" value="SESSION 1"></input>
                        <input type="button" value="SESSION 1"></input>
                        <input type="button" value="SESSION 1"></input>
                        <input type="button" value="SESSION 1"></input>
                        <input type="button" value="SESSION 1"></input>
                        <input type="button" value="SESSION 1"></input>
                        <input type="button" value="SESSION 1"></input>
                        <input type="button" value="SESSION 1"></input>
                        <input type="button" value="SESSION 1"></input>
                        <input type="button" value="SESSION 1"></input>
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
        </studentsessionmenu>
    )
}

export default StudentSessionMenu