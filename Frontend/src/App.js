import SignIn from './component/signin/SignIn';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from './component/signup/SignUp';

import Dashboard from './component/Dashboard/Dashboard';

import Verify from './component/pages/Verify';

import LandedPage from './component/pages/LandedPage';

import Hello from './component/Hello';



function App() {

  return (

    <BrowserRouter>

      <Routes>

       

      <Route path="/" element={<Hello/>}/>

      <Route path="/signin" element={<SignIn/>}/>

      <Route path="/signup" element={<SignUp/>}/>
      




      <Route path="/dashboard/*" element={<Dashboard/>}/>

      <Route path="/verify/:token" element={<Verify/>}/>
      <Route path="/landedpage/*" element={<LandedPage/>}/>




      </Routes>

      </BrowserRouter>

   

  );

}



export default App;