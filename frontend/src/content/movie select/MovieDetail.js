import tomatoImage from '../../Images/FreshTomato.png';
import Button from 'react-bootstrap/Button';
import '../../css/movie select/MovieDetail.css'
import YoutubeEmbed from './YoutubeEmbed';
import { Link, useOutletContext,useParams } from 'react-router-dom';
import { fetchMovieById } from '../../api/MovieApi';
import { useEffect, useState } from 'react';

function MovieDetail ({loginState}) {
    let movie = useOutletContext();
    
    const {movieId} = useParams();
    if (movie.title === undefined) {
        console.log(movieId)
        fetchMovieById(movieId).then(
            response => {
                movie = response.data
            }
        ).catch(err => console.log(err))
    }

    function printActors() {
        let array =[];
        if (movie.actors !== undefined)
            array = movie.actors.split("\n")
        return array;
    }
    function printProducers() {
        let array =[];
        if (movie.producer !== undefined)
            array = movie.producer.split(",")
        return array;
    }

    return (
        <>
        {(typeof movie === 'undefined') ? (
            <p>Loading...</p>
        ) : (
            <>
            <h1 id='detailsTitle'>{movie.title}</h1>
            {loginState && <Link to={'../booking/select-show-time'}>
            <Button variant='warning' className='book-button-details'>BOOK TICKETS</Button>
            </Link>}
            {!loginState && <Link to={'/Login'}>
            <Button variant='warning' className='book-button-details'>BOOK TICKETS</Button>
            </Link>}
            <div className="book-ticket-content">
                <div className="left-column-detail">
                <ul>
                    <li>Director: {movie.director}</li>
                    <li>Genre: {movie.category}</li>
                    <li>Movie Duration: {movie.filmLength} minutes</li>
                    <li>Release Date: {movie.releaseDate}</li>
                </ul>
                {movie.reviewScore !== 0 && <><div id='ratingsDiv'>
                    <img src={tomatoImage} alt='rotten tomatoes logo' className='ratings-logo'/><div><h3>{movie.reviewScore}%</h3><h2>Rotten Tomatoes</h2></div>
                </div></>}
                <h3>Cast</h3>
                <ul>
                    {printActors().map((e)=>(<li>{e}</li>))}
                </ul>
                <h3>Crew</h3>
                <ul>
                    {printProducers().map((e)=>(<li>{e}</li>))}
                </ul>
            </div>
            <div className="right-column-detail">
                <p>
                    {movie.synopsis}
                </p>
            </div>
        </div>
            </>
        )}
        </>
    );
}




export default MovieDetail;