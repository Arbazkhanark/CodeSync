import {toast} from "sonner"
import { USER_AUTHORIZATION_FAIL, USER_AUTHORIZATION_REQUEST, USER_AUTHORIZATION_SUCCESS, USER_LOGIN_FAILED, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_REGISTER_FAILED, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, VERIFY_SIGNUP_OTP_FAIL, VERIFY_SIGNUP_OTP_REQUEST, VERIFY_SIGNUP_OTP_SUCCESS } from "../actions/userAction";

const initialState={
    user:null,
    isLoading:false,
    success:"",
    error:""
}

export const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case "Hello":
            console.log("Working")
            return 23
        case USER_REGISTER_REQUEST:
            return {...state,isLoading:true}
        case USER_REGISTER_SUCCESS:
            toast.success("Registered Successfully")
            return {...state,user:action.payload}
        case USER_REGISTER_FAILED:
            toast.error(action.payload)
            return {...state,error:action.payload}

        case VERIFY_SIGNUP_OTP_REQUEST:
            return {...state,isLoading:true}
        case VERIFY_SIGNUP_OTP_SUCCESS:
            toast.success("Account Verified");
            return {...state,user:action.payload};
        case VERIFY_SIGNUP_OTP_FAIL:
            toast.error(action.payload);
            return {...state,error:action.payload};

        case USER_LOGIN_REQUEST:
            return {...state,isLoading:true};
        case USER_LOGIN_SUCCESS:
            toast.success("LogIn Successfully")
            return {...state,isLoading:false,user:action.payload}
        case USER_LOGIN_FAILED:
            toast.error(action.payload);
            return {...state,isLoading:false,error:action.payload}

        case USER_AUTHORIZATION_REQUEST:
            return {...state,isLoading:true};
        case USER_AUTHORIZATION_SUCCESS:
            return {...state,user:action.payload,isLoading:false};
        case USER_AUTHORIZATION_FAIL:
            toast.error(action.payload)
            return {...state,isLoading:false}

        case USER_LOGOUT_REQUEST:
            return {...state,isLoading:true};
        case USER_LOGOUT_SUCCESS:
            toast.success(action.payload);
            return {...state,user:null,isLoading:false}
        case USER_LOGOUT_FAIL:
            toast.error(action.payload);
            return {...state,isLoading:false,error:action.payload}
        default: return state;
    }
}