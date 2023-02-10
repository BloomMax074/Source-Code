import React, {useState} from "react"
import {useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ClassManage = () => {
    let navigate = useNavigate();
    const location = useLocation();
    var access_token = location.state.access_token;
    var username = location.state.username;
    var fullname = location.state.fullname;
    var account_type = location.state.account_type;
    var api_path = location.state.api_path;
    var course = location.state.course;
    var course_list = location.state.course_list;
    var class_list = location.state.class_list;
    var type = location.state.type;
    
    return (
        <div className="container">
            <form>
                <h1>{course.name} - DISMISS</h1>
            </form>
        </div>
    )
}

export default ClassManage