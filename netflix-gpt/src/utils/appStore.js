import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";

const appStore=configureStore({
    reducer:{
        //sliceName:reducerName
        user:userSliceReducer
    }
});

export default appStore;