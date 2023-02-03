import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/util/LoginForm";
import StudentCourseMenu from "./components/Student/StudentCourseMenu";
import StudentHP from "./components/Student/StudentHP";
import StudentSessionMenu from "./components/Student/StudentSessionMenu";
import StudentSessionDetail from "./components/Student/StudentSessionDetail";
import StudentLectureMenu from "./components/Student/StudentLectureMenu";
import TeacherHP from "./components/Teacher/TeacherHP";
import TeacherCourseMenu from "./components/Teacher/TeacherCourseMenu";
import TeacherLectureMenu from "./components/Teacher/TeacherLectureMenu";
import TeacherSessionMenu from "./components/Teacher/TeacherSessionMenu";
import EditProfile from "./components/util/EditProfile";
import Edit from "./components/Teacher/Edit";
import Add from "./components/Teacher/Add";
import AccountList from "./components/Teacher/AccountList";

import "./index.css"

const App = () => {
    return (
      <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/LoginForm" />} />
            <Route exact path='/LoginForm' element={<LoginForm/>} />
            <Route exact path='/TeacherHP' element={<TeacherHP/>} />
            <Route exact path='/StudentHP' element={<StudentHP/>} />
            <Route exact path='/TeacherCourseMenu' element={<TeacherCourseMenu/>} />
            <Route exact path='/StudentCourseMenu' element={<StudentCourseMenu/>} />
            <Route exact path='/TeacherLectureMenu' element={<TeacherLectureMenu/>} />
            <Route exact path='/StudentLectureMenu' element={<StudentLectureMenu/>} />
            <Route exact path='/TeacherSessionMenu' element={<TeacherSessionMenu/>} />
            <Route exact path='/StudentSessionMenu' element={<StudentSessionMenu/>} />
            <Route exact path='/StudentSessionDetail' element={<StudentSessionDetail/>} />
            <Route exact path='/EditProfile' element={<EditProfile/>} />
            <Route exact path='/Edit' element={<Edit/>} />
            <Route exact path='/Add' element={<Add/>} />
            <Route exact path='/AccountList' element={<AccountList/>} />
          </Routes>
      </Router>
    );
  }

export default App;
