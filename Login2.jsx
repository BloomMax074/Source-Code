 
/*import "./login.css";*/
/*import { Link } from "react-router-dom";*/
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [name,setCourseName]=useState("");
    const [description,setCourseDescription]=useState("");
    let navigate = useNavigate();
    function toHomePage(account_type) {
        if (account_type == 1) {
            navigate('/StudentHP');
        }
        else if (account_type == 2) {
            navigate('/TeacherHP');
        }
    }
    /*const navigate=useNavigate();*/
    const handleRegister=(e)=>{
        e.preventDefault();
        const newCourse={
            username:name,
            password:description
        };
        try{
         axios.post("http://35.247.128.143:8000/api/auth/login",newCourse)
         .then(function (response) {
            console.log(response);
         })
          .catch(function (error) {
            console.log(error);
         });
        }catch{
         console.log("Fail");
        }  
    
        
    }
    return ( 
        /*<section className="login-container">*/
            <div className="login-form">
                <form onSubmit={handleRegister}>
                    <h1>WACS</h1>
                    <div className="login-form-input">
                        <input type="text" placeholder="Username" name="username" id="username" onChange={(e)=>setCourseName(e.target.value)}/>
                    </div>
                    <div className="login-form-input">
                        <input type="password" placeholder="Password" name="password" id="password" onChange={(e)=>setCourseDescription(e.target.value)}/>
                    </div>
                    <table className="navigation-table">
                    <button className="login-button" type="submit">
                        Login
                    </button>
                    </table>
                </form>
            </div>
     );
}
 
export default Login;