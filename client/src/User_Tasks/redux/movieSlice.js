
import { createSlice } from "@reduxjs/toolkit";

export const movieSlice=createSlice({
   name : "movie",

   initialState : {
      data :[]
    
   },

   reducers : {
      movies : (state , action)=>{
         state.data = action.payload
      },

      
}

});

export const {movies} = movieSlice.actions;

export default movieSlice.reducer;