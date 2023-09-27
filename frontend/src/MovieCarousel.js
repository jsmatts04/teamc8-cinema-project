import Carousel from 'react-bootstrap/Carousel';
import MovieCard from './MovieCard';
import Stack from 'react-bootstrap/Stack';
import './css/MovieCarousel.css'

function MovieCarousel () {
    return (
        <Carousel wrap={false} interval='5000' pause='hover'>
            <Carousel.Item>
                <div style={{width:'2rem'}}> </div>
                <Stack direction='horizontal' gap={3}>
                <MovieCard></MovieCard>
                <MovieCard></MovieCard>
                <MovieCard></MovieCard>
                </Stack>
            </Carousel.Item>
            <Carousel.Item>
                <Stack direction='horizontal' gap={3}>
                <MovieCard></MovieCard>
                <MovieCard></MovieCard>
                <MovieCard></MovieCard>
                </Stack>
            </Carousel.Item>
        </Carousel>
    );
}

export default MovieCarousel;