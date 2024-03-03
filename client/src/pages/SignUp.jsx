import { useContext, useState } from "react";
import contextTheme from "../utils/themeContext";
import { Link } from "react-router-dom";
import OtpVerification from "../components/OtpVerification";
import { useDispatch } from "react-redux";
import { userRegister } from "../redux/actions/userAction";
import { Toaster } from "sonner";

export default function SignUp() {
    const [user,setUser]=useState({email:"",password:""})
    // const {theme}=useContext(contextTheme)
    const theme=localStorage.getItem("theme")
    const [visible,setVisible]=useState(false);
    const dispatch=useDispatch();

    function handleSignUp(){
      setVisible(true)
      dispatch(userRegister(user))
    }
    return (
      <>
      <Toaster />
        <div className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ${theme==='dark'?"bg-black":"bg-white"}`}>
          <div className="sm:mx-auto text-center sm:w-full sm:max-w-sm">
          {theme === "light" ? (
          <lord-icon
            src="https://cdn.lordicon.com/lzgmgrnn.json"
            style={{ width: "100px", height: "100px" }}
            trigger="loop"
          ></lord-icon>
        ) : (
          <lord-icon
            src="https://cdn.lordicon.com/lzgmgrnn.json"
            style={{ width: "100px", height: "100px" }}
            trigger="loop"
            colors="primary:#ffffff"
          ></lord-icon>
        )}
            <h2 className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight ${theme==='dark'?"text-white":"text-gray-900"}`}>
              Sign Up to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={(e)=>e.preventDefault()}>
              <div>
                <label htmlFor="email" className={`block text-sm  leading-6 ${theme==='dark'?"text-white":"text-gray-900"}`}>
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e)=>setUser({...user,email:e.target.value})}
                    className={`block w-full rounded-md outline-none border py-1.5 px-3 shadow-sm ring-gray-300  sm:text-sm sm:leading-6 ${theme==='dark'?"text-teal-500 bg-black border-teal-500":"text-gray-900 bg-white border-teal-500"}`}
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className={`*:block text-sm font-medium leading-6 ${theme==='dark'?"text-white":"text-gray-900"}`}>
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e)=>setUser({...user,password:e.target.value})}
                    className={`block w-full  rounded-md outline-none border py-1.5 px-3 shadow-sm ring-gray-300  sm:text-sm sm:leading-6 ${theme==='dark'?"text-teal-500 bg-black border-teal-500":"text-gray-900 bg-white border-teal-500"}`}
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm  leading-6 shadow-sm ${theme==='dark'?"bg-teal-500 text-white":"text-white bg-teal-500"}`}
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </div>
            </form>

            <OtpVerification visible={visible} setVisible={setVisible} />  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link to="/login" className="font-semibold leading-6  text-teal-500">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }
  