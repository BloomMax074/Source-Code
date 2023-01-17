import React,{useState} from 'react';
import  { useLocation} from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
    const location = useLocation();
    var access_token = location.state.access_token;
    var course_list = location.state.course_list;
    var username =location.state.username;
    var fullname =location.state.fullname;
    var account_type =location.state.account_type;
    const [coursename, setCourseName]=useState("");
    const [coursedes, setCourseDes]=useState("");

    async function handleAddCourse(e){
        e.preventDefault();
        const newCourse={
             name:coursename,
             description:coursedes,
        };
        var response= await axios.post("http://35.247.128.143:8000/api/courses/",newCourse,{ headers: {"Authorization" : `Bearer ${access_token}`} })
        console.log(response);
    }

    async function onBack(e){
        e.preventDefault();
        var response= await axios.get("http://35.247.128.143:8000/api/courses/",{ headers: { "Authorization" : `Bearer ${access_token}`} })
        console.log(response);
        navigate('/TeacherCourseMenu',{
            state:{
            access_token:access_token,
            username:username,
            fullname:fullname,
            account_type:account_type,
            course_list:response.data
                
            }
        })
    }
    
    return (
        <addcourse>
            <div className="add-course">
            <form onSubmit={handleAddCourse}>
                    <h1>Course Details</h1>
                    <form>
                        <div className="form-control">
			                <label for="name" id="label-name">
				                Name
			                </label>
			                <input type="text"
				                id="name"
				                placeholder="Enter Course Name" onChange={(e)=>setCourseName(e.target.value)} />
		                </div>
                        <div className="form-control">
			                <label for="description" id="label-description">
				                Description
			                </label>
			                <input type="text"
				                id="description"
				                placeholder="Enter Course Description" onChange={(e)=>setCourseDes(e.target.value)}/>
		                </div>
                        <input className="add-course-button" type={"submit"} value="ADD COURSE"></input>
                        <input className="back-button" type={"button"} value="BACK" onClick={onBack}></input>
                    </form>
            </form>
            </div>
        </addcourse>
    )
}

export default AddCourse