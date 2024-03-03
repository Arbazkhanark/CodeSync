import { useContext, useEffect, useState } from "react";
import contextTheme from "../utils/themeContext";
import { features, subFeatures } from "../utils/constant";
import CreateRoom from "../components/CreateRoom";
import JoinRoom from "../components/JoinRoom";

const Home = () => {
  // const { theme } = useContext(contextTheme);
  const theme=localStorage.getItem("theme")
  const [active, setActive] = useState(0);
  const [count,setCount]=useState(0);
  const [visible,setVisible]=useState({create:false,join:false})

  useEffect(()=>{
    setTimeout(()=>{
      if(count===subFeatures.length-1){
        setCount(0)
      }else{
        setCount(count+1)
      }
    },5000)
  },[count])


  function nextActive() {
    if (active === features.length - 1) {
      setActive(0);
    } else {
      setActive(active + 1);
    }
  }

  function prevActive() {
    if (active === 0) {
      setActive(features.length - 1);
    } else {
      setActive(active - 1);
    }
  }
  return (
    <>
      <div
        className={`flex items-center justify-between ${
          theme === "light"  ? " bg-white" : "bg-black"
        }  p-10 pt-20`}
      >
        <div className="left w-[100%]">
          <div
            className={`max-w-xl p-6  border  rounded-lg shadow ${
              theme === "light"
                ? "bg-white border-gray-200 text-gray-900"
                : "dark dark:border-gray-900"
            }`}
          >
            <a href="#">
              <h5
                className={`mb-2 text-5xl font-bold tracking-tight ${
                  theme === "light" ? "text-teal-600" : "text-white"
                }`}
              >
                Interview calls and meetings for everyone
              </h5>
            </a>
            <p className="mb-5 mt-8 font-normal text-gray-700 dark:text-gray-400">
              CodeSync provides secure, easy-to-use real time code editor and
              sketching for everyone, on any device
            </p>
            <button className={`p-1 rounded mr-4 border ${theme==='dark'?"bg-teal-600 ":"bg-teal-500"}`} onClick={()=>setVisible({...visible,create:true})}>Create a Room</button>
            <button className={`p-1 rounded mr-4 border ${theme==='dark'?"bg-teal-600 ":"bg-teal-500"}`} onClick={()=>setVisible({...visible,join:true})}>Join a Room</button>
          </div>
          <a href="" className="text-gray-400">Learn more</a>about CodeSync
              <div className="">
          <CreateRoom visible={visible.create} setVisible={setVisible} />
          <JoinRoom visible={visible.join} setVisible={setVisible} />
              </div>
              

          <div
            className={`max-w-xl p-6  border  rounded-lg shadow ${
              theme === "light"
                ? "bg-white border-gray-200 text-gray-900"
                : "dark dark:border-gray-900"
            }`}
          >
            <div className={`${theme==="dark"?"text-gray-400 font-thin":"font-thin text-black"} flex justify-around items-center `}>
              <lord-icon
                src={subFeatures[count].src}
                style={{ width: "100px", height: "100px" }}
                colors={theme === 'dark' ? 'primary:#ffffff,secondary:#08a88a' : ''}
                trigger="loop"
              ></lord-icon>

                <p className="w-[60%]">{subFeatures[count].text}</p>

            </div>
          </div>

        </div>

        <div className="right w-[100%]">
          <div
            className={`max-w-xl p-6  border  rounded-lg shadow ${
              theme === "light"
                ? "bg-white border-gray-200 text-white"
                : "dark dark:border-gray-900"
            }  `}
          >
            <div className="text-center flex items-center">
              <button
                className={`text-xl ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
                onClick={prevActive}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <div className="mx-6">
                <lord-icon
                  className="text-4xl"
                  style={{ width: "200px", height: "200px" }}
                  colors={theme === 'dark' ? 'primary:#ffffff,secondary:#08a88a' : ''}
                  src={features[active].icon}
                  trigger="loop"
                ></lord-icon>
                <h3
                  className={`text-3xl my-10 ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {features[active].name}
                </h3>
                <p
                  className={`${
                    theme === "dark" ? " text-slate-300" : "text-black"
                  }`}
                >
                  {features[active].description}
                </p>
              </div>
              <button
                className={`text-xl ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
                onClick={nextActive}
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
