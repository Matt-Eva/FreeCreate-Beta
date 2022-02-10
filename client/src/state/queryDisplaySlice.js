import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "queryDisplay",
    initialState: {
        queryDisplayWriting: [],
        queryDisplayAudio: [],
        queryDisplayArt: [],
        queryDisplayVideo: [],
    },
    reducers: {
        setQueryDisplayWriting: (state, action) =>{
            state.queryDisplayWriting = action.payload
        },
        setQueryDisplayAudio: (state, action) =>{
            state.queryDisplayAudio = action.payload
        },
        setQueryDisplayArt: (state, action) =>{
            state.queryDisplayArt = action.payload
        },
        setQueryDisplayVideo: (state, action) =>{
            state.queryDisplayVideo = action.payload
        }
    }
})

const {setQueryDisplayWriting,setQueryDisplayAudio,setQueryDisplayArt,setQueryDisplayVideo,setQueryDisplayAll } = slice.actions

export { setQueryDisplayWriting, setQueryDisplayAudio, setQueryDisplayArt, setQueryDisplayVideo, setQueryDisplayAll }

export default slice.reducer