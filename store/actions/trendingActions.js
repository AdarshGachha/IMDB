

import axios from "axios";
import {trendings,adderrors} from "../reducers/trendingReducer"

export const asyncGetTrendingMovies = () => async (dispatch, getState)=>{
    try {

        const { page } = getState().trendingReducer;

        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=5c11df2d96761d50685fa24c86690073&page=${page}?language=en-US`);


        console.log(data.results)
        dispatch(trendings(data.results));
        
    } catch (error) {
        console.log(error)
        dispatch(adderrors(error.response.data.status_message))


        
    }

}