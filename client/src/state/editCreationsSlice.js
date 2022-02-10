import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "editCreations",
    initialState: {
        editWriting: null,
        editAudio: null,
        editArt: null,
        editVideo: null,
    },
    reducers: {
        setEditWriting: (state, action) =>{
            state.editWriting = action.payload
        }, setEditArt: (state, action) =>{
            state.editArt = action.payload
        }, setEditAudio: (state, action) =>{
            state.editAudio = action.payload
        }, setEditVideo: (state, action) =>{
            state.editVideo = action.payload
        }, 
    }
})

const { setEditWriting, setEditAudio, setEditArt, setEditVideo } = slice.actions

export {  setEditWriting, setEditAudio, setEditArt, setEditVideo }

export default slice.reducer