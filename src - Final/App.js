import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import LoginForm from "./components/util/LoginForm";

import StudentHP from "./components/HomePage/StudentHP";
import TeacherHP from "./components/HomePage/TeacherHP";

import StudentCourseMenu from "./components/Course/StudentCourseMenu";
import TeacherCourseMenu from "./components/Course/TeacherCourseMenu";

import StudentLectureMenu from "./components/Lecture/StudentLectureMenu";
import TeacherLectureMenu from "./components/Lecture/TeacherLectureMenu";

import StudentSessionMenu from "./components/Session/StudentSessionMenu";
import StudentSessionDetail from "./components/Session/StudentSessionDetail";
import TeacherSessionMenu from "./components/Session/TeacherSessionMenu";
import TeacherSessionDetail from "./components/Session/TeacherSessionDetail";
import CreateSession from "./components/Session/CreateSession";
import EditSession from "./components/Session/EditSession";
import ActiveSession from "./components/Session/ActiveSession";
import ActiveSessionDetail from "./components/Session/ActiveSessionDetail";

import StudentHistory from "./components/Attendance Check/StudentHistory";
import Attendee from "./components/Attendance Check/Attendee";
import AddAttendee from "./components/Attendance Check/AddAttendee";

import EditProfile from "./components/Accounts/EditProfile";
import AccountList from "./components/Accounts/AccountList";
import EditAccount from "./components/Accounts/EditAccount";
import CreateAccount from "./components/Accounts/CreateAccount";

import ClassList from "./components/Class/ClassList";
import Dismiss from "./components/Class/Dismiss";
import Enroll from "./components/Class/Enroll";

import Edit from "./components/util/Edit";
import Add from "./components/util/Add";

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
            <Route exact path='/TeacherSessionDetail' element={<TeacherSessionDetail/>} />
            <Route exact path='/CreateSession' element={<CreateSession/>} />
            <Route exact path='/EditSession' element={<EditSession/>} />
            <Route exact path='/ActiveSession' element={<ActiveSession/>} />
            <Route exact path='/ActiveSessionDetail' element={<ActiveSessionDetail/>} />

            <Route exact path='/StudentHistory' element={<StudentHistory/>} />
            <Route exact path='/Attendee' element={<Attendee/>} />
            <Route exact path='/AddAttendee' element={<AddAttendee/>} />

            <Route exact path='/AccountList' element={<AccountList/>} />
            <Route exact path='/EditProfile' element={<EditProfile/>} />
            <Route exact path='/EditAccount' element={<EditAccount/>} />
            <Route exact path='/CreateAccount' element={<CreateAccount/>} />
            
            <Route exact path='/ClassList' element={<ClassList/>} />           
            <Route exact path='/Dismiss' element={<Dismiss/>} />
            <Route exact path='/Enroll' element={<Enroll/>} />

            <Route exact path='/Edit' element={<Edit/>} />
            <Route exact path='/Add' element={<Add/>} />
          </Routes>
      </Router>
    );
  }

export default App;