import axios from "axios";
import React from "react"
import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import moment, * as moments from 'moment';
import moment2 from 'moment-timezone';

const AddSession = () => {
    let navigate=useNavigate();
    const location=useLocation();
    var access_token=location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var course = location.state.course;
    var course_list = location.state.course_list;
    var lecture = location.state.lecture;
    var lecture_list = location.state.lecture_list;
    var session_list=location.state.session_list;
    var newssend='';
    const thedate=moment().format().split('T')[0];
    const [ssname,setSSname]=useState('');
    const [ssdes,setSSdes]=useState('');
    const [sslecID,setSSlecID]=useState('');
    const [ssstart,setSSstart]=useState('');
    const [ssend,setSSend]=useState('');

    async function handleCreateSession(e){
        e.preventDefault();
        console.log(lecture.id);
        console.log(thedate);
        const ss={
            lecture_id:lecture.id,
            name:ssname,
            description:ssdes,
            start:ssstart,
            end:ssend,
        }
        const response= await axios.post("http://35.240.197.121:80/api/sessions/",ss,{ headers: {"Authorization" : `Bearer ${access_token}`} });
        console.log(response);  
    }

    async function goBack(){
        const api='http://35.240.197.121:80/api/lectures/';
        const api2=api+String(lecture.id)+'/sessions'      
        const response=await axios.get(api2,{ headers: {"Authorization" : `Bearer ${access_token}`} })
        console.log(response.data);
        navigate('/TeacherSessionMenu',{
            state:{
                access_token:access_token,
                username:username,
                fullname:fullname,
                account_type:account_type,
                course:course,
                course_list:course_list,
                lecture:lecture,
                lecture_list:lecture_list,
                session_list:response.data,
            },
        });
    }
    
    return (
            <div className="add-session">
                    <h1>Session Details</h1>
                    <form onSubmit={handleCreateSession}>
                        <div className="form-control">
			                <label htmlFor="name" id="label-name">
				                Name
			                </label>
			                <input type="text"
				                id="name"
				                placeholder="Enter Session Name" onChange={(e)=>setSSname(e.target.value)} />
		                </div>
                        <div className="form-control">
			                <label htmlFor="description" id="label-description">
				                Description
			                </label>
			                <input type="text"
				                id="description"
				                placeholder="Enter Session Description" onChange={(e)=>setSSdes(e.target.value)} />
		                </div>
                        <div className="form-control">
                            <label htmlFor="lecture-id" id="lecture-id">
                                Lecture ID:{lecture.id}
                            </label>                        
                        </div>
                        <div className="form-control">
                            <label htmlFor="time" id="label-start-time">
                                Start Time
                            </label>
                            <input type="time"
                                id="time"
                                placeholder="Session Start Time" 
                                min="7:00" max="17:00" required onChange={(e)=>setSSstart(thedate+"T"+e.target.value+":00")}/>
                        </div>
                        <div className="form-control">
                            <label htmlFor="time" id="label-end-time">
                                End Time
                            </label>
                            <input type="time"
                                id="time"
                                placeholder="Session End Time" 
                                min="7:00" max="17:00" required onChange={
                                    (e)=>{
                                    e.preventDefault();
                                    newssend=e.target.value;
                                    const te = newssend.split(':')[0];
                                    if(te==='00'){
                                       newssend='12:'+newssend.split(':')[1];
                                    }
                                    setSSend(moment.utc(moment(thedate+" "+newssend+":00").format()).format())                                  
                                    }}/>
                        </div>
                        <input className="add-session-button" type={"submit"} value="ADD SESSION"></input>
                        <input className="back-button" type={"button"} value="BACK" onClick={goBack}></input>
                    </form>
            </div>
    )
}

export default AddSession