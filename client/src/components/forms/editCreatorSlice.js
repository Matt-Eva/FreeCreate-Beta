import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "editCreator",
    initialState: {
        editCreator: null
    },
    reducers: {
        setEditCreator: (state, action) =>{
            state.editCreator = action.payload
        }
    }
})

const { setEditCreator } = slice.actions

export { setEditCreator }

export default slice.reducer