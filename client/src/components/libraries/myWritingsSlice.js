import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "myWritings",
    initialState: {
         myWritings: []
    },
    reducers: {
        setMyWritings: (state, action) =>{
            state.myWritings = action.payload
        },
        updateMyWritings: (state, action) =>{
            state.myWritings = state.myWritings.map(writing => {
                if (writing.id === action.payload.id){
                    return action.payload
                } else{
                    return writing
                }
            })
        },
        addWriting: (state, action) =>{
            state.myWritings = [...(state.myWritings), action.payload]
        },
        removeWriting: (state, action) =>{
            state.myWritings = state.myWritings.filter(writing => writing.id !== action.payload.id)
        }
    }
})

const { setMyWriting, removeWriting, updateMyWriting, addWriting } = slice.actions

export {  setMyWriting, removeWriting, updateMyWriting, addWriting }

export default slice.reducer