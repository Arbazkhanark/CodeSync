import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import contextTheme from "../utils/themeContext";
import { useDispatch } from "react-redux";
import { verifyOtpSignIn } from "../redux/actions/userAction";

const OtpVerification = ({ visible, setVisible }) => {
  // const { theme } = useContext(contextTheme);
  const theme=localStorage.getItem("theme")
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [otp,setOtp]=useState('')
  const navigate=useNavigate();

  const dispatch=useDispatch()
  const disableBtnRef = useRef(true);
  const inputRefs = useRef([]);

  //Disable and Enable Verify Button
  useEffect(() => {
    if (otpValues.includes("")) {
      disableBtnRef.current.disabled = true;
    } else {
      disableBtnRef.current.disabled = false;
    }
    setOtp(otpValues.join(""))
  }, [otpValues]);

  const handleInputChange = (e, index) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = e.target.value;
    setOtpValues(newOtpValues);

    // Move focus to the next input field
    if (index < otpValues.length - 1 && e.target.value !== "") {
      inputRefs.current[index + 1].focus();
    }

    //Move focus to the prev input field
    if (index < otpValues.length && e.target.value === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };


  console.log(typeof otp)
  return (
    <div
      className={`${
        visible ? "block" : "hidden"
      } inset-0 fixed bg-opacity-30 backdrop-blur-sm`}
    >
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
        <div className="text-center">
          <h3 className="mt-8 mb-5 text-sm font-bold">Enter your OTP</h3>
          <div className="flex mb-3 items-center justify-evenly">
            {otpValues.map((val, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                name={`otp-${index}`}
                type="text"
                value={val}
                onChange={(e) => handleInputChange(e, index)}
                maxLength="1"
                required
                placeholder="0"
                className={`block mb-2 w-[15%] focus:border-teal-900 text-center rounded-md outline-none border py-1.5 px-3 shadow-sm ring-gray-300 sm:text-sm sm:leading-6 ${
                  theme === "dark"
                    ? "text-teal-500 bg-black border-teal-500"
                    : "text-gray-900 bg-white border-teal-500"
                }`}
              />
            ))}
          </div>

          <button
            type="submit"
            ref={disableBtnRef}
            disabled={disableBtnRef.current.disabled}
            className={`flex w-full justify-center rounded-md disabled:cursor-not-allowed disabled:bg-gray-400  px-3 py-1.5 text-sm mb-5 leading-6 shadow-sm ${
              theme === "dark"
                ? "bg-teal-500 text-white"
                : "text-white bg-teal-500"
            } `}
            onClick={()=>dispatch(verifyOtpSignIn(otp,navigate))}
          >
            Verify OTP
          </button>
        </div>
        <p className="text-sm mb-1 font-thin">
          If you did not receive the OTP, <Link to="">resend OTP</Link>.
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;
