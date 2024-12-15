import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    //when no user, set initialState to null
    initialState:null,
    reducers:{
        //add the user in the store, after sign in
        addUser:(state,action)=>{
            //this will setup the initial state with the payload value
            return action.payload;
        },

        //remove the user from the store, after sign out
        removeUser:(state, action)=>{
            //this will set the initialState value to null
            return null;
        }
    },
});

export const {addUser, removeUser}=userSlice.actions;

export default userSlice.reducer;