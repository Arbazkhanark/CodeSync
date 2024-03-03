import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import contextTheme from './utils/themeContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PageNotFound from './components/PageNotFound';
import EditorPage from './components/EditorPage';
import OtpVerification from './components/OtpVerification';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthorization } from './redux/actions/userAction';
import axios from 'axios';
axios.defaults.withCredentials = true;

const App = () => {
  const [themeMode,setThemeMode]=useState('light');
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(userAuthorization())
  },[dispatch])
  const user=useSelector((state)=>state.users.user)
  console.log("LOGIN: ",user)
  return (
    <contextTheme.Provider value={{theme:themeMode,setThemeMode}}>
        <BrowserRouter>
          <Navbar themeMode={themeMode} setThemeMode={setThemeMode} />

    <Toaster></Toaster>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<SignIn/>} />
            <Route path='register' element={<SignUp/>}/>
            <Route path='/editor/:roomId' element={<EditorPage/>}/>
            <Route path='/verify' element={<OtpVerification/>}/>
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>
        </BrowserRouter>
      </contextTheme.Provider>
  )
}

export default App
