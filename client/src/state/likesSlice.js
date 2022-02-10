import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "likes",
    initialState: {
        art_likes: [],
        writ_likes: [],
        vid_likes: [],
        aud_likes: []
    },
    reducers: {
        setArtLikes: (state, action) =>{
            state.art_likes = action.payload
        },
        addArtLike: (state, action) =>{
            state.art_likes = [...state.art_likes, action.payload]
        },
        removeArtLike: (state, action) =>{
            const artLikes = state.art_likes
            state.art_likes = artLikes.filter(like => like.id !== action.payload)
        },
        setWritLikes: (state, action) =>{
            state.writ_likes = action.payload
        },
        addWritLike: (state, action) =>{
            state.writ_likes = [...state.writ_likes, action.payload]
        },
        removeWritLike: (state, action) =>{
            const writLikes = state.writ_likes
            state.writ_likes = writLikes.filter(like => like.id !== action.payload)
        },
        setVidLikes: (state, action) => {
            state.vid_likes = action.payload
        },
        addVidLike: (state, action) =>{
            state.vid_likes = [...state.vid_likes, action.payload]
        },
        removeVidLike: (state, action) =>{
            const vidLikes = state.vid_likes
            state.vid_likes = vidLikes.filter(like => like.id !== action.payload)
        },
        setAudLikes: (state, action) => {
            state.aud_likes = action.payload
        },
        addAudLike: (state, action) =>{
            state.aud_likes = [...state.aud_likes, action.payload]
        },
        removeAudLike: (state, action) =>{
            const audLikes = state.aud_likes
            state.aud_likes = audLikes.filter(like => like.id !== action.payload)
        }
    }
})

const { setArtLikes, addArtLike, removeArtLike, setWritLikes, addWritLike, removeWritLike, setVidLikes, addVidLike, removeVidLike, setAudLikes, addAudLike, removeAudLike } = slice.actions

export { setArtLikes, addArtLike, removeArtLike, setWritLikes, addWritLike, removeWritLike, setVidLikes, addVidLike, removeVidLike, setAudLikes, addAudLike, removeAudLike }

export default slice.reducer