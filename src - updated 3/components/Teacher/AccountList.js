import React, { useState } from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {CSVLink} from "react-csv"

const AccountList = () => {
    let navigate = useNavigate();
    const location = useLocation();
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var api_path = location.state.api_path;
    const csvLinkEl = React.createRef();
    const headers=[
        {label:"ID",key:"id"},
        {label:"User Name",key:"username"},
        {label:"Full Name",key:"fullname"},
        {label:"Account Type",key:"account_type"}
    ]
    var account_list = location.state.account_list;
    const [search_term, setSearchTerm] = useState("");
    
    
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

    const teacher_filtered_list = teacher_account_list.filter((item) => {
        return (item.username + " - " + item.fullname).toLowerCase().includes(search_term.toLowerCase());
    });

    const student_filtered_list = student_account_list.filter((item) => {
        return (item.username + " - " + item.fullname).toLowerCase().includes(search_term.toLowerCase());
    });

    function toHomePage(e) {
        e.preventDefault();
        navigate('/TeacherHP', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                api_path : api_path
            },
        });
    }

    function exportList() {
        csvLinkEl.current.link.click();
    }

    async function toEditAccount(select_id) {
        var meAPI = api_path + "/api/auth/me"
        var response = await axios.get(meAPI, { headers: {"Authorization" : `Bearer ${access_token}`} });
        var id = response.data.id
        for (let account in account_list) {
            if (account_list[account].id === select_id) {
                navigate('/EditAccount', {
                    state : {
                        id : id,
                        access_token : access_token,
                        username : username,
                        fullname : fullname,
                        account_type : account_type,
                        api_path : api_path,
                        account : account_list[account]
                    },
                });
            }
        }
    }

    function toCreateAccount() {
        navigate('/CreateAccount', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type,
                api_path : api_path,
            },
        });
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

                <input type={"text"} placeholder="Search Accounts" value={search_term} onChange={(e)=>{setSearchTerm(e.target.value)}}></input>

                <p style={{textAlign: "center", fontWeight: "bold", fontSize: "18sp"}}>Teacher Accounts</p>

                <div className="account-list">
                    {teacher_filtered_list.map((item) => {
                        return (
                            <input type="button" 
                            id={item.id} 
                            key={item.id} 
                            value={item.username + " - " + item.fullname}
                            onClick={()=>{toEditAccount(item.id)}}></input>
                        )})
                    }  
                </div>
                
                <p style={{textAlign: "center", fontWeight: "bold", fontSize: "18sp"}}>Student Accounts</p>

                <div className="account-list">
                    {student_filtered_list.map((item) => {
                        return (
                            <input type="button" 
                            id={item.id} 
                            key={item.id} 
                            value={item.username + " - " + item.fullname}
                            onClick={()=>{toEditAccount(item.id)}}></input>
                        )})
                    }  
                </div>

                <table className="navigation-table">
                    <tbody>                        
                        <tr>
                            <td>
                                <input type="button" className="navigation-blue-button" value="CREATE ACCOUNT" onClick={toCreateAccount}></input>
                            </td>
                            <td>
                                <button type="button" className="navigation-blue-button" value="EXPORT" onClick={exportList}>
                                EXPORT
                                <CSVLink
                                    headers={headers}
                                    filename="Account_List.csv"
                                    data={account_list}
                                    ref={csvLinkEl}></CSVLink>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="button" className="navigation-blue-button" value="HOME" onClick={toHomePage}></input>
                            </td>
                            <td>
                                <input type="button" className="navigation-blue-button" value="BACK" onClick={toHomePage}></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default AccountList