import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "myLibrary",
    initialState: {
        libArt: [],
        libWrit: [],
        libVid: [],
        libAud: []
    },
    reducers: {
        setLibAll: (state, action) =>{
            state.libArt = action.payload.art
            state.libWrit = action.payload.writing
            state.libVid = action.payload.video
            state.libAud = action.payload.audio
        },
        setLibArt: (state, action) =>{
            state.libArt = action.payload
        },
        addLibArt: (state, action) =>{
            state.libArt = [...state.libArt, action.payload]
        },
        removeLibArt: (state, action) =>{
            const LibArt = state.libArt
            state.libArt = LibArt.filter(like => like.id !== action.payload)
        },
        setLibWrit: (state, action) =>{
            state.libWrit = action.payload
        },
        addLibWrit: (state, action) =>{
            state.libWrit = [...state.libWrit, action.payload]
        },
        removeLibWrit: (state, action) =>{
            const LibWrit = state.libWrit
            state.libWrit = LibWrit.filter(like => like.id !== action.payload)
        },
        setLibVid: (state, action) => {
            state.libVid = action.payload
        },
        addLibVid: (state, action) =>{
            state.libVid = [...state.libVid, action.payload]
        },
        removeLibVid: (state, action) =>{
            const LibVid = state.libVid
            state.libVid = LibVid.filter(like => like.id !== action.payload)
        },
        setLibAud: (state, action) => {
            state.libAud = action.payload
        },
        addLibAud: (state, action) =>{
            state.libAud = [...state.libAud, action.payload]
        },
        removeLibAud: (state, action) =>{
            const LibAud = state.libAud
            state.libAud = LibAud.filter(like => like.id !== action.payload)
        }
    }
})

const { setLibAll, setLibArt, addLibArt, removeLibArt, setLibWrit, addLibWrit, removeLibWrit, setLibVid, addLibVid, removeLibVid, setLibAud, addLibAud, removeLibAud } = slice.actions

export { setLibAll, setLibArt, addLibArt, removeLibArt, setLibWrit, addLibWrit, removeLibWrit, setLibVid, addLibVid, removeLibVid, setLibAud, addLibAud, removeLibAud }

export default slice.reducer