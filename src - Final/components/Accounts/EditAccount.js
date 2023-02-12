import React, { useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditAccount = () => {
    let navigate = useNavigate();
    const location = useLocation();
    var my_id = location.state.id;
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var api_path = location.state.api_path;
    var account = location.state.account;

    var isMyAccount = false
    if (my_id === account.id) {
        isMyAccount = true;
    }
    
    const [fullname_edited, setFullnameEdited] = useState("")
    const [username_edited, setUsernameEdited] = useState("")

    const [fullname_placeholder, setFullnamePlaceholder] = useState(account.fullname)
    const [username_placeholder, setUsernamePlaceholder] = useState(account.username)
    const [account_type_placeholder, setAccountTypePlaceholder] = useState(account.account_type)

    function toHomePage() {
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
    
    function onSubmit() {
        if (isMyAccount && document.getElementById("edit-account-type").value !== account_type) {
            alert("You cannot change your own account type");
        }
        else {
            var accountUpdated = {};
            if (fullname_edited !== "") {
                accountUpdated.fullname = fullname_edited
                setFullnamePlaceholder(fullname_edited)
            }
            if (username_edited !== "") {
                accountUpdated.username = username_edited
                setUsernamePlaceholder(username_edited)
            }
            if (document.getElementById("edit-account-type").value !== account.account_type) {
                accountUpdated.account_type = document.getElementById("edit-account-type").value
                setAccountTypePlaceholder(document.getElementById("edit-account-type").value)
            }
            var accountUpdateAPI = api_path + "/api/users/" + String(account.id)
            axios.patch(accountUpdateAPI, accountUpdated, { headers: {"Authorization" : `Bearer ${access_token}`} })
            alert("Account Updated")
            document.getElementById("edit-fullname").value="";
            document.getElementById("edit-username").value="";
            document.getElementById("edit-account-type").value=account_type_placeholder;
        }
    }

    async function deleteAccount() {
        if (isMyAccount) {
            alert("You cannot delete your own account.");
        }
        else {
            var delAPI = api_path + "/api/users/" + account.id;
            if (window.confirm('Are you sure you wish to delete this account?')) {
                try {
                    axios.delete(delAPI, { headers: {"Authorization" : `Bearer ${access_token}`} })
                    alert("Account Deleted")
                } catch(err) {
                    alert(err.data.data)
                }
            }
            
            var accountAPI = api_path + "/api/users";
            var response = await axios.get(accountAPI, { headers: { "Authorization" : `Bearer ${access_token}`} })
            navigate('/AccountList', { 
                state : {
                    access_token : access_token,
                    username : username,
                    fullname : fullname,
                    account_type : account_type,
                    api_path : api_path,
                    account_list : response.data
                },
            });
        }
    }

    async function goBack() {
        var accountAPI = api_path + "/api/users";
            var response = await axios.get(accountAPI, { headers: { "Authorization" : `Bearer ${access_token}`} })
            navigate('/AccountList', { 
                state : {
                    access_token : access_token,
                    username : username,
                    fullname : fullname,
                    account_type : account_type,
                    api_path : api_path,
                    account_list : response.data
                },
            });
    }

    return (
        <div className="container">
            <form>
                <h1>MANAGE ACCOUNT</h1>
                <table className="info-dashboard">
                    <tbody>
                        <tr>
                            <th>Fullname</th>
                            <td>{fullname_placeholder}</td>
                        </tr>
                        <tr>
                            <th>Username</th>
                            <td>{username_placeholder}</td>
                        </tr>
                        <tr>
                            <th>Account Type</th>
                            <td>{account_type_placeholder}</td>
                        </tr>
                    </tbody>
                </table>

                <label htmlFor="edit-fullname">Fullname:</label>
			    <input type="text" placeholder={fullname_placeholder} id="edit-fullname" onChange={(e)=>{setFullnameEdited(e.target.value)}}/>
                
                <label htmlFor="edit-username">Username:</label>
			    <input type="text" placeholder={username_placeholder} id="edit-username" onChange={(e)=>{setUsernameEdited(e.target.value)}}/>
                
                <label htmlFor="edit-account-type">Account Type:</label>
                <select id="edit-account-type" defaultValue={account_type_placeholder}>
                    <option value={1}>1. Student Account</option>
                    <option value={2}>2. Teacher Account</option>
                </select>

                <input type={"button"} className="big-blue-button" value={"UPDATE"} onClick={onSubmit}></input>

                <input type={"button"} className="big-red-button" value={"DELETE"} onClick={deleteAccount}></input>

                <table className="navigation-table">
                    <tbody>
                        <tr>
                            <td>
                                <input className="navigation-blue-button" type={"button"} onClick={toHomePage} value="HOME"></input>
                            </td>
                            <td>
                                <input className="navigation-blue-button" type={"button"} onClick={goBack} value="BACK"></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default EditAccount