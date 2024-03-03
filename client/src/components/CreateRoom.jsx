import { Toaster, toast } from 'sonner';
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import contextTheme from "../utils/themeContext";
import copy from 'copy-to-clipboard';
import { useSelector } from 'react-redux';

const CreateRoom = ({ visible, setVisible }) => {
  // const { theme } = useContext(contextTheme);
  const theme=localStorage.getItem("theme")
  const [creator,setCreator]=useState({id:"",name:""})
  const user=useSelector((state)=>state.users.user);
  const navigate=useNavigate()
  const copyRef=useRef();
  
  function copyRoomId(){
    // console.log(copyRef.current.value)
    if(copyRef.current.value===""){
      toast.error("Generate 'ROOM ID' First")
    }else{
      copy(copyRef.current.value);
      toast.success('Copied ROOM_ID')
    }
  }


  function enterRoom(){
    if(creator.id==="" || creator.name===""){
      toast.error("Fill required fields");
    }else{
      if(!user){
        toast.error("LogIn first")
      }else{
        toast.success("Room Created.")
        navigate(`/editor/${creator.id}`,{
          state:{
            userName:creator.name
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
      <div
        className={`border border-gray-500 rounded-lg transition-shadow shadow-gray-200 w-[30%] p-2 px-6 m-auto my-40 ${
          theme === "dark" ? "bg-black" : "bg-white text-black"
        }`}
      >
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
          <div
            className={`flex items-center border mb-2 rounded ${
              theme === "dark" ? "border-teal-500" : "border-teal-500"
            }`}
          >
            <input
              id="roomId"
              name="id"
              ref={copyRef}
              type="text"
              value={creator.id}
              onChange={(e)=>setCreator({...creator,id:e.target.value})}
              required
              placeholder="ROOM ID"
              className={`block w-full rounded-md outline-none py-1.5 px-3 shadow-sm ring-gray-300  sm:text-sm sm:leading-6 ${
                theme === "dark"
                  ? "text-teal-500 bg-black border-teal-500"
                  : "text-gray-900 bg-white border-teal-500"
              }`}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={copyRoomId}
              className="lucide cursor-pointer mr-2 lucide-clipboard-minus"
            >
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <path d="M9 14h6" />
            </svg>
          </div>
          <input
            id="userName"
            name="userName"
            type="text"
            value={creator.name}
            required
            placeholder="Enter your Name"
            onChange={(e)=>setCreator({...creator,name:e.target.value})}
            className={`block mb-4 w-full rounded-md outline-none border py-1.5 px-3 shadow-sm ring-gray-300  sm:text-sm sm:leading-6 ${
              theme === "dark"
                ? "text-teal-500 bg-black border-teal-500"
                : "text-gray-900 bg-white border-teal-500"
            }`}
          />
          <button
            type="submit"
            className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm mb-2  leading-6 shadow-sm ${
              theme === "dark"
                ? "bg-teal-500 text-white"
                : "text-white bg-teal-500"
            }`}
            onClick={() => setCreator({...creator,id:uuidv4()})}
          >
            Generate ROOM ID
          </button>
          <button
            type="submit"
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

export default CreateRoom;
