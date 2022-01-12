import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "LoginAndSignupModalControl",
    initialState:{
        login: false,
        signup: false,
    },
    reducers:{
        showLogin: state =>{
            state.login = true,
            state.signup = false
        },
        showSignup: state =>{
            state.login = false,
            state.signup = true
        },
        hideLoginModals: state =>{
            state.login = false,
            state.signup = false
        }
    }
})