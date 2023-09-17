"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {savedpopularmovies} from "@/store/reducers/movieReducer" 
const index = () => {
  const dispatch = useDispatch();

  const [slug, setSlug] = useState("");
  const router = useRouter();
  
  const searchHandler = (e) => {
    e.preventDefault()
      router.push(`/searchlist?query=${slug}`)
      setSlug("")
    
  };

  
  return (
    <div className={styles.frm}>
      <form onSubmit={searchHandler}>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          type="text"
          placeholder="Search for movie, tv show....."
        />
        <button>search</button>
      </form>
    </div>
  );
};

export default index;

// https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=YOUR_API_KEY
