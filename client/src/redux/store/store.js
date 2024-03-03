import {configureStore} from "@reduxjs/toolkit"
import { userReducer } from "../reducers/userReducer"

export const myStore=configureStore({
    reducer:{
        users:userReducer
    }
})