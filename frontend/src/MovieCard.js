import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function MovieCard() {
    return(
        <div style={{width:'fit-content'}}>
        <Card style={{width:'16rem'}}>
            <Card.Img variant='top' src='https://amc-theatres-res.cloudinary.com/image/upload/f_auto,fl_lossy,h_465,q_auto,w_310/v1684849418/amc-cdn/production/2/movies/66700/66707/PosterDynamic/152829.jpg'/>
            <Card.Body>
                <Card.Title>Movie Title</Card.Title>
                <Card.Subtitle style={{color:'orange'}}>Rating</Card.Subtitle>
            </Card.Body>
        </Card>
        <Button style={{width:'90%',marginLeft:'5%'}}>BOOK TICKETS</Button>
        </div>
    );
}

export default MovieCard;