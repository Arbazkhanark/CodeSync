import { useContext, useState } from "react";
import contextTheme from "../utils/themeContext";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/userAction";

const profileMenuItems = [
    {
      label: "My Profile",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>,
    },
    {
      label: "Edit Profile",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-cog"><circle cx="18" cy="15" r="3"/><circle cx="9" cy="7" r="4"/><path d="M10 15H6a4 4 0 0 0-4 4v2"/><path d="m21.7 16.4-.9-.3"/><path d="m15.2 13.9-.9-.3"/><path d="m16.6 18.7.3-.9"/><path d="m19.1 12.2.3-.9"/><path d="m19.6 18.7-.4-1"/><path d="m16.8 12.3-.4-1"/><path d="m14.3 16.6 1-.4"/><path d="m20.7 13.8 1-.4"/></svg>,
    },
    {
      label: "Inbox",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-inbox"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>,
    },
    {
      label: "Help",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle-question"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>,
    },
    {
      label: "Sign Out",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-power"><path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.77.04"/></svg>,
    },
  ];
  
  
  
  function Avatar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const {theme}=useContext(contextTheme)
    const theme=localStorage.getItem("theme")
    const dispatch=useDispatch()
  
    const closeMenu = () => setIsMenuOpen(false);
  
    return (
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex items-center border rounded-full p-2  lg:ml-auto"
        >
          {/* <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            alt="User"
            className="w-8 h-8 rounded-full border border-gray-900 p-0.5"
          /> */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
          
            {profileMenuItems.map(({ label,icon }, key) => {
              const isLastItem = key === profileMenuItems.length - 1;
              return (
                <button
                  key={label}
                  onClick={label === "Sign Out" ? () => dispatch(logout()) : closeMenu}
                  className={`flex gap-2  items-center w-full px-4 py-2 text-sm text-left  ${theme==="dark" ? " bg-black hover:text-white hover:bg-gray-800":"hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"} ${
                    isLastItem ? "text-red-500" : ""
                  }`}
                >
                 {icon}
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }
  

  export default Avatar