import MovieCard from './MovieCard';
import '../../css/homepage/MovieCarousel.css';
import { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { fetchMovieById, fetchMovieCoversCurrent, fetchMovieCoversUpcoming } from '../../api/MovieApi';

function MovieCarousel({type, loginState, searchQuery}) {
  const [movieListCurrent, setMovieListCurrent] = useState();
  const [movieListUpcoming, setMovieListUpcoming] = useState();

  useEffect(() => {
    fetchMovieCoversCurrent().then(
      response => setMovieListCurrent(response.data)
    )
  },[])
  useEffect(() => {
    fetchMovieCoversUpcoming().then(
      response => setMovieListUpcoming(response.data)
    )
  },[])

  function handleSearch(list) {
    let filteredList =
        list.filter(
            (movie) => {
                if (movie.title !== undefined)
                    return movie.title.toLowerCase().includes(searchQuery.toLowerCase())  
                else 
                    return true;
            }    
        )
    return filteredList;
}

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

  const placeHolder = <div style={{ opacity:'0' }}></div> 

  function displayList() {
    if (type === 'current') {
      return (typeof movieListCurrent === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        handleSearch(movieListCurrent).map((movie) => (<MovieCard loginState={loginState} movie={movie} />))
      )
    } else {
      return (typeof movieListUpcoming === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        handleSearch(movieListUpcoming).map((movie) => (<MovieCard loginState={loginState} movie={movie} />))
      )
    }
  }

  return (
    <Carousel infinite responsive={responsive} draggable={false}>
      {displayList()}
    </Carousel>
  );
}

export default MovieCarousel;