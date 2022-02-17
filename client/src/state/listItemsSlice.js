import {createSlice} from "@reduxjs/toolkit"

const slice = createSlice({
    name: "listItems",
    initialState: {
        writListItems: [],
        audListItems: [],
        artListItems: [],
        vidListItems: []
    },
    reducers: {
        setWritListItems: (state, action) =>{
            state.writListItems = action.payload
        },
        addWritListItem: (state, action) =>{
            state.writListItems = [...state.writListItems, action.payload]
        },
        removeWritListItem: (state, action) =>{
            const ListItems = state.writListItems
            state.writListItems= ListItems.filter(item => item.id !== action.payload)
        },
        setAudListItems: (state, action) =>{
            state.audListItems = action.payload
        },
        addAudListItem: (state, action) =>{
            state.audListItems = [...state.audListItems, action.payload]
        },
        removeAudListItem: (state, action) =>{
            const ListItems = state.audListItems
            state.audListItems= ListItems.filter(item => item.id !== action.payload)
        }, 
        setArtListItems: (state, action) =>{
            state.artListItems = action.payload
        },
        addArtListItem: (state, action) =>{
            state.artListItems = [...state.artListItems, action.payload]
        },
        removeArtListItem: (state, action) =>{
            const ListItems = state.artListItems
            state.artListItems= ListItems.filter(item => item.id !== action.payload)
        },
        setVidListItems: (state, action) =>{
            state.vidListItems = action.payload
        },
        addVidListItem: (state, action) =>{
            state.vidListItems = [...state.vidListItems, action.payload]
        },
        removeVidListItem: (state, action) =>{
            const ListItems = state.vidListItems
            state.vidListItems= ListItems.filter(item => item.id !== action.payload)
        }
    }
})

const { setArtListItems, addArtListItem, removeArtListItem, setWritListItems, addWritListItem, removeWritListItem, setVidListItems, addVidListItem, removeVidListItem, setAudListItems, addAudListItem, removeAudListItem } = slice.actions

export { setArtListItems, addArtListItem, removeArtListItem, setWritListItems, addWritListItem, removeWritListItem, setVidListItems, addVidListItem, removeVidListItem, setAudListItems, addAudListItem, removeAudListItem }

export default slice.reducer