import axios from "axios"

export const USER_REGISTER_REQUEST="USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS="USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILED="USER_REGISTER_FAILED";

export const VERIFY_SIGNUP_OTP_REQUEST="VERIFY_SIGNUP_OTP_REQUEST";
export const VERIFY_SIGNUP_OTP_SUCCESS="VERIFY_SIGNUP_OTP_SUCCESS";
export const VERIFY_SIGNUP_OTP_FAIL="VERIFY_SIGNUP_OTP_FAIL";



export const RESEND_OTP_REQUEST="RESEND_OTP_REQUEST";
export const RESEND_OTP_SUCCESS="RESEND_OTP_SUCCESS";
export const RESEND_OTP_FAIL="RESEND_OTP_FAIL";



export const USER_LOGIN_REQUEST="USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS="USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILED="USER_LOGIN_FAILED";


export const USER_AUTHORIZATION_REQUEST="USER_AUTHORIZATION_REQUEST";
export const USER_AUTHORIZATION_SUCCESS="USER_AUTHORIZATION_SUCCESS";
export const USER_AUTHORIZATION_FAIL="USER_AUTHORIZATION_FAIL";



export const CHANGE_PASSWORD_REQUEST="CHANGE_PASSWORD_REQUEST";
export const CHANGE_PASSWORD_SUCCESS="CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILED="CHANGE_PASSWORD_FAILED";



export const USER_LOGOUT_REQUEST="USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCESS="USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_FAIL="USER_LOGOUT_FAIL";


export const userRegister=(user)=>async(dispatch)=>{
    try {
        console.log(user)
        dispatch({type:USER_REGISTER_REQUEST})
        const response=await axios.post("http://localhost:3000/register",user);
        if(response.data.success){
            console.log(response.data.success);
            dispatch({type:USER_REGISTER_SUCCESS,payload:response.data.success.user})
        }
    } catch (error) {
        console.log(error)
        dispatch({type:USER_REGISTER_FAILED,payload:error.response.data.error})
    }
}


export const verifyOtpSignIn=(otp,navigate)=>async(dispatch)=>{
    try {
        dispatch({type:VERIFY_SIGNUP_OTP_REQUEST});
        const response=await axios.post("http://localhost:3000/verifyOtpAndLogIn",{otp})
        console.log(response)
        if(response.data.success){
            dispatch({type:VERIFY_SIGNUP_OTP_SUCCESS,payload:response.data.success})
            navigate("/")
        }
    } catch (error) {
        console.log(error)
        dispatch({type:VERIFY_SIGNUP_OTP_FAIL,payload:error.response.data.error})
    }
}


export const resendOtp=(email,navigate)=>async(dispatch)=>{
    try {
        dispatch({type:RESEND_OTP_REQUEST});
        const response=await axios.post("http://localhost:3000/resendOtp",email);
        if(response.data.success){
            dispatch({type:RESEND_OTP_SUCCESS,payload:response.data.success})
            navigate("/")
        }
    } catch (error) {
        console.log(error)
        dispatch({type:RESEND_OTP_FAIL,payload:error})
    }
}


export const logInUser=(user,navigate)=>async(dispatch)=>{
    try {
        dispatch({type:USER_LOGIN_REQUEST});
        const response=await axios.post("http://localhost:3000/loginUser",user)
        if(response.data.success){
            console.log(response);
            dispatch({type:USER_LOGIN_SUCCESS,payload:response.data.login})
            navigate("/")
        }
    } catch (error) {
        console.log(error)
        dispatch({type:USER_LOGIN_FAILED,payload:error.response.data.error})
    }
}



export const userAuthorization=()=>async(dispatch)=>{
    try {
        dispatch({type:USER_AUTHORIZATION_REQUEST})
        const response=await axios.get("http://localhost:3000/verifyingUser");

        if(response.data.success){
            dispatch({type:USER_AUTHORIZATION_SUCCESS,payload:response.data.user})
        }
    } catch (error) {
        console.log(error)
        dispatch({type:USER_AUTHORIZATION_FAIL,payload:error.response.data.error})
    }
}



export const changePassword=(data)=>async(dispatch)=>{
    try {
        dispatch({type:CHANGE_PASSWORD_REQUEST});
        const response=await axios.post("http://localhost:3000/changePassword",data);
        if(response.data.success){
            dispatch({type:CHANGE_PASSWORD_SUCCESS,payload:response.data.success})
        }
    } catch (error) {
        console.log(error)
        dispatch({type:CHANGE_PASSWORD_FAILED,payload:error})
    }
}



export const logout=()=>async(dispatch)=>{
    try {
        dispatch({type:USER_LOGOUT_REQUEST});
        const response=await axios.get("http://localhost:3000/logout");
        if(response.data.success){
            dispatch({type:USER_LOGOUT_SUCCESS,payload:response.data.message})
        }
    } catch (error) {
        console.log(error);
        dispatch({type:USER_LOGOUT_FAIL,payload:error.response.data.error})
    }
}