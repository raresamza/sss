import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import RegisterStudent from './components/RegisterStudent';
import ChooseStatus from './components/ChooseStatus';
import ProblemView from './components/ProblemView';
import UserProfile from './components/UserProfile';
import StudentsTab from './components/StudentsTab';
import CoursesTab from './components/CoursesTab';
import HomePage from './components/HomePage';
import ChangeEmail from './components/ChangeEmail';
import ChangePassword from './components/ChangePassword';
import ResetPassword from './components/ResetPassword';
import Enroll from './components/Enroll';
import AddCourse from './components/AddCourse';
import AddLecture from './components/AddLecture';
import QuizPage from './components/QuizPage';
import CreateQuiz from './components/CreateQuiz';
import QuizFallback from './components/QuizFallback';

//add course code checker
function App() {
  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/sign-up' element={<ChooseStatus />}></Route>
          <Route path='/sign-up/teacher' element={<Register />}></Route>
          <Route path='/sign-up/student' element={<RegisterStudent />}></Route>
          <Route path='/problem' element={<ProblemView />}></Route>
          <Route path='/courses-tab/:courseCode' element={<ProblemView />}></Route>
          <Route path='/courses-tab/:courseCode/lecture/:header' element={<ProblemView />}></Route>
          <Route path='/courses-tab/:courseCode//lecture/:header' element={<ProblemView />}></Route>
          <Route path='/user-profile' element={<UserProfile />}></Route>
          <Route path='/students-tab' element={<StudentsTab />}></Route>
          <Route path='/courses-tab' element={<CoursesTab />}></Route>
          <Route path='/home' element={<HomePage />}></Route>
          <Route path='/create-quiz' element={<CreateQuiz />}></Route>
          <Route path='/quiz-page' element={<QuizPage />}></Route>
          <Route path='/change-email' element={<ChangeEmail />}></Route>
          <Route path='/change-password' element={<ChangePassword />}></Route>
          <Route path='/reset-password' element={<ResetPassword />}></Route>
          <Route path='/courses-tab/enroll' element={<Enroll />}></Route>
          <Route path='/courses-tab/add' element={<AddCourse />}></Route>
          <Route path='/courses-tab/addLecture' element={<AddLecture />}></Route>
          <Route path='/quiz/fallback' element={<QuizFallback />}></Route>
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
