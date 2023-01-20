import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AddStudent = () => {
    let navigate=useNavigate();
    const location=useLocation();
    const access_token=location.state.access_token;
    const username = location.state.username;
    const fullname = location.state.fullname;
    const account_type = location.state.account_type;
    const student_list = location.state.student_list;
    const [sname,setSname]=useState('');
    const [sfullname,setfullSname]=useState('');
    const [spass,setSpass]=useState('');
    const [sacctype,setSacctype]=useState('');

    async function HandleSumition(e){
        e.preventDefault();
        const post={
            username:sname,
            fullname:sfullname,
            password:spass,
            account_type:sacctype

        }
        var response=await axios.post('http://35.240.197.121:80/api/users/',post,{ headers: {"Authorization" : `Bearer ${access_token}`} })
        console.log(response);
    }

    async function onBack(e){
        e.preventDefault();
        var response=await axios.get("http://35.240.197.121:80/api/users/",{ headers: { "Authorization" : `Bearer ${access_token}`} })
        console.log(response);
       
        navigate('/TeacherStudentMenu',{
            state:{
                access_token:access_token,
    
            username:username,
            fullname:fullname,
            account_type:account_type,
            student_list:response.data
                
            }
        })
    }

    return (
            <div className="add-student">
                    <h1>Student Details</h1>
                    <form onSubmit={HandleSumition}>
                    <div className="form-control">
			                <label htmlFor="name" id="label-name">
				                Username
			                </label>
			                <input type="text"
				                id="name"
				                placeholder="Maybe student ID" onChange={(e)=>setSname(e.target.value)} />
		                </div>
                        <div className="form-control">
			                <label htmlFor="description" id="label-description">
				                Fullname
			                </label>
			                <input type="text"
				                id="fullname"
				                placeholder="Enter Student Fullname" onChange={(e)=>setfullSname(e.target.value)} />
		                </div>
                        <div className="form-control">
                            <label htmlFor="lecture-id" id="lecture-id">
                                Password
                            </label>
                            <input type="int"
                                id="lecture-id" 
                                placeholder="Enter at least 6 character" onChange={(e)=>setSpass(e.target.value)}/>
                        </div>
                        
                        <div className="form-control">
                            <label htmlFor="lecture-id" id="lecture-id">
                                Account-type
                            </label>
                            <input type="int"
                                id="lecture-id" 
                                placeholder="Enter Account type 1" onChange={(e)=>setSacctype(e.target.value)}/>
                        </div>
                    
                        <input className="add-session-button" type={"submit"} value="ADD STUDENT" ></input>
                        <input className="back-button" type={"button"} value="BACK" onClick={onBack}></input>
                    </form>
            </div>
    )
}

export default AddStudent
