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


function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/sign-up' element={<ChooseStatus/>}></Route>
            <Route path='/sign-up/teacher' element={<Register/>}></Route>
            <Route path='/sign-up/student' element={<RegisterStudent/>}></Route>
            <Route path='/problem' element={<ProblemView/>}></Route>
            <Route path='/user-profile' element={<UserProfile/>}></Route>
            <Route path='/students-tab' element={<StudentsTab/>}></Route>
            <Route path='/courses-tab' element={<CoursesTab/>}></Route>
            <Route path='/home' element={<HomePage/>}></Route>
          </Routes>
      </BrowserRouter>
   </>
  );
}

export default App;
