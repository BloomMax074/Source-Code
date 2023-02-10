import React from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {CSVLink} from "react-csv"

const StudentHistory = () => {
    const location = useLocation();
    let navigate = useNavigate();
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var api_path = location.state.api_path;
    var history_list = location.state.history_list;

    const csvLinkEl = React.createRef();
    const headers=[
        {label:"Course",key:"course_name"},
        {label:"Lecture",key:"lecture_name"},
        {label:"Session",key:"session_name"},
        {label:"Time",key:"created_at"}
    ]
    
    function exportList() {
        csvLinkEl.current.link.click();
    }

    function toHomePage(e) {
        e.preventDefault();
        navigate('/StudentHP', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                api_path : api_path
            },
        });
    }
    
    return (
        <div className="container">
            <form>
                <h1>ATTENDANCE HISTORY</h1>
                <div className="info-dashboard">
                <table>
                    <tbody>    
                            <tr>
                                <th>Full Name</th>
                                <td>{fullname}</td>
                            </tr>
                            <tr>
                                <th>Username</th>
                                <td>{username}</td>
                            </tr>
                            <tr>                       
                                <th>Account Type</th>
                                <td>{account_type}</td>
                            </tr>
                        </tbody>    
                    </table>
                </div>
                <div className="list">
                    <ul>
                    {history_list.map((item) => {
                        return (
                            <li style={{marginBottom:"10px"}} key={item.id}>{item.course_name} / {item.lecture_name} / {item.session_name} / {item.created_at.slice(0, 10)}, {item.created_at.slice(11, 19)} + {item.created_at.slice(27, 32)}</li>  
                        )
                    })}
                    </ul>
                </div>
                
                <button type="button" className="big-blue-button" value="EXPORT" onClick={exportList}>
                    EXPORT
                    <CSVLink
                        headers={headers}
                        filename={username + "_" + fullname + "_History.csv"}
                        data={history_list}
                        ref={csvLinkEl}></CSVLink>
                </button>

                <table className="navigation-table">
                    <tbody>  
                        <tr>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="HOME" onClick={toHomePage}></input>
                            </td>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="BACK" onClick={toHomePage}></input>
                            </td>
                        </tr>
                    </tbody> 
                </table>
            </form>
        </div>
    )
}

export default StudentHistory