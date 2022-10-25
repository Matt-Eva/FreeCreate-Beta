import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "loggedOutState",
    initialState: {
       loggedOutState: false
    },
    reducers: {
        setLoggedOutState: (state, action) =>{
            state.loggedOutState = action.payload
        }
    }
})

const {setLoggedOutState} = slice.actions

export {setLoggedOutState}

export default slice.reducer