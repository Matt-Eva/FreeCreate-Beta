import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "libDisplayType",
    initialState: {
        libDisplayType: "all"
    },
    reducers: {
        setLibDisplayType: (state, action) =>{
            console.log(action.payload)
            state.libDisplayType = action.payload
        }
    }
})

const {setLibDisplayType} = slice.actions

export {setLibDisplayType}

export default slice.reducer