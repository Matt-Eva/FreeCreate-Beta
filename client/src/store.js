import { configureStore } from "@reduxjs/toolkit"
import userAuthModalReducer from "./state/userAuthModalSlice"
import userReducer from "./state/userSlice"
import displayTypeReducer from "./state/displayTypeSlice"
import queryDisplayReducer from "./state/queryDisplaySlice"
import editCreatorReducer from "./state/editCreatorSlice"
import creatorsReducer from "./state/creatorsSlice"
import myWritingsReducer from "./state/myWritingsSlice"
import editCreationsReducer from './state/editCreationsSlice'
import likesReducer from "./state/likesSlice"
import likedCreationsReducer from "./state/likedCreationsSlice"
import myLibraryReducer from "./state/myLibrarySlice"
import libDisplayTypeReducer from "./state/libDisplayTypeSlice"
import libItemsReducer from "./state/libItemsSlice"
import listItemsReducer from "./state/listItemsSlice"
import myListReducer from "./state/myListSlice"
import listDisplayTypeReducer from "./state/listDisplayTypeSlice"

const store = configureStore({
    reducer: {
        userAuthModal: userAuthModalReducer, 
        user: userReducer,
        displayType: displayTypeReducer,
        queryDisplay: queryDisplayReducer,
        editCreator: editCreatorReducer,
        creators: creatorsReducer,
        myWritings: myWritingsReducer,
        editCreations: editCreationsReducer,
        likes: likesReducer,
        likedCreations: likedCreationsReducer,
        myLibrary: myLibraryReducer,
        libDisplayType: libDisplayTypeReducer,
        libItems: libItemsReducer,
        listItems: listItemsReducer,
        myList: myListReducer,
        listDisplayType: listDisplayTypeReducer
    }
})

export default store