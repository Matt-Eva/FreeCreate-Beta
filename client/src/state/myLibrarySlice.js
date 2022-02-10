import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "myLibrary",
    initialState: {
        lib_art: [],
        lib_writ: [],
        lib_vid: [],
        lib_aud: []
    },
    reducers: {
        setLibArt: (state, action) =>{
            state.lib_art = action.payload
        },
        addLibArt: (state, action) =>{
            state.lib_art = [...state.lib_art, action.payload]
        },
        removeLibArt: (state, action) =>{
            const LibArt = state.lib_art
            state.lib_art = LibArt.filter(like => like.id !== action.payload)
        },
        setLibWrit: (state, action) =>{
            state.lib_writ = action.payload
        },
        addLibWrit: (state, action) =>{
            state.lib_writ = [...state.lib_writ, action.payload]
        },
        removeLibWrit: (state, action) =>{
            const LibWrit = state.lib_writ
            state.lib_writ = LibWrit.filter(like => like.id !== action.payload)
        },
        setLibVid: (state, action) => {
            state.lib_vid = action.payload
        },
        addLibVid: (state, action) =>{
            state.lib_vid = [...state.lib_vid, action.payload]
        },
        removeLibVid: (state, action) =>{
            const LibVid = state.lib_vid
            state.lib_vid = LibVid.filter(like => like.id !== action.payload)
        },
        setLibAud: (state, action) => {
            state.lib_aud = action.payload
        },
        addLibAud: (state, action) =>{
            state.lib_aud = [...state.lib_aud, action.payload]
        },
        removeLibAud: (state, action) =>{
            const LibAud = state.lib_aud
            state.lib_aud = LibAud.filter(like => like.id !== action.payload)
        }
    }
})

const { setLibArt, addLibArt, removeLibArt, setLibWrit, addLibWrit, removeLibWrit, setLibVid, addLibVid, removeLibVid, setLibAud, addLibAud, removeLibAud } = slice.actions

export { setLibArt, addLibArt, removeLibArt, setLibWrit, addLibWrit, removeLibWrit, setLibVid, addLibVid, removeLibVid, setLibAud, addLibAud, removeLibAud }

export default slice.reducer