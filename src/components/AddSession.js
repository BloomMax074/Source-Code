import axios from "axios";
import React from "react"
import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import moment, * as moments from 'moment';


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
        /*date.setCalendar(gregorian)
        .setFormat("YYYY-MM-DD HH:mm:ss.SSS")
        .setLocale(gregorian_en)
        .setYear(2020)
        .setMonth(9)
        .setDay(21)
        .setHour(12)
        .setMinute(20)
        .setSecond(14)
        .setMillisecond(200);
        date2.setCalendar(gregorian)
        .setFormat("YYYY-MM-DD HH:mm:ss.SSS")
        .setLocale(gregorian_en)
        .setYear(2020)
        .setMonth(9)
        .setDay(21)
        .setHour(12)
        .setMinute(30)
        .setSecond(15)
        .setMillisecond(200);*/
        /*setSSstart(moment(thedate+"T"+ssstart+":00"));
        setSSend(moment(thedate+"T"+ssend+":00"));*/
        /*setSSstart(thedate+"T"+ssstart+":00");*/
        /*setSSend(thedate+"T"+ssend+":00");*/
        const ss={
            lecture_id:sslecID,
            name:ssname,
            description:ssdes,
            start:ssstart,
            end:ssend,
        }
        const response= await axios.post("http://35.247.128.143:8000/api/sessions/",ss,{ headers: {"Authorization" : `Bearer ${access_token}`} });
        console.log(response);
        
    }
    function goBack(){
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
                session_list:session_list,
            }
        })
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
                                Lecture ID
                            </label>
                            <input type="int"
                                id="lecture-id" 
                                placeholder="Enter Lecture ID" onChange={(e)=>setSSlecID(e.target.value)}/>
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
                                min="7:00" max="17:00" required onChange={(e)=>setSSend(thedate+"T"+e.target.value+":00")}/>
                        </div>
                        <input className="add-session-button" type={"submit"} value="ADD SESSION"></input>
                        <input className="back-button" type={"button"} value="BACK" onClick={goBack}></input>
                    </form>
            </div>
    )
}

export default AddSession