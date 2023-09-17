"use client";
import { asyncGetTrendingMovies } from "@/store/actions/trendingActions";
import { removeerrors, updatePage } from "@/store/reducers/trendingReducer";
import styles from "./Styles/Main.module.css"
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import Welcome from "@/components/Welcome";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import ReactPaginate from "react-paginate";
import CircleRating from "@/components/circleRating/CircularRate";

const page = () => {
  const [active, setActive] = React.useState(1);

  const next = () => {
    if (active === 500) return;

    setActive(active + 1);
    dispatch(updatePage(1));
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
    dispatch(updatePage(-1));
  };

  const dispatch = useDispatch();
  const { trendingmovies, page, errors } = useSelector(
    (state) => state.trendingReducer
  );
  console.log(errors);

  // console.log(data);

  if (errors.length > 0) {
    errors.map((e, i) => {
      toast.error(e);
    });
    dispatch(removeerrors());
  }

  useEffect(() => {
    dispatch(asyncGetTrendingMovies());
  }, [page]);

  const togglerDiv = useRef(null)
  const togglerText = useRef(null)

  
  let flag = 0
  const toggleHandler = () =>{
    if (flag === 0) {
      flag = 1
      togglerDiv.current.style.width = "9vmax"
      togglerDiv.current.style.left = "44%"
      togglerText.current.textContent = "This Week"
    }else{
      flag = 0
      togglerDiv.current.style.width = "8vmax"
      togglerDiv.current.style.left = "2%"
      togglerText.current.textContent = "Today"
    }
  }

  return (
    <div className="main flex flex-col items-center">
      <Welcome />

      {/* <header className="text-center"><h1>Homepage</h1></header> */}
      <div className="w-screen h-[10vmax] px-4 flex items-center">
      <div className={`${styles.trending} p-2`}>
              <h2>Trending</h2>
              <div onClick={toggleHandler} className={`${styles.toggle}`}>
                <div ref={togglerDiv} className={styles.toggler}>
                  <h3 ref={togglerText}>Today</h3>
                </div>
                <p className={styles.today}>Today</p>
                <p className={styles.this}>This Week</p>
              </div>
            </div>
      </div>
     
      <div className="movies">
        {trendingmovies &&
          trendingmovies.map((dets) => {
            return (
              <div key={dets.id} className="allimages">
                <div key={dets.id} className="Single-Image">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${dets.poster_path} `}
                    alt=""
                  />
                </div>
                <div className="info">
                  <Link href={`/details/${dets.id}`}>{dets.title}</Link>
                  <h3>
                    <Image src="/star.png" alt="me" width="64" height="64" />
                    {dets.vote_average.toFixed(1)} |{" "}
                    {dets.adult ? "18+" : "All Age"}{" "}
                  </h3>
                  <div className="rating">
            <CircleRating rating={dets.vote_average.toFixed(1) } />

            </div>
                </div>
              </div>
            );
          })}
      </div>

      {trendingmovies >= 0 ? (
        ""
      ) : (
        <>
          <div className="flex items-center gap-8 bottom-3 pb-8">
            <IconButton
              size="sm"
              variant="outlined"
              onClick={prev}
              disabled={active === 1}
            >
              <ArrowLeftIcon
                strokeWidth={2}
                color="white"
                className="h-4 w-4"
              />
            </IconButton>
            <Typography color="gray" className="font-normal">
              Page <strong className="text-gray-200">{active}</strong> of{" "}
              <strong className="text-gray-200">500</strong>
            </Typography>
            <IconButton
              size="sm"
              variant="outlined"
              onClick={next}
              disabled={active === 500}
            >
              <ArrowRightIcon
                strokeWidth={2}
                color="white"
                className="h-4 w-4"
              />
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
