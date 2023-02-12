import React from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ActiveSession = () => {
    let navigate=useNavigate();
    const location=useLocation();
    var access_token = location.state.access_token
    var username = location.state.username
    var fullname = location.state.fullname
    var account_type = location.state.account_type
    var api_path = location.state.api_path
    var active_session_list = location.state.active_session_list

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

    async function toActiveSessionDetail(cid, sid) {
        var sessionAPI = api_path + "/api/courses/"+String(cid)+"/sessions"
        var response = await axios.get(sessionAPI, { headers: {"Authorization" : `Bearer ${access_token}`} });
        for (let x in response.data) {
            if (response.data[x].id === sid) {
                for (let y in active_session_list) {
                    if (active_session_list[y].id === sid) {
                        navigate('/ActiveSessionDetail', {
                            state : {
                                access_token : access_token,
                                username : username,
                                fullname : fullname,
                                account_type : account_type,
                                api_path : api_path ,
                                session : response.data[x],
                                active_session : active_session_list[y]
                            },
                        });
                    }
                }
            }
        }
    }
    
    return(
        <div className="container">
            <form>
                <h1>ACTIVE SESSIONS</h1>
                <div className="active-session-list">
                    {active_session_list.map((item) => {
                        return (
                            <input type="button" key={item.id} value={item.course_name+" / "+item.lecture_name+" / "+item.session_name} 
                            onClick={()=>{toActiveSessionDetail(item.course_id, item.id)}}></input>
                        )
                    })}
                </div>
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

export default ActiveSession