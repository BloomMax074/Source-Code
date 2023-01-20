import React from "react"
import { useNavigate,useLocation } from "react-router-dom";

const TeacherStudentMenu = () => {
    let navigate = useNavigate();
    const location=useLocation();
    const access_token=location.state.access_token;
    const username = location.state.username;
    const fullname = location.state.fullname;
    const account_type = location.state.account_type;
    const student_list = location.state.student_list;

    function toHomePage(e) {
        e.preventDefault();
        navigate('/TeacherHP', {
            state : {
                access_token : access_token,
                username : username,
                fullname : fullname,
                account_type : account_type 
            },
        });
    }
    
    async function AddStu(e){
        e.preventDefault();
        navigate('/AddStudent',{
            state:{
                access_token:access_token,
                username:username,
                fullname:fullname,
                account_type:account_type,
                student_list:student_list,
            },
        });
        
    }

    function viewStudentDetail(select_id) {
        for (let student in student_list) {
            if (student_list[student].id === select_id) {
                navigate('/TeacherStudentDetail', {
                    state : {
                        access_token:access_token,  
                        username:username,
                        fullname:fullname,
                        account_type:account_type,
                        student_list:student_list,
                        student: student_list[student]
                    },
                });
            }
        }
    }

    return (
            <div className="teacher-course-menu">
                <form>
                    <h1>STUDENT MENU</h1>
                        <div className="course-list">
                            {student_list.map((item, index) => {
                                return (
                                    <input type="button" id={item.id} key={item.id} value={item.username} onClick={()=>{viewStudentDetail(item.id)}}></input>
                                )
                            })}  
                        </div>
                        <table className="navigation-table">
                            <tbody>
                                <tr>
                                    <td>
                                        <button className="add-course-button" onClick={AddStu}>
                                            ADD NEW STUDENT
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="navigation-table">
                            <tbody>
                                <tr>
                                    <td>
                                        <button className="home-button" onClick={ toHomePage }>
                                            HOME
                                        </button>
                                    </td>
                                    <td>
                                        <button className="back-button" onClick={ toHomePage }>
                                            BACK
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                </form>
            </div>
    )
}

export default TeacherStudentMenu