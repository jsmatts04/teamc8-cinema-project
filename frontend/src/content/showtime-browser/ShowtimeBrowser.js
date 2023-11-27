import DatePicker from 'react-datepicker';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import MovieDetail from '../movie select/MovieDetail';
import Fade from 'react-bootstrap/Fade'
import { fetchMovieById, fetchAllMovieCovers } from '../../api/MovieApi';
import ShowTimeGrid from '../movie select/ShowTimeGrid';
import YoutubeEmbed from '../movie select/YoutubeEmbed';
import '../../css/movie select/ShowtimeBrowser.css'

function ShowtimeBrowser() {
    const [date, setDate] = useState(new Date());
    const [movieList, setMovieList] = useState([]);
    const [showtimeList, setShowtimeList] = useState([]);
    const [movieSelected, setMovieSelected] = useState({});

    useEffect(() => {
        fetchAllMovieCovers().then(
          response => {
            setMovieList(response.data);
          }
        )
    },[])
    
    function truncateStr(string) {
        if (string.length > 15)
          return string.slice(0, 15) + "...";
        return string
    }

    function handleHover(movie) {
        if (movie !== undefined) {
            fetchMovieById(movie.id).then(response=>setMovieSelected(response.data))
        }
    }

    return(
    <div style={{height:'90vh', overflowY:'hidden'}}>
        <Navbar className='showtime-navbar'>
            <Form.Select style={{width:'fit-content'}}>
            Movie:
                <option>select movie</option>
                {movieList.map((movie)=>(
                    <option value={movie.id}>{movie.title}</option>
                ))}
            </Form.Select>
            <DatePicker minDate={new Date()} selected={date} onChange={(date) => setDate(date)} />
        </Navbar>
        <div className='showtime-browser-content' style={{height:'100%'}}>
        <div style={{overflowY:'scroll'}}>
        {movieList.map((movie) => (
            <div className='showtime-card' onMouseEnter={()=>{handleHover(movie)}}>
            <div className='small-movie-header'>
            <img src={movie.trailerPicture} alt='movie poster'/> 
            <h3>{truncateStr(movie.title)}</h3>
            </div>
            <hr className='showtime-hr'/>
            <ShowTimeGrid startDate={date} movie={movie}/>
            </div>
        ))}
        </div>
        <div className='movie-details-col'>
        {(movieSelected.title === undefined) ? (
            <></>
        ) : (
                <>
                <YoutubeEmbed video={movieSelected.trailerVideo} thumbnail={movieSelected.trailerPicture}/>
                <div className='grid-2-col'>
                <h3>{movieSelected.title}</h3>
                <h3>{movieSelected.filmRating}</h3>
                </div>
                <h3>{movieSelected.filmLength} minutes</h3>
                <Link state = {{movie:movieSelected}} to={'/movie'} element={<MovieDetail/>}>
                <Button variant='warning' className='book-button'>MOVIE DETAILS</Button>
                </Link>
                </>
            
        )}
        </div>
        </div>
    </div>
    );
}

export default ShowtimeBrowser;