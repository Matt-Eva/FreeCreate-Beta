import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "libDisplayType",
    initialState: {
        libDisplayType: "all"
    },
    reducers: {
        setLibDisplayType: (state, action) =>{
            state.libDisplayType = action.payload
        }
    }
})

const {setLibDisplayType} = slice.actions

export {setLibDisplayType}

export default slice.reducer