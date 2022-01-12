import { configureStore } from "@reduxjs/toolkit"
import userAuthModalReducer from "./components/userauth/userAuthModalSlice"
import userReducer from "./components/userauth/userSlice"

const store = configureStore({
    reducer: {userAuthModal: userAuthModalReducer, user: userReducer}
})

export default store