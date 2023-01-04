
import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const AddCourse = () => {
    const location = useLocation();
    var access_token = location.state.access_token;
    const [coursename, setCourseName]=useState("");
    const [coursedes, setCourseDes]=useState("");

    async function handleAddCourse(e)
    {
        e.preventDefault();
        const newCourse={
             name:coursename,
             description:coursedes,
        };
        var response= await axios.post("http://35.247.128.143:8000/api/courses/",newCourse,{ headers: {"Authorization" : `Bearer ${access_token}`} })
        document.getElementById('coursename').value='';
        alert(response.data.message)
        console.log(response);
    }
    // async function handleSavePassword(e) {
    //     e.preventDefault();
    //     const newPasswordSave={
    //         password : password,
    //         new_password : newPassword,
    //         confirm_password : confirmPassword
    //     };
    //     var response = await axios.post("http://35.247.128.143:8000/api/auth/change-password", newPasswordSave, { headers: {"Authorization" : `Bearer ${access_token}`} });
    //     document.getElementById('password').value = '';
    //     document.getElementById('newPassword').value = '';
    //     document.getElementById('confirmPassword').value = '';
    //     alert(response.data.message)
    // }

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
                    </form>
            </form>
            </div>
        </addcourse>
    )
}

export default AddCourse