import { configureStore } from "@reduxjs/toolkit"
import userAuthModalReducer from "./components/userauth/userAuthModalSlice"
import userReducer from "./components/userauth/userSlice"
import displayTypeReducer from "./components/display/displayTypeSlice"
import queryDisplayReducer from "./components/display/queryDisplaySlice"
import editCreatorReducer from "./components/forms/editCreatorSlice"
import creatorsReducer from "./components/userauth/creatorsSlice"

const store = configureStore({
    reducer: {
        userAuthModal: userAuthModalReducer, 
        user: userReducer,
        displayType: displayTypeReducer,
        queryDisplay: queryDisplayReducer,
        editCreator: editCreatorReducer,
        creators: creatorsReducer
    }
})

export default store