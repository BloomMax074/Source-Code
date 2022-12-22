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
import "./index.css"

const App = () => {
    return (
      <Router>
          <Routes>
            <Route exact path='/LoginForm' element={<LoginForm/>} />
            <Route exact path='/TeacherHP' element={<TeacherHP/>} />
          </Routes>
      </Router>
    );
  }


export default App;
