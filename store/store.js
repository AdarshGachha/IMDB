import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieReducer";
import trendingReducer from "./reducers/trendingReducer";

export const store = configureStore({
  reducer: { movieReducer, trendingReducer },
});
