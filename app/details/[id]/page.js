"use client"
import axios from 'axios';
import { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from "next/navigation"; // useparam import 1st method or write params in parameter is 2nd method


const page = () => {
    const [Movie, setMovie] = useState(null);
    const {id} = useParams();





    const GetDetails =async ()=>{
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=5c11df2d96761d50685fa24c86690073`)
            
            // console.log(data)
            setMovie(data)

        } catch (error) {
            console.log(error)
            
        }

    }

    useEffect(()=>{
    if(!Movie) GetDetails();


    },[id])

    let MovieDetails = "Loading...";


    if (Movie) {
        MovieDetails = (

        <div style={{backgroundImage:`url(https://image.tmdb.org/t/p/original${Movie.backdrop_path} )`}} className='details-main'>

            <div className="overlay1"></div>
            <div className="detail-card">
            <div className="detail-card-left">
                <div className="title"><h1>{Movie.title}</h1></div>
                <div className="genres">{Movie.genres.map((gen)=>{ // using ,map because genres have objects inside the array array
                    return <h3 key={gen.id}>{gen.name},</h3>
                })}</div>
                <button>Watch trailer</button>
                <h3>In Theaters</h3>
                <h2 className='release-date'>{Movie.release_date.split('-')[0]}</h2>
                <p><b style={{letterSpacing:"2px"}}>Overview</b> - {Movie.overview}</p>
            </div>
            <div className="detail-card-right">
        
                <div className="poster">
                    <img src={`https://image.tmdb.org/t/p/w500${Movie.poster_path} `} alt="" />
                </div>
            </div>
        </div>

</div>

        );
    }


  return (
    <>
        <div className="details">
            {MovieDetails}



        </div>
   
    </>
    
  )
}

export default page