import React, { useState } from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Attendee = () => {
    var attendee_list = [
        {
            "id": 2,
            "name": "Cao Hoàng Minh",
            "username": "BI11-168",
            "account_type": 1,
            "checkin_time": "2023-02-06T08:32:11.023195+00:00"
        },
        {
            "id": 3,
            "name": "Nguyễn Hoàng Minh",
            "username": "BI11-182",
            "account_type": 1,
            "checkin_time": "2023-02-06T08:31:55.023195+00:00"
        },
        {
            "id": 4,
            "name": "Tạ Đình Thái Nhân",
            "username": "BI11-204",
            "account_type": 1,
            "checkin_time": "2023-02-06T08:33:26.023195+00:00"
        },
        {
            "id": 5,
            "name": "Bùi Tuấn Minh",
            "username": "BI11-173",
            "account_type": 1,
            "checkin_time": "2023-02-06T08:40:38.023195+00:00"
        }
    ]
    
    

    return (
        <div className="container">
            <form>
                <h1>Session 1 - Attendees</h1>
                <input type="text" placeholder="Search for students"></input>
                <div className="list">
                    <ul>
                    {attendee_list.map((item) => {
                        return (
                            <li style={{marginBottom:"10px"}}>{item.username} - {item.name} - {item.checkin_time.slice(0,10) + ", " + item.checkin_time.slice(11,19)}</li>  
                        )
                    })}
                    </ul>
                </div>
                
                <input type={"button"} className="big-blue-button" value={"EXPORT"}></input>
                
                <table className="navigation-table">
                    <tbody>  
                        <tr>
                            <td>
                                <input className="navigation-blue-button" type={"button"} value="ADD" ></input>
                            </td>
                            <td>
                                <input className="navigation-red-button" type={"button"} value="DELETE" ></input>
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

export default Attendee