import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import ChooseStatus from './components/ChooseStatus';
import ProblemView from './components/ProblemView';


function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/sign-up' element={<ChooseStatus/>}></Route>
            <Route path='/sign-up/teacher' element={<Register/>}></Route>
            <Route path='/sign-up/student' element={<Register/>}></Route>
            <Route path='/problem' element={<ProblemView/>}></Route>
          </Routes>
      </BrowserRouter>
   </>
  );
}

export default App;
