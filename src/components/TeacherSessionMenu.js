import React from "react"
import { useNavigate } from "react-router-dom";

const TeacherSessionMenu = () => {
    let navigate = useNavigate();
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
                            <input type="button" value="Session 1" onClick={() => {navigate('/')}}></input>
                            <input type="button" value="Session 1" onClick={() => {navigate('/')}}></input>
                            <input type="button" value="Session 1" onClick={() => {navigate('/')}}></input>
                            <input type="button" value="Session 1" onClick={() => {navigate('/')}}></input>
                            <input type="button" value="Session 1" onClick={() => {navigate('/')}}></input>
                            <input type="button" value="Session 1" onClick={() => {navigate('/')}}></input>
                            <input type="button" value="Session 1" onClick={() => {navigate('/')}}></input>
                            <input type="button" value="Session 1" onClick={() => {navigate('/')}}></input>
                            <input type="button" value="Session 1" onClick={() => {navigate('/')}}></input>
                            <input type="button" value="Session 1" onClick={() => {navigate('/')}}></input>
                            
                        </div>
                        <table className="navigation-table">
                            <tr>
                                <td>
                                    <button className="add-session-button" onClick={() => {navigate('/AddSession') }}>
                                        ADD SESSION
                                    </button>
                                </td>
                                <td>
                                    <button className="delete-session-button" onClick={() => {navigate('/') }}>
                                        DELETE SESSION
                                    </button>
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
                                    <button className="back-button" onClick={() => {navigate('/TeacherLectureMenu')}}>
                                        BACK
                                    </button>
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