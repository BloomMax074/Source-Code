import React from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherSessionDetail = () => {
    let navigate = useNavigate();
    return (       
            <div className="container">
                <form>
                    <h1>Python</h1>
                    <h1>Lecture 2</h1>
                    <h1>Session 1</h1>
                    <table className="info-table">
                        <tbody>
                            <tr>
                                <th>SESSION NAME</th>
                                <td>SESSION 1</td>
                            </tr>
                            <tr>
                                <th>SESSION DESCRIPTION</th>
                                <td>Begin of class attendance check.</td>
                            </tr>
                            <tr>
                                <th>START</th>
                                <td>08:30:00+00:00</td>
                            </tr>
                            <tr>
                                <th>END</th>
                                <td>08:40:00+00:00</td>
                            </tr>
                            <tr>
                                <th>CREATED</th>
                                <td>2023-01-19</td>
                            </tr>
                            <tr>
                                <th>UPDATED</th>
                                <td></td>
                            </tr>
                            <tr>
                            <td colSpan={2}>
                                <input type={"button"} className="edit-button" value="Edit" ></input>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table className="navigation-table">
                        <tbody>
                            <tr>
                                <td>
                                    <input className="navigation-blue-button" type={"button"} value="ATTENDEE" ></input>
                                </td>
                                <td>
                                    <input className="navigation-red-button" type={"button"} value="END SESSION" ></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input className="navigation-blue-button" type={"button"} value="HOME" ></input>
                                </td>
                                <td>
                                    <input className="navigation-blue-button" type={"button"} value="BACK" ></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
    )
}
export default TeacherSessionDetail