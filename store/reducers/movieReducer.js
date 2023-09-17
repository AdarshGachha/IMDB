import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    movies:[],
    errors:[],
    page:1
}



export const movieReducer = createSlice({

    name : "tmdb",
    initialState,
    reducers:{
        savedpopularmovies:(state,action)=>{
            state.movies = action.payload;
        },
        adderrors : (state,action)=>{

            state.errors.push(action.payload)

        },
        removeerrors : (state,action)=>{

            state.errors = []

        },
        updatePage:(state,action)=>{
            state.page += action.payload

        }
    
    }

});

export const {savedpopularmovies,adderrors,removeerrors,updatePage} = movieReducer.actions;

export default movieReducer.reducer;

