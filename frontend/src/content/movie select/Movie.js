import { Outlet, useLocation, useParams } from "react-router-dom";
import YoutubeEmbed from "./YoutubeEmbed";
import { useEffect,useState } from "react";
import { fetchMovieById } from "../../api/MovieApi";

function Movie() {
    let location = useLocation();
    const {movieId} = useParams();

    const [movie, setMovie] = useState({});
    const [booking, setBooking] = useState({});

    useEffect(() => {
        fetchMovieById(movieId).then((response) => {
            setMovie(response.data)
        })
        .catch(err => console.log(err))
    },[])

    return (
        <>
        <YoutubeEmbed video={movie.trailerVideo} thumbnail={movie.trailerPicture}/>
        <Outlet context={{movie, booking, setBooking}}/>
        </>
    )
}

export default Movie;