import  axios  from "axios";
import { adderrors,savedpopularmovies } from "../reducers/movieReducer";

export const asyncGetPopularMovies = () => async (dispatch, getState) => {
  try {

    const { page } = getState().movieReducer;
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=5c11df2d96761d50685fa24c86690073&page=${page}`
    );
    dispatch(savedpopularmovies(data.results));
  } catch (error) {
    console.log(error)
    // dispatch(adderrors(error.response.data.status_message))
  }
};

