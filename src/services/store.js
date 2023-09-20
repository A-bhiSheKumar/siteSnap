//configureStore: This function is provided by @reduxjs/toolkit and is used to create a Redux store.
// It simplifies the setup process and provides some sensible defaults for configuring your store.
import { configureStore } from "@reduxjs/toolkit";

import {articleApi} from "./article";


//store: This is the Redux store that you are creating. 
//The store is responsible for holding the entire state tree of your application.
// You can think of it as a centralized place where your application's data is stored.
export const store = configureStore({
    //a reducer is a pure function that specifies how the application's state should 
    //change in response to dispatched actions. It takes the current state and an action as input, 
    //and it returns a new state that reflects the desired changes. Reducers are responsible for 
    //updating specific parts of the state tree based on the action type and payload.
    reducer:{
        [articleApi.reducerPath]: articleApi.reducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)
});




//Summary
//In summary, this code sets up a Redux store that includes a reducer for handling articles or 
//API-related data and middleware to handle asynchronous actions efficiently. 
//The store variable represents the Redux store, which you can use throughout your application to manage
// and access the application's state.