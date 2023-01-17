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
    
    async function AddStu(e){
        e.preventDefault();
        navigate('/AddStudent',{
            state:{
                access_token:access_token,
                username:username,
                fullname:fullname,
                account_type:account_type,
                student_list:student_list,
            }
        })
        
    }

    function viewStudentDetail(select_id) {
        for (let student in student_list) {
            if (student_list[student].id == select_id) {
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
        <teachercoursemenu>
            <div className="teacher-course-menu">
                <form>
                    <h1>STUDENT MENU</h1>
                    <form>
                        <div className="course-list">
                            {student_list.map((item, index) => {
                                return (
                                    <input type="button" id={item.id} key={item.id} value={item.username} onClick={()=>{viewStudentDetail(item.id)}}></input>
                                )
                            })}  
                        </div>
                        <table className="navigation-table">
                            <button className="add-course-button" onClick={AddStu}>
                                ADD NEW STUDENT
                            </button>
                        </table>
                        <table className="navigation-table">
                            <tr>
                                <td>
                                    <button className="home-button" onClick={() => {navigate('/TeacherHP') }}>
                                        HOME
                                    </button>
                                </td>
                                <td>
                                    <button className="back-button" onClick={() => {navigate('/TeacherHP')}}>
                                        BACK
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </form>
                </form>
            </div>
        </teachercoursemenu>
    )
}

export default TeacherStudentMenu