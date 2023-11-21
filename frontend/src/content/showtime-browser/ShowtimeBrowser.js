import DatePicker from 'react-datepicker';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import MovieDetail from '../movie select/MovieDetail';
import { fetchMovieById, fetchMovieCoversCurrent,fetchMovieCoversUpcoming } from '../../api/MovieApi';
import ShowTimeGrid from '../movie select/ShowTimeGrid';
import YoutubeEmbed from '../movie select/YoutubeEmbed';
import '../../css/movie select/ShowtimeBrowser.css'

function ShowtimeBrowser() {
    const [date, setDate] = useState(new Date());
    const [movieList, setMovieList] = useState([]);
    const [movieSelected, setMovieSelected] = useState({});
    const [movieListCurrent, setMovieListCurrent] = useState([]);
    const [movieListUpcoming, setMovieListUpcoming] = useState([]);

    useEffect(() => {
        fetchMovieCoversCurrent().then(
          response => {
            setMovieListCurrent(response.data);
          }
        )
    },[])
      
    useEffect(() => {
        fetchMovieCoversUpcoming().then(
          response => {
            setMovieListUpcoming(response.data);
          }
        )
    },[])

    useEffect(() => {
        setMovieList(movieListCurrent.concat(movieListUpcoming));
        if (movieList.length !== 0) {
            fetchMovieById(movieList[0].id).then(
                response => {
                    setMovieSelected(response.data)
                }
            )
        }
    }, [movieListCurrent,movieListUpcoming])
    
    function truncateStr(string) {
        if (string.length > 15)
          return string.slice(0, 15) + "...";
        return string
    }

    return(
    <div style={{height:'90vh', overflowY:'hidden'}}>
        <Navbar className='showtime-navbar'>
            <p>Filter by</p>
            <Form.Select>
            Genre:
                <option>select filter</option>
                <option value='1'>category1</option>
                <option value='2'>category2</option>
                <option value='3'>category3</option>
            </Form.Select>
            <Form.Select>
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
            <div className='showtime-card'>
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
        {(typeof movieSelected === 'undefined') ? (
            <p>No movie selected</p>
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