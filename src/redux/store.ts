import  userReducer  from "@/redux/slices/getUsers";
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import responsabilitiesReducer from "@/redux/slices/getResponsabilities";
import productsReducer from "@/redux/slices/getProducts";
import productsTagsReducer from "@/redux/slices/getProductsTags"


export const rootReducer = combineReducers({
    user: userReducer,
    responsabilities: responsabilitiesReducer,
    products: productsReducer,
    productsTags: productsTagsReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;