import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "creators",
    initialState: {
        creators: []
    },
    reducers: {
        setCreators: (state, action) =>{
            state.creators = action.payload
        },
        updateCreators: (state, action) =>{
            state.creators = state.creators.map(creator => {
                if (creator.id === action.payload.id){
                    return action.payload
                } else{
                    return creator
                }
            })
        },
        removeCreator: (state, action) =>{
            state.creators = state.creators.filter(creator => creator.id !== action.payload.id)
        }
    }
})

const { setCreators, removeCreator, updateCreators } = slice.actions

export {  setCreators, removeCreator, updateCreators }

export default slice.reducer