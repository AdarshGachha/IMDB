"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./style.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  savedpopularmovies,
  removeerrors,
} from "@/store/reducers/movieReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import Welcome from "@/components/Welcome";

const searchResultPage = () => {
  const dispatch = useDispatch();
  const { movies, errors } = useSelector((state) => state.movieReducer);

  const router = useRouter();
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const searchparams = useSearchParams();
  const search = searchparams.get("query");
  const pageno = searchparams.get("page");

  const [SearchResults, setSearchResults] = useState([]);
  let renderData = (
    <div className="h-screen w-screen flex items-center justify-center">
      <p>loading...</p>
    </div>
  );
  if (SearchResults.length > 0) {
    console.log(SearchResults);
    renderData = SearchResults.map((m, i) => {
      return (
        <div key={i}>
          <Card className="w-full max-w-[50rem] flex-row">
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 w-2/5 shrink-0 rounded-r-none"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${m.poster_path}?api_key=850fa288f19f8f6cc5ac671000c3b31c`}
                alt="card-image"
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.target.src = "./defaultimg.jpg";
                  event.onerrors = null;
                }}
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h6" color="gray" className="mb-4 uppercase">
                <Link
                  className={`decoration-transparent text-gray-800`}
                  href={`/details/${m.id}`}
                >
                  <h1>{m.original_title || m.original_name}</h1>
                </Link>
              </Typography>
              <Typography variant="h4" color="blue-gray" className="mb-2">
                {m.release_date}
              </Typography>
              <div className="w-full h-32 overflow-hidden text-ellipsis">
              <Typography color="gray" className="mb-8 font-normal ">
                {m.overview}
              </Typography>

              </div>
              
              <Link href={`/details/${m.id}`} className="inline-block">
                <Button variant="text" className="flex items-center gap-2">
                  Learn More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Button>
              </Link>
            </CardBody>
          </Card>
        </div>
      );
    });
  }

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=223667d1239871fc4b6eeef8d0d6def8&query=${search}&page=${page}`
      );
      setSearchResults(data.results);
      setPageCount(data.total_pages);
      dispatch(savedpopularmovies(data.results));
      console.log(data);
    } catch (errors) {
      console.log(errors);
    }
  };

  const handlePageClick = (e) => {
    console.log(e);
    setPage(e.selected + 1);
  };

  useEffect(() => {
    fetchData();
    // window.scrollTo(0, 0);

    if (errors.length > 0) {
      errors.map((e, i) => {
        toast.errors(e);
      });
      dispatch(removeerrors());
    }
  }, [page, search]);

  return (
    <div className={styles.container}>
      <Welcome />
      <div className={styles.cardContainer}>{renderData}</div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next ▶"
        onPageChange={handlePageClick}
        onClick={handlePageClick}
        pageCount={pageCount}
        previousLabel="◀ Previous"
        renderOnZeroPageCount={null}
        initialPage={0}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        activeClassName={styles.active}
        className={styles.paginate}
        pageClassName={styles.pagestyle}
        pageLinkClassName={styles.pagestyleset}
        previousClassName={styles.pagestyle}
        previousLinkClassName={styles.pagestyleset}
        nextClassName={styles.pagestyle}
        nextLinkClassName={styles.pagestyleset}
        breakLinkClassName={styles.brlb}
      />
    </div>
  );
};

export default searchResultPage;
