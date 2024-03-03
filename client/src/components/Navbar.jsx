import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";





const Navbar = ({ themeMode, setThemeMode }) => {
  const [time, setTime] = useState(new Date());
  const user=useSelector((state)=>state.users.user)
  // console.log("LogIned",user);
  localStorage.setItem("theme",themeMode)
  console.log(themeMode);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  const formattedDate = time.toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  return (
    <>
      <div
        className={`flex justify-between items-center p-2 px-5 ${
          themeMode === "dark" ? "bg-black" : "bg-white text-black"
        }`}
      >
        <Link to="/" className="logo flex items-center">
          {themeMode === "light" ? (
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
        </Link>

        <div className="user flex items-center">
          {themeMode==='light' ?
              <i
              className="fa-solid fa-moon text-xl mr-10 cursor-pointer"
              onClick={() => setThemeMode("dark")}
              ></i>:
              <i
              className="fa-solid fa-sun text-xl mr-10 cursor-pointer"
              onClick={() => setThemeMode("light")}
              ></i>
          }
          <div className="time mr-10">
            <p>
              {time.getHours()} : {time.getMinutes()} : {time.getSeconds()}
            </p>
            <p>{formattedDate}</p>
          </div>

          <div>
            {!user ?
              <Link to="/login">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
              </Link>:<Avatar/>
            }
        
          </div>
        </div>
      </div>
      <hr className="h-px dark:bg-gray-600 border-0 bg-gray-800"/>
    </>
  );
};

export default Navbar;



