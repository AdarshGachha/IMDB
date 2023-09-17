
"use client";
import { asyncGetPopularMovies } from "@/store/actions/movieActions";
import { removeerrors,updatePage } from "@/store/reducers/movieReducer";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from 'next/image'
import { toast } from 'react-toastify';
// import { Stack, CircularProgress, Divider } from "@mui/material";
import CircleRating from '@/components/circleRating/CircularRate';
import Welcome from "@/components/Welcome";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";


const page = () => {
  const [active, setActive] = React.useState(1);

  const dispatch = useDispatch();
  const { movies,page,errors } = useSelector((state) => state.movieReducer);
  console.log(errors);




  

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

  // console.log(data);

  
  if (errors.length > 0) {
    errors.map((e, i) => {
        toast.error(e);
    });
    dispatch(removeerrors());
}

 

  useEffect(() => {
    dispatch(asyncGetPopularMovies());
  }, [page]);

  return (
    <div className="main flex flex-col items-center ">
      <Welcome />

      {/* <header className="text-center"><h1>Homepage</h1></header> */}


      

      <div className="movies">
      {movies &&
        movies.map((dets) => {
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
            <h3><Image src="/star.png" alt="me" width="64" height="64" />{dets.vote_average} | {dets.adult ? "18+" : "All Age"} </h3>

            <div className="rating">
            <CircleRating rating={dets.vote_average.toFixed(1) } />

            </div>
            

            </div>


            </div>
             

            

            
          );
        })}

      </div>


      {movies >= 0 ? ""  :
        <div className="flex items-center gap-8 bottom-3 pb-8">
        <IconButton
          size="sm"
          variant="outlined"
          onClick={prev}
          disabled={active === 1}
        >
          <ArrowLeftIcon strokeWidth={2} color="white" className="h-4 w-4" />
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
          <ArrowRightIcon strokeWidth={2} color="white" className="h-4 w-4" />
        </IconButton>
      </div>
            
            }
      
     
    </div>
  );
};

export default page;


