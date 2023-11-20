import DatePicker from 'react-datepicker';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form'
import { useState, useEffect } from 'react';
import { fetchMovieCoversCurrent,fetchMovieCoversUpcoming } from './api/MovieApi';
import ShowTimeGrid from './content/movie select/ShowTimeGrid';
import './css/movie select/ShowtimeBrowser.css'

function ShowtimeBrowser() {
    const [date, setDate] = useState('');
    const [movieList, setMovieList] = useState([]);
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

    function handleLoad() {
        let list = [];
        if (typeof movieListCurrent !== 'undefined' && typeof movieListUpcoming !== 'undefined')
            list = movieListCurrent.concat(movieListUpcoming)
        return list;
    }

    return(
    <>
        <Navbar className='bg-body-tertiary'>
            Filter by
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
        {handleLoad().map((movie) => (
            <>
            <div className='showtime-card'>
            <div className='small-movie-header'>
            <img src={movie.trailerPicture} alt='movie poster'/>
            <h3>{movie.title}</h3>
            </div>
            <ShowTimeGrid startDate={date} movie={movie}/>
            </div>
            </>
        ))}
    </>
    );
}

export default ShowtimeBrowser;