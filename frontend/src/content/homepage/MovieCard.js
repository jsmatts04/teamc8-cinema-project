import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../../css/homepage/MovieCard.css';
import MovieDetail from '../movie select/MovieDetail';
import { Link } from 'react-router-dom';
import { fetchMovieById } from '../../api/MovieApi';
import { useState, useEffect } from 'react';
import Movie from '../movie select/Movie';


function MovieCard(props) {
    const [fullMovie, setFullMovie] = useState();
    let {loginState, movie} = props;

    useEffect(() => {
        fetchMovieById(movie.id).then(
            response => {
                setFullMovie(response.data);
            }
        )
    },[])

    function truncateStr(string) {
        if (string.length > 12)
          return string.slice(0, 12) + "...";
        return string
    }

    return(
        <div style={{width:'fit-content'}}>
        <Card style={{width:'15rem', marginBottom: -10, backgroundColor:'transparent', color: 'white', borderColor:'transparent'}}>
            <Link state = {{movie:fullMovie}} to={'/movie/' + movie.id + '/details'}>
            <Card.Img variant='top' alt='movie-poster' style={{ height:330, width: '100%', objectFit:'cover' }} src={movie.trailerPicture}/>
            </Link>
            <Card.Body className="d-flex justify-content-between">
                <Card.Title>{truncateStr(movie.title)}</Card.Title>
                {movie.filmRating !== 'null' && <Card.Title style={{color:'orange'}}>{movie.filmRating}</Card.Title>}
            </Card.Body>
        </Card>
        {loginState && <Link state={{movie:fullMovie}} to={'/movie/'+movie.id+'/booking/select-show-time'}>
        <Button variant='warning' className='book-button'>BOOK TICKETS</Button>
        </Link>}
        {!loginState && <Link to={'/Login'}>
        <Button variant='warning' className='book-button'>BOOK TICKETS</Button>
        </Link>}
        </div>
    );
}

export default MovieCard;