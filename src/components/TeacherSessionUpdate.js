import React,{useState} from 'react';
import  { useLocation} from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import moment, * as moments from 'moment';
import moment2 from 'moment-timezone'

const TeacherSessionUpdate = () => {
    const location = useLocation();
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var course = location.state.course;
    var course_list = location.state.course_list;
    var lecture = location.state.lecture;
    var lecture_list = location.state.lecture_list;
    var session = location.state.session;
    var session_list = location.state.session_list;
    const thedate=moment().format().split('T')[0];
    const [end,EditEnd]= useState(location.state.session.end)
    const navigate=useNavigate();           
    const [updatename, setUpdateName]=useState("");
    const [updatedes, setUpdateDes]=useState("");
    const [updatestart, setUpdateStart]=useState("");
    const [updateend, setUpdateEnd]=useState("");

    async function handleUpdate(e){
        e.preventDefault();
        const apiupdate='http://35.240.197.121:80/api/sessions/'+session.id;
        const updata={
            name:updatename,
            description:updatedes,
            start:updatestart,
            end:updateend
        }
        const response=await axios.patch(apiupdate,updata,{ headers: { "Authorization" : `Bearer ${access_token}`} })
        console.log(response);
    }
    async function onBack(e){
        e.preventDefault();
        const api='http://35.240.197.121:80/api/lectures/';
        console.log(lecture.id)
        const api2=api+String(lecture.id)+'/sessions'
       
        const response=await axios.get(api2,{ headers: {"Authorization" : `Bearer ${access_token}`} })
        const newsslist=response.data;
        var newss=session;
        for (let session2 in newsslist.data) {
            if (newsslist.data[session2].id === session.id) {
                newss=newsslist.data[session2];
                console.log(newss);
            }
        }
        console.log(newsslist);
        console.log(newss);
        navigate('/TeacherSessionDetail',{
            state:{
                access_token:access_token,
                username:username,
                fullname:fullname,
                account_type:account_type,
                course:course,
                course_list:course_list,
                lecture:lecture,
                lecture_list:lecture_list,
                session:newss,
                session_list:newsslist,
                
            }
        })
        


    }
    return (
       
            <div className="add-course">
                    <h1>SESSION UPDATE</h1>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control">
			                <label for="name" id="label-name">
				                Name
			                </label>
			                <input type="text"
				                id="name"
				                placeholder="Enter New Name" onChange={(e)=>setUpdateName(e.target.value)} />
		                </div>
                        <div className="form-control">
			                <label for="description" id="label-description">
				                Description
			                </label>
			                <input type="text"
				                id="description"
				                placeholder="Enter New Description" onChange={(e)=>setUpdateDes(e.target.value)}/>
		                </div>
                        <div className="form-control">
			                <label for="description" id="label-description">
				                Update Start
			                </label>
                            <input type="time"
                                id="time"
                                placeholder="New Start Time" 
                                min="7:00" max="17:00" required onChange={(e)=>setUpdateStart(thedate+"T"+e.target.value+":00")}/>
		                </div>
                        <div className="form-control">
			                <label for="description" id="label-description">
				                Update End
			                </label>
                            <input type="time"
                                id="time"
                                placeholder="New End Time" 
                                min="7:00" max="17:00" required onChange={
                                    (e)=>{
                                        e.preventDefault();
                                        var newssend=e.target.value;
                                        const te = newssend.split(':')[0];
                                        if(te==='00'){
                                           newssend='12:'+newssend.split(':')[1];
                                        }
                                        setUpdateEnd(moment.utc(moment(thedate+" "+newssend+":00").format()).format())
                                }}/>
		                </div>
                        <input className="add-course-button" type={"submit"} value="ADD UPDATE"></input>
                        <input className="back-button" type={"button"} value="BACK" onClick={onBack}></input>
                    </form>
            </div>
    )
}

export default TeacherSessionUpdate