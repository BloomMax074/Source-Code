import React, { useState } from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AccountList = () => {
    let navigate = useNavigate();
    const location = useLocation();
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var api_path = location.state.api_path;
    var account_list = location.state.account_list;

    
    
    var teacher_account_list = [];
    var student_account_list = [];

    for (let account in account_list) {
        if (account_list[account].account_type == "1") {
            student_account_list.push(account_list[account]);
        }
        else if (account_list[account].account_type == "2") {
            teacher_account_list.push(account_list[account]);
        }
    }

    return (
        <div className="container">
            <form>
                <h1>ACCOUNTS</h1>
                <table className="info-table">
                    <tbody>    
                        <tr>
                            <th>Teacher Accounts: </th>
                            <td>{teacher_account_list.length}</td>
                        </tr>
                        <tr>
                            <th>Student Accounts:</th>
                            <td>{student_account_list.length}</td>
                        </tr>
                        <tr>                       
                            <th>Total: </th>
                            <td>{teacher_account_list.length + student_account_list.length}</td>
                        </tr>
                    </tbody>    
                </table>

                <input type={"text"} placeholder="Search Accounts" ></input>

                <div className="student-list">
                    {student_account_list.map((item) => {
                        return (
                            <input type="button" id={item.id} key={item.id} value={item.username}></input>
                        )})
                    }  
                </div>
            </form>
        </div>
    )
}

export default AccountList