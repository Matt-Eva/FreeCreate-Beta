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
        addCreator: (state, action) =>{
            state.creators = [...(state.creators), action.payload]
        },
        removeCreator: (state, action) =>{
            state.creators = state.creators.filter(creator => creator.id !== action.payload.id)
        }
    }
})

const { setCreators, removeCreator, updateCreators, addCreator } = slice.actions

export {  setCreators, removeCreator, updateCreators, addCreator }

export default slice.reducer