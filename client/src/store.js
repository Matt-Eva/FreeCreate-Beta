import { configureStore } from "@reduxjs/toolkit"
import userAuthModalReducer from "./components/userauth/userAuthModalSlice"
import userReducer from "./components/userauth/userSlice"
import displayTypeReducer from "./components/display/displayTypeSlice"
import queryDisplayReducer from "./components/display/queryDisplaySlice"
import editCreatorReducer from "./components/forms/editCreatorSlice"
import creatorsReducer from "./components/userauth/creatorsSlice"
import myWritingsReducer from "./components/libraries/myWritingsSlice"
import editCreationsReducer from './components/forms/editCreationsSlice'
import likesReducer from "./components/libraries/likesSlice"
import likedCreationsReducer from "./components/libraries/likedCreationsSlice"

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
        likedCreations: likedCreationsReducer
    }
})

export default store