import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import StudentCourseMenu from "./components/StudentCourseMenu";
import StudentHP from "./components/StudentHP";
import StudentSessionMenu from "./components/StudentSessionMenu";
import StudentSessionDetail from "./components/StudentSessionDetail";
import StudentLectureMenu from "./components/StudentLectureMenu";
import TeacherHP from "./components/TeacherHP";
import TeacherCourseMenu from "./components/TeacherCourseMenu";
import TeacherLectureMenu from "./components/TeacherLectureMenu";
import TeacherSessionMenu from "./components/TeacherSessionMenu";
import AddCourse from "./components/AddCourse";
import AddSession from "./components/AddSession";
import AddLecture from "./components/AddLecture";
import TeacherSessionDetail from "./components/TeacherSessionDetail";
import "./index.css"

const App = () => {
    return (
      <Router>
          <Routes>
            <Route exact path='/LoginForm' element={<LoginForm/>} />
            <Route exact path='/TeacherHP' element={<TeacherHP/>} />
            <Route exact path='/StudentHP' element={<StudentHP/>} />
            <Route exact path='/TeacherCourseMenu' element={<TeacherCourseMenu/>} />
            <Route exact path='/StudentCourseMenu' element={<StudentCourseMenu/>} />
            <Route exact path='/AddCourse' element={<AddCourse/>} />
            <Route exact path='/TeacherLectureMenu' element={<TeacherLectureMenu/>} />
            <Route exact path='/StudentLectureMenu' element={<StudentLectureMenu/>} />
            <Route exact path='/TeacherSessionMenu' element={<TeacherSessionMenu/>} />
            <Route exact path='/StudentSessionMenu' element={<StudentSessionMenu/>} />
            <Route exact path='/AddLecture' element={<AddLecture/>} />
            <Route exact path='/AddSession' element={<AddSession/>} />
            <Route exact path='/StudentSessionDetail' element={<StudentSessionDetail/>} />
            <Route exact path='/TeacherSessionDetail' element={<TeacherSessionDetail/>} />
          </Routes>
      </Router>
    );
  }


export default App;
