import { configureStore } from "@reduxjs/toolkit"
import userAuthModalReducer from "./components/userauth/userAuthModalSlice"

const store = configureStore({
    reducer: {userAuthModal: userAuthModalReducer}
})

export default store