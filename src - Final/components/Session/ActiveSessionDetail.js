import React from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ActiveSessionDetail = () => {
    const location = useLocation();
    let navigate = useNavigate();
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var session = location.state.session;
    var active_session = location.state.active_session;
    var api_path = location.state.api_path;

    if (session.updated_at != null) {
        var session_updated_at = String(new Date(session.updated_at));
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

    async function goBack(e) {
        e.preventDefault();
        var activeSessionAPI = api_path + "/api/sessions/active-sessions"
        var response = await axios.get(activeSessionAPI, { headers: {"Authorization" : `Bearer ${access_token}`} })
        navigate('/ActiveSession', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                api_path : api_path,
                active_session_list : response.data.data
            },
        });
    }

    async function checkin(e) {
        e.preventDefault();
        var checkinAPI = api_path + "/api/sessions/" + String(session.id) + "/checkin";
        
        try {
            var response = await axios.post(checkinAPI,{}, { headers: {"Authorization" : `Bearer ${access_token}`} });
            alert(response.data.data)
        } catch (err) {
            alert(err.response.data.detail);
        }
    }
    return(
        <div className="container">
            <form>
                <h1>{active_session.course_name}</h1>
                <h1>{active_session.lecture_name}</h1>
                <h1>{active_session.session_name}</h1>

                <table className="info-table">
                    <tbody>   
                        <tr>
                            <th>SESSION NAME</th>
                            <td>{session.name}</td>
                        </tr>
                        <tr>
                            <th>SESSION DESCRIPTION</th>
                            <td>{session.description}</td>
                        </tr>
                        <tr>
                            <th>CREATED</th>
                            <td>{String(new Date(session.created_at))}</td>
                        </tr>
                        <tr>
                            <th>UPDATED</th>
                            <td>{session_updated_at}</td>
                        </tr>
                        <tr>
                            <th>START</th>
                            <td>{String(new Date(session.start))}</td>
                        </tr>
                        <tr>
                            <th>END</th>
                            <td>{String(new Date(session.end))}</td>
                        </tr>
                    </tbody> 
                </table>
                <input className="big-blue-button" type={"button"} value="CHECK IN" onClick={checkin}></input>
                <table className="navigation-table">
                    <tbody>    
                        <tr>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="HOME" onClick={toHomePage}></input>
                            </td>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="BACK" onClick={goBack}></input>
                            </td>
                        </tr>
                    </tbody> 
                </table>
            </form>
        </div>
    )
}

export default ActiveSessionDetail