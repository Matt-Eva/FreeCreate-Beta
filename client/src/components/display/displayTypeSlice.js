import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "displayTypel",
    initialState: {
        displayType: "all"
    },
    reducers: {
        setDisplayTypeWriting: state =>{
            state.displayType = "writing"
        },
        setDisplayTypeAudio: state =>{
            state.displayType = "audio"
        },
        setDisplayTypeArt: state =>{
            state.displayType = "art"
        },
        setDisplayTypeVideo: state =>{
            state.displayType = "video"
        },
        setDisplayTypeAll: state =>{
            state.displayType = "all"
        }
    }
})

const { setDisplayTypeWriting, setDisplayTypeAudio, setDisplayTypeArt, setDisplayTypeVideo, setDisplayTypeAll } = slice.actions

export { setDisplayTypeWriting, setDisplayTypeAudio, setDisplayTypeArt, setDisplayTypeVideo, setDisplayTypeAll }

export default slice.reducer