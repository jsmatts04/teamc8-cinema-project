import { Outlet, useLocation, useParams } from "react-router-dom";
import YoutubeEmbed from "./YoutubeEmbed";
import { useEffect,useState } from "react";
import { fetchMovieById } from "../../api/MovieApi";

function Movie({movie, setMovie}) {
    const {movieId} = useParams();

    useEffect(() => {
        fetchMovieById(movieId).then((response) => {
            setMovie(response.data)
        })
        .catch(err => console.log(err))
    },[])

    return (
        <>
        <YoutubeEmbed video={movie.trailerVideo} thumbnail={movie.trailerPicture}/>
        <Outlet/>
        </>
    )
}

export default Movie;