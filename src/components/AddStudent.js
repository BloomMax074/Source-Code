import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AddStudent = () => {
    let navigate=useNavigate();
    const location=useLocation();
    const [sname,setSname]=useState('');
    const [sfullname,setfullSname]=useState('');
    const [spass,setSpass]=useState('');
    const [scpass,setScpass]=useState('');
    const [sacctype,setSacctype]=useState('');

    async function HandleSumition(e){
        e.preventDefault();
        var response=await axios.post('http://35.247.128.143:8000/api/users/',)
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
				                placeholder="Enter Student Name" onChange={(e)=>setSname(e.target.value)} />
		                </div>
                        <div className="form-control">
			                <label htmlFor="fullname" id="label-fullname">
				                Fullname
			                </label>
			                <input type="text"
				                id="fullname"
				                placeholder="Enter Student Fullname" onChange={(e)=>setfullSname(e.target.value)} />
		                </div>
                        <div className="form-control">
                            <label htmlFor="password" id="password">
                                Password
                            </label>
                            <input type="int"
                                id="password" 
                                placeholder="Enter Password" onChange={(e)=>setSpass(e.target.value)}/>
                        </div>
                        <div className="form-control">
                            <label htmlFor="confirm-password" id="confirm-password">
                                Confirm Password
                            </label>
                            <input type="int"
                                id="confirm-password" 
                                placeholder="Re-Type Password"/>
                        </div>
                        <div className="form-control">
                            <label htmlFor="account-type" id="account-type">
                                Account-type
                            </label>
                            <input type="int"
                                id="account-type" 
                                placeholder="Enter Account type"/>
                        </div>
                    
                        <input className="add-student-button" type={"submit"} value="ADD STUDENT" ></input>
                        <input className="back-button" type={"button"} value="BACK" onClick={() => {navigate('/TeacherStudentMenu')}}></input>
                    </form>
            </div>
    )
}

export default AddStudent
