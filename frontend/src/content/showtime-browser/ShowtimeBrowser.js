import DatePicker from 'react-datepicker';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import MovieDetail from '../movie select/MovieDetail';
import { fetchMovieById, fetchAllMovieCovers } from '../../api/MovieApi';
import ShowTimeGrid from '../movie select/ShowTimeGrid';
import YoutubeEmbed from '../movie select/YoutubeEmbed';
import '../../css/movie select/ShowtimeBrowser.css'

function ShowtimeBrowser({setMovie, setBooking, booking}) {
    const [date, setDate] = useState(new Date());
    const [movieList, setMovieList] = useState([]);
    const [movieSelected, setMovieSelected] = useState({});
    const [movieFilteredId, setMovieFilteredId] = useState('select movie');

    const convertDate = (d) => {
        return(d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate())
    }

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

    function handleFilterMovie(list) {
        if (movieFilteredId !== 'select movie') {
            list = movieList.filter((movie) => movie.id === parseInt(movieFilteredId));
        }
        return list;
    }


    return(
    <div style={{height:'93vh', overflowY:'hidden', backgroundImage:'url('+movieSelected.trailerPicture+')', backgroundSize: '1000px', backgroundPosition:'center'}}>
        <div style={{backgroundColor:'#00000090',backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', height: '100%', width: '100%'}}>
        <Navbar className='showtime-navbar'>
            <Form.Select style={{width:'fit-content', backgroundColor:'#505050'}} onChange={e => setMovieFilteredId(e.target.value)}>
            Movie:
                <option>select movie</option>
                {movieList.map((movie)=>(
                    <option value={movie.id}>{movie.title}</option>
                ))}
            </Form.Select>
            <DatePicker minDate={new Date()} selected={date} onChange={(date) => setDate(date)} />
        </Navbar>
        <div className='showtime-browser-content' style={{height:'93%'}}>
        <div style={{overflowY:'scroll'}}>
        {handleFilterMovie(movieList).map((movie) => (
            <div className='showtime-card' onMouseEnter={()=>{handleHover(movie)}}>
            <div className='small-movie-header'>
            <img src={movie.trailerPicture} alt='movie poster'/> 
            <h3>{truncateStr(movie.title)}</h3>
            </div>
            <hr className='showtime-hr'/>
            <ShowTimeGrid setBooking={setBooking} booking={booking} date={convertDate(date)} movie={movie}/>
            </div>
        ))}
        </div>
        <div className='movie-details-col'>
            
        {(movieSelected.title === undefined) ? (
            <></>
        ) : (
                <div className='selected-movie-wrapper' style={{padding: '50px'}}>
                <YoutubeEmbed video={movieSelected.trailerVideo} thumbnail={movieSelected.trailerPicture}/>
                <div className='grid-2-col'>
                <h3>{movieSelected.title}</h3>
                <h3>{movieSelected.filmRating}</h3>
                </div>
                <h3>{movieSelected.filmLength} minutes</h3>
                <Link state = {{movie:movieSelected}} to={'/movie/'+movieSelected.id+'/details'} element={<MovieDetail/>}>
                <Button variant='warning' className='book-button'>MOVIE DETAILS</Button>
                </Link>
                </div>
            
        )}
        </div>
        </div>
    </div>
    </div>
    );
}

export default ShowtimeBrowser;