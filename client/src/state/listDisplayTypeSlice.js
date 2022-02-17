import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "listDisplayType",
    initialState: {
        listDisplayType: "all"
    },
    reducers: {
        setListDisplayType: (state, action) =>{
            state.listDisplayType = action.payload
        }
    }
})

const {setListDisplayType} = slice.actions

export {setListDisplayType}

export default slice.reducer