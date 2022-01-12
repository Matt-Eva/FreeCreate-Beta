import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "userAuthModal",
    initialState:{
        loginModal: false,
        signupModal: false,
    },
    reducers:{
        showLogin: state =>{
            state.loginModal = true
        },
        showSignup: state =>{
            state.signupModal = true
        },
        hideLogin: state => {
            state.loginModal = false
        },
        hideSignup: state =>{
            state.signupModal = false
        }
    }
})

const { showLogin, showSignup, hideLogin, hideSignup } = slice.actions

export { showLogin, showSignup, hideLogin, hideSignup }

export default slice.reducer

