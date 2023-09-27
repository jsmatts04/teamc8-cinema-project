import MovieCard from './MovieCard';
import '../../css/homepage/MovieCarousel.css';
import {useState} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function MovieCarousel () {
    const [backendData, setBackendData] = useState([{}]);
    const [movieListCurrent, setMovieListCurrent] = useState([]);
    const [movieListUpcoming, setMovieListUpcoming] = useState([]);
    const url = '';

    
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1500 },
          items: 6
        },
        tablet: {
          breakpoint: { max: 1500, min: 600 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 600, min: 0 },
          items: 1
        }
    };

    return (
        <Carousel infinite responsive={responsive}>
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />

            {(typeof backendData === 'undefined') ? (
                <p>Loading...</p>
            ) : (
                backendData.map((movie) => (
                    <MovieCard movie={movie} />
            ))
            )}
        </Carousel>
    );
}

export default MovieCarousel;