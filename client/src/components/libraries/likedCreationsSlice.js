import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "likes",
    initialState: {
        liked_art: [],
        liked_writ: [],
        liked_vid: [],
        liked_aud: []
    },
    reducers: {
        setLikedArt: (state, action) =>{
            state.liked_art = action.payload
        },
        addLikedArt: (state, action) =>{
            state.liked_art = [...state.liked_art, action.payload]
        },
        removeLikedArt: (state, action) =>{
            const likedArt = state.liked_art
            state.liked_art = likedArt.filter(like => like.id !== action.payload)
        },
        setLikedWrit: (state, action) =>{
            state.liked_writ = action.payload
        },
        addLikedWrit: (state, action) =>{
            state.liked_writ = [...state.liked_writ, action.payload]
        },
        removeLikedWrit: (state, action) =>{
            const LikedWrit = state.liked_writ
            state.liked_writ = LikedWrit.filter(like => like.id !== action.payload)
        },
        setLikedVid: (state, action) => {
            state.liked_vid = action.payload
        },
        addLikedVid: (state, action) =>{
            state.liked_vid = [...state.liked_vid, action.payload]
        },
        removeLikedVid: (state, action) =>{
            const likedVid = state.liked_vid
            state.liked_vid = likedVid.filter(like => like.id !== action.payload)
        },
        setLikedAud: (state, action) => {
            state.liked_aud = action.payload
        },
        addLikedAud: (state, action) =>{
            state.liked_aud = [...state.liked_aud, action.payload]
        },
        removeLikedAud: (state, action) =>{
            const LikedAud = state.liked_aud
            state.liked_aud = LikedAud.filter(like => like.id !== action.payload)
        }
    }
})

const { setLikedArt, addLikedArt, removeLikedArt, setLikedWrit, addLikedWrit, removeLikedWrit, setLikedVid, addLikedVid, removeLikedVid, setLikedAud, addLikedAud, removeLikedAud } = slice.actions

export { setLikedArt, addLikedArt, removeLikedArt, setLikedWrit, addLikedWrit, removeLikedWrit, setLikedVid, addLikedVid, removeLikedVid, setLikedAud, addLikedAud, removeLikedAud }

export default slice.reducer