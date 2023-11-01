import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"
import questionReducer from "./question/questionSlice";
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'; // Import Redux Thunk middleware


import { setupListeners } from "@reduxjs/toolkit/dist/query";



export const store = configureStore({
    reducer:{
      userReducer,
      questionReducer
    },
    middleware:[logger,thunkMiddleware]
});
setupListeners(store.dispatch);
