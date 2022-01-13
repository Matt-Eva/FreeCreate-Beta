import { configureStore } from "@reduxjs/toolkit"
import userAuthModalReducer from "./components/userauth/userAuthModalSlice"
import userReducer from "./components/userauth/userSlice"
import displayTypeReducer from "./components/display/displayTypeSlice"
import queryDisplayReducer from "./components/display/queryDisplaySlice"

const store = configureStore({
    reducer: {
        userAuthModal: userAuthModalReducer, 
        user: userReducer,
        displayType: displayTypeReducer,
        queryDisplay: queryDisplayReducer
    }
})

export default store