import React from "react"

const StudentSessionDetail = () => {
    return (
        <studentsessiondetail>
            <div className="student-session-detail">
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
                            <th>SESSION 1</th>
                            <td>10h00 - 10h10</td>
                        </tr>
                        <tr>
                            <th>CHECKED IN</th>
                            <td>10h05</td>
                        </tr>
                    </table>
                    <input className="check-in-button" type={"button"} value="CHECK IN"></input>
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
        </studentsessiondetail>
    )
}

export default StudentSessionDetail