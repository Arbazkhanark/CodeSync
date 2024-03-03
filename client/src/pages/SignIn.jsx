import { useContext, useState } from "react";
import contextTheme from "../utils/themeContext";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logInUser } from "../redux/actions/userAction";

export default function SignIn() {
    // const {theme}=useContext(contextTheme)
    const theme=localStorage.getItem("theme")
    const [user,setUser]=useState({email:"",password:""})
    const dispatch=useDispatch();
    const navigate=useNavigate();
    return (
      <>
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
              Sign in to your account
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
                    onChange={(e)=>setUser({...user,email:e.target.value})}
                    required
                    className={`block w-full  rounded-md outline-none border py-1.5 px-3 shadow-sm ring-gray-300  sm:text-sm sm:leading-6 ${theme==='dark'?"text-teal-500 bg-black border-teal-500":"text-gray-900 bg-white border-teal-500"}`}
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className={`*:block text-sm font-medium leading-6 ${theme==='dark'?"text-white":"text-gray-900"}`}>
                    Password
                  </label>
                  <div className="text-sm">
                    <Link to="/forgetPassword" className={`text-sm font-thin ${theme==='dark'?"text-white":"text-gray-900"}`}>
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e)=>setUser({...user,password:e.target.value})}
                    required
                    className={`block w-full  rounded-md outline-none border py-1.5 px-3 shadow-sm ring-gray-300  sm:text-sm sm:leading-6 ${theme==='dark'?"text-teal-500 bg-black border-teal-500":"text-gray-900 bg-white border-teal-500"}`}
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm  leading-6 shadow-sm ${theme==='dark'?"bg-teal-500 text-white":"text-white bg-teal-500"}`}
                  onClick={()=>dispatch(logInUser(user,navigate))}
                >
                  Sign In
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link to="/register" className="font-semibold leading-6  text-teal-500">
                Sign Up 
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }
  