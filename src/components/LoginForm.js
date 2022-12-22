import React from "react";
import { useNavigate } from "react-router-dom";

function LoginForm () {
    let navigate = useNavigate();
    return (
        <loginform>
            <div className="login-form">
                <form>
                    <h1>WACS</h1>
                    <div className="login-form-input">
                        <input type="text" placeholder="Username" name="username" id="username" required/>
                    </div>
                    <div className="login-form-input">
                        <input type="password" placeholder="Password" name="password" id="password" required/>
                    </div>
                    <table className="navigation-table">
                    <button className="login-button" onClick={() => {navigate('/TeacherHP') }}>
                        Login
                    </button>
                    <input type="button" value="Forgot Pasword?"></input>
                    </table>
                </form>
            </div>
        </loginform>
    );
}

export default LoginForm
