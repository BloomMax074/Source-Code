import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const AddLecture = () => {
    const location = useLocation();
    var access_token = location.state.access_token;
    const [lecturename, setLectureName]=useState("");
    const [lecturedes, setLectureDes]=useState("");
    async function handleAddlecture(e)
    {
        e.preventDefault();
        const newLecture={
             name:lecturename,
             description:lecturedes,
        };
        var response= await axios.post("http://35.247.128.143:8000/api/lectures/",newLecture,{ headers: {"Authorization" : `Bearer ${access_token}`} })
        console.log(response);
    }

    return (
        <addlecture>
            <div className="add-lecture">
                <form onSubmit={handleAddlecture}>
                        <h1>Lecture Details</h1>
                        <form>
                            <div className="form-control">
                                <label for="lecture-id" id="label-lecture-id">
                                    Lecture ID
                                </label>
                                <input type="int"
                                    id="lecture-id" 
                                    placeholder="Enter Lecture ID" />
                            </div>
                            <div className="form-control">
                                <label for="name" id="label-name">
                                    Name
                                </label>
                                <input type="text"
                                    id="name"
                                    placeholder="Enter Lecture Name" />
                            </div>
                            <div className="form-control">
                                <label for="description" id="label-description">
                                    Description
                                </label>
                                <input type="text"
                                    id="description"
                                    placeholder="Enter Lecture Description" />
                            </div>
                            <input className="add-lecture-button" type={"button"} value="ADD LECTURE"></input>
                        </form>
                </form>
            
            </div>
        </addlecture>
    )
}

export default AddLecture