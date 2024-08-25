
import { createSlice } from "@reduxjs/toolkit";

export const authSlice=createSlice({
   name : "auth",
   initialState : {
      user : null,
      loading : false,
      error : false
   },

   reducers : {
      signInStart : (state)=>{
         state.user = null,
         state.loading = true,
         state.error = false
      },

      signInSuccess : (state , action)=>{
         state.user = action.payload, 
         state.loading = true,
         state.error = false
       },
       signInError : (state , action)=>{
         state.user = null,
         state.loading = false,
         state.error = action.payload;
      },
      signOut : (state , action)=>{
         state.user = null,
         state.loading =false,
         state.error = false
   },
   
}

});

export const {signInStart, signInSuccess , signInError , signOut} = authSlice.actions;

export default authSlice.reducer;