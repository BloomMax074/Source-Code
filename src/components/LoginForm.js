import React from "react"

const LoginForm = () => {
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
                    <input type="submit" value="LOGIN"/>
                </form>
            </div>
        </loginform>
    )
}

export default LoginForm