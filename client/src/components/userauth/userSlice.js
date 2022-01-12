import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) =>{
            state.user = action.payload
        },
        removeUser: state =>{
            state.user = null
        }
    }
})

const { setUser, removeUser } = slice.actions

export { setUser, removeUser }

export default slice.reducer