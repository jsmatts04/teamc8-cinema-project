import tomatoImage from '../../Images/FreshTomato.png';
import imdbImage from '../../Images/imdb.png';
import Button from 'react-bootstrap/Button';
import '../../css/movie select/MovieDetail.css'
import YoutubeEmbed from './YoutubeEmbed';
import SelectShowTime from './SelectShowTime';
import { Link, useLocation } from 'react-router-dom';
import { fetchMovieById } from '../../api/MovieApi';
import { useState } from 'react';

function MovieDetail (props) {
    let {loginState} = props;
    const [fullMovie, setFullMovie] = useState();
    const location = useLocation();
    let movie = location.state.movie.movie;

    fetchMovieById(movie.id).then(
        response => setFullMovie(response.data)
    )
    
    function printActors() {
        let string = fullMovie.actors
        let array = string.split("\n")
        return array;
    }

    function printProducers() {
        let string = fullMovie.producer
        let array = string.split(",")
        return array;
    }

    return (
        <>
        {(typeof fullMovie === 'undefined') ? (
            <p>Loading...</p>
        ) : (
            <>
            <YoutubeEmbed video={fullMovie.trailerVideo} thumbnail={fullMovie.trailerPicture}/>
            <h1 id='detailsTitle'>{fullMovie.title}</h1>
            {loginState && <Link to={'/Movie/SelectShowtime'} state={{movie:{fullMovie}}} element={<SelectShowTime/>}>
            <Button variant='warning' className='book-button-details'>BOOK TICKETS</Button>
            </Link>}
            {!loginState && <Link to={'/Login'}>
            <Button variant='warning' className='book-button-details'>BOOK TICKETS</Button>
            </Link>}
            <div className="book-ticket-content">
                <div className="left-column-detail">
                <ul>
                    <li>Director: {fullMovie.director}</li>
                    <li>Genre: {fullMovie.category}</li>
                    <li>Movie Duration: {fullMovie.filmLength} minutes</li>
                    <li>Release Date: {fullMovie.releaseDate}</li>
                </ul>
                {fullMovie.reviewScore !== 0 && <><div id='ratingsDiv'>
                    <img src={tomatoImage} alt='rotten tomatoes logo' className='ratings-logo'/><div><h3>{fullMovie.reviewScore}%</h3><h2>Rotten Tomatoes</h2></div>
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
                    {fullMovie.synopsis}
                </p>
            </div>
        </div>
            </>
        )}
        </>
    );
}




export default MovieDetail;