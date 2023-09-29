import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../../css/homepage/MovieCard.css';
import MovieDetail from '../movie select/MovieDetail';
import { Link } from 'react-router-dom';
import SelectShowTime from '../movie select/SelectShowTime';

function MovieCard(props) {
    let {loginState} = props;
    let movie = {
        title:'Oppenheimer'
    }

    return(
        <div style={{width:'fit-content'}}>
        <Card style={{width:'15rem', marginBottom: -10, backgroundColor:'transparent', color: 'white', borderColor:'transparent'}}>
            <Link state = {{movie:{movie}}} to={'/movie'} element={<MovieDetail/>}>
            <Card.Img variant='top' src='https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg'/>
            </Link>
            <Card.Body className="d-flex justify-content-between">
                <Card.Title>Movie Title</Card.Title>
                <Card.Title style={{color:'orange'}}>PG</Card.Title>
            </Card.Body>
        </Card>
        {loginState && <Link state={{movie:{movie}}} to={'/Movie/SelectShowtime'} element={<SelectShowTime/>}>
        <Button className='book-button'>BOOK TICKETS</Button>
        </Link>}
        {!loginState && <Link to={'/Login'}>
        <Button className='book-button'>BOOK TICKETS</Button>
        </Link>}
        </div>
    );
}

export default MovieCard;