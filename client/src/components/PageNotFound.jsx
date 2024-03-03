
import { useContext } from "react";
import { Link } from "react-router-dom";
import themeContext from "../utils/themeContext";

const PageNotFound = () => {
    // const {theme}=useContext(themeContext)
    const theme=localStorage.getItem("theme")
  return (
    <div className={`${theme==='dark' ? " bg-black" :"bg-white"} pt-16`}>
      <div className="text-center">
        <h1 className="mb-5 text-6xl font-semibold text-red-500">404</h1>
        <p className={`mb-14 text-lg ${theme==='dark' ? "text-gray-300":"text-gray-600"} `}>
          Oops! Looks like you{"'"}re lost.
        </p>
        <div>
            <lord-icon
                src="https://cdn.lordicon.com/usownftb.json"
                trigger="loop"
                colors={theme === 'dark' ? 'primary:#ffffff,secondary:#08a88a' : ''}
                style={{width:"250px",height:"250px"}}>
            </lord-icon>            
            <lord-icon
                src="https://cdn.lordicon.com/zvheymqn.json"
                trigger="loop"
                colors={theme === 'dark' ? 'primary:#ffffff,secondary:#08a88a' : ''}
                style={{width:"250px",height:"250px"}}>
            </lord-icon>
        </div>
        <p className={`mt-4 ${theme==='dark' ? "text-gray-300":"text-gray-600"}`}>
          Let{"'"}s get you back{" "}
          <Link to="/" className="text-blue-500">
            home
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;