import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    trendingmovies:[],
    errors:[],
    page:1
}




export const trendingReducer = createSlice({

    name : "trending",
    initialState,
    reducers:{
       
        trendings:(state , action)=>{
            state.trendingmovies = action.payload

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

export const {trendings,adderrors,removeerrors,updatePage} = trendingReducer.actions;

export default trendingReducer.reducer;

