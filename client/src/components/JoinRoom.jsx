// import { useContext } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import {Toaster, toast} from "sonner"
// import contextTheme from "../utils/themeContext";

const JoinRoom = ({ visible, setVisible }) => {
  // const { theme } = useContext(contextTheme);
  const theme=localStorage.getItem("theme")
  const [joiner,setJoiner]=useState({roomId:"",userName:""})
  const navigate=useNavigate()
  const user=useSelector((state)=>state.users.user)

  function enterRoom(){
    if(joiner.roomId==="" || joiner.userName===""){
      toast.error("Fill required fields");
    }else{
      if(!user){
        toast.error("LogIn first")
      }else{
        navigate(`/editor/${joiner.roomId}`,{
          state:{
            userName:joiner.userName
          }
        })
      }
    }
  }

  return (
    <div
      className={`${
        visible ? "block" : "hidden"
      } inset-0 fixed bg-opacity-30 backdrop-blur-sm`}
    >
    <Toaster/>
      <div className={`border border-gray-500 rounded-lg transition-shadow shadow-gray-200 w-[30%] p-2 px-6 m-auto my-40 ${theme==='dark'?"bg-black":"bg-white text-black"}`}>
        <div
          className="float-right cursor-pointer"
          onClick={() => setVisible(false)}
        >
          {theme === "light" ? (
            <lord-icon
              src="https://cdn.lordicon.com/nqtddedc.json"
              trigger="hover"
            ></lord-icon>
          ) : (
            <lord-icon
              src="https://cdn.lordicon.com/nqtddedc.json"
              colors="primary:#ffffff"
              trigger="hover"
            ></lord-icon>
          )}
        </div>
        <div className="flex items-center mx-[30%] my-5 text-center">
          {theme === "light" ? (
            <lord-icon
              src="https://cdn.lordicon.com/lzgmgrnn.json"
              trigger="loop"
            ></lord-icon>
          ) : (
            <lord-icon
              src="https://cdn.lordicon.com/lzgmgrnn.json"
              trigger="loop"
              colors="primary:#ffffff"
            ></lord-icon>
          )}
          <h1 className="text-xl ml-4">Code</h1>
          <span className=" text-teal-500 text-xl">Sync</span>
        </div>
        <div>
          <h3 className="mt-8 text-sm font-bold mb-1">
            Click the button to generate ROOM ID
          </h3>
          <input
            id="roomId"
            name="roomId"
            type="text"
            required
            value={joiner.roomId}
            placeholder="ROOM ID"
            onChange={(e)=>setJoiner({...joiner,roomId:e.target.value})}
            className={`block mb-2 w-full rounded-md outline-none border py-1.5 px-3 shadow-sm ring-gray-300  sm:text-sm sm:leading-6 ${
              theme === "dark"
                ? "text-teal-500 bg-black border-teal-500"
                : "text-gray-900 bg-white border-teal-500"
            }`}
          />
          <input
            id="userName"
            name="name"
            type="text"
            required
            value={joiner.userName}
            placeholder="Enter your name"
            onChange={(e)=>setJoiner({...joiner,userName:e.target.value})} 
            className={`block mb-4 w-full rounded-md outline-none border py-1.5 px-3 shadow-sm ring-gray-300  sm:text-sm sm:leading-6 ${
              theme === "dark"
                ? "text-teal-500 bg-black border-teal-500"
                : "text-gray-900 bg-white border-teal-500"
            }`}
          />
          <button
            className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm mb-5  leading-6 shadow-sm ${
              theme === "dark"
                ? "bg-teal-500 text-white"
                : "text-white bg-teal-500"
            }`}
            onClick={enterRoom}
          >
            JOIN ROOM
          </button>
        </div>
        <p className="text-sm mb-1 font-thin">
          If you want to join other room <Link to="">join here</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default JoinRoom;
