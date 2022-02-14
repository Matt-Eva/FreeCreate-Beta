import {createSlice} from "@reduxjs/toolkit"

const slice = createSlice({
    name: "libItems",
    initialState: {
        writLibItems: [],
        audLibItems: [],
        artLibItems: [],
        vidLibItems: []
    },
    reducers: {
        setWritLibItems: (state, action) =>{
            state.writLibItems = action.payload
        },
        addWritLibItem: (state, action) =>{
            state.writLibItems = [...state.writLibItems, action.payload]
        },
        removeWritLibItem: (state, action) =>{
            const libItems = state.writLibItems
            state.writLibItems= libItems.filter(item => item.id !== action.payload)
        },
        setAudLibItems: (state, action) =>{
            state.audLibItems = action.payload
        },
        addAudLibItem: (state, action) =>{
            state.audLibItems = [...state.audLibItems, action.payload]
        },
        removeAudLibItem: (state, action) =>{
            const libItems = state.audLibItems
            state.audLibItems= libItems.filter(item => item.id !== action.payload)
        }, 
        setArtLibItems: (state, action) =>{
            state.artLibItems = action.payload
        },
        addArtLibItem: (state, action) =>{
            state.artLibItems = [...state.artLibItems, action.payload]
        },
        removeArtLibItem: (state, action) =>{
            const libItems = state.artLibItems
            state.artLibItems= libItems.filter(item => item.id !== action.payload)
        },
        setVidLibItems: (state, action) =>{
            state.vidLibItems = action.payload
        },
        addVidLibItem: (state, action) =>{
            state.vidLibItems = [...state.vidLibItems, action.payload]
        },
        removeVidLibItem: (state, action) =>{
            const libItems = state.vidLibItems
            state.vidLibItems= libItems.filter(item => item.id !== action.payload)
        }
    }
})

const { setArtLibItems, addArtLibItem, removeArtLibItem, setWritLibItems, addWritLibItem, removeWritLibItem, setVidLibItems, addVidLibItem, removeVidLibItem, setAudLibItems, addAudLibItem, removeAudLibItem } = slice.actions

export { setArtLibItems, addArtLibItem, removeArtLibItem, setWritLibItems, addWritLibItem, removeWritLibItem, setVidLibItems, addVidLibItem, removeVidLibItem, setAudLibItems, addAudLibItem, removeAudLibItem }

export default slice.reducer