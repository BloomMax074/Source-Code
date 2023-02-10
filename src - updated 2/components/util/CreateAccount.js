import React, { useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateAccount = () => {
    let navigate = useNavigate();
    const location = useLocation();
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var api_path = location.state.api_path;

    const [fullname_created, setFullnameCreated] = useState("")
    const [username_created, setUsernameCreated] = useState("")
    const [password_created, setPasswordCreated] = useState("")
    
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
                <h1>CREATE ACCOUNT</h1>

                <label htmlFor="create-fullname">Fullname:</label>
			    <input type="text" placeholder={"Fullname"} id="create-fullname" onChange={(e)=>{setFullnameCreated(e.target.value)}}/>

                <label htmlFor="create-username">Username:</label>
			    <input type="text" placeholder={"Username"} id="create-username" onChange={(e)=>{setUsernameCreated(e.target.value)}}/>

                <label htmlFor="create-password">Password:</label>
			    <input type="text" placeholder={"Password"} id="create-password" onChange={(e)=>{setPasswordCreated(e.target.value)}}/>

                <label htmlFor="create-account-type">Account Type:</label>
                <select id="create-account-type" defaultValue={1}>
                    <option value={1}>1. Student Account</option>
                    <option value={2}>2. Teacher Account</option>
                </select>

                <input type={"button"} className="big-blue-button" value={"CREATE ACCOUNT"}></input>

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

export default CreateAccount