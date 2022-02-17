import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "myLibrary",
    initialState: {
        listArt: [],
        listWrit: [],
        listVid: [],
        listAud: []
    },
    reducers: {
        setListAll: (state, action) =>{
            state.listArt = action.payload.art
            state.listWrit = action.payload.writing
            state.listVid = action.payload.video
            state.listAud = action.payload.audio
        },
        setListArt: (state, action) =>{
            state.listArt = action.payload
        },
        addListArt: (state, action) =>{
            state.listArt = [...state.listArt, action.payload]
        },
        removeListArt: (state, action) =>{
            const listArt = state.listArt
            state.listArt = listArt.filter(like => like.id !== action.payload)
        },
        setListWrit: (state, action) =>{
            state.listWrit = action.payload
        },
        addListWrit: (state, action) =>{
            state.listWrit = [...state.listWrit, action.payload]
        },
        removeListWrit: (state, action) =>{
            const listWrit = state.listWrit
            state.listWrit = listWrit.filter(like => like.id !== action.payload)
        },
        setListVid: (state, action) => {
            console.log(action.payload)
            state.listVid = action.payload
        },
        addListVid: (state, action) =>{
            state.listVid = [...state.listVid, action.payload]
        },
        removeListVid: (state, action) =>{
            const listVid = state.listVid
            state.listVid = listVid.filter(like => like.id !== action.payload)
        },
        setListAud: (state, action) => {
            state.listAud = action.payload
        },
        addListAud: (state, action) =>{
            state.listAud = [...state.listAud, action.payload]
        },
        removeListAud: (state, action) =>{
            const listAud = state.listAud
            state.listAud = listAud.filter(like => like.id !== action.payload)
        }
    }
})

const { setListAll, setListArt, addListArt, removeListArt, setListWrit, addListWrit, removeListWrit, setListVid, addListVid, removeListVid, setListAud, addListAud, removeListAud } = slice.actions

export { setListAll, setListArt, addListArt, removeListArt, setListWrit, addListWrit, removeListWrit, setListVid, addListVid, removeListVid, setListAud, addListAud, removeListAud }

export default slice.reducer