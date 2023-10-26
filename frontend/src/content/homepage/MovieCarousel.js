import MovieCard from './MovieCard';
import '../../css/homepage/MovieCarousel.css';
import { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { fetchMovieById, fetchMovieCoversCurrent, fetchMovieCoversUpcoming } from '../../api/MovieApi';

function MovieCarousel({type, loginState, searchQuery}) {
  const [movieListCurrent, setMovieListCurrent] = useState();
  const [movieListUpcoming, setMovieListUpcoming] = useState();
  const [numResults, setNumResults] = useState(0);

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
      setNumResults(filteredList.size);
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

  function displayList() {
    if (type === 'CURRENTLY RUNNING') {
      return (typeof movieListCurrent === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        movieListCurrent.map((movie) => (<MovieCard loginState={loginState} movie={movie} />))
      )
    } else if (type ==='UPCOMING MOVIES'){
      return (typeof movieListUpcoming === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        movieListUpcoming.map((movie) => (<MovieCard loginState={loginState} movie={movie} />))
      )
    } else if (type ==='Result(s) found for '){
      return (typeof movieListUpcoming === 'undefined' || typeof movieListCurrent === 'undefined' || numResults === 0) ? (
        <p>No Results Found</p>
      ) : (
        handleSearch(movieListCurrent).map((movie) => (<MovieCard loginState={loginState} movie={movie} />)),
        handleSearch(movieListUpcoming).map((movie) => (<MovieCard loginState={loginState} movie={movie} />))
      )
    }
  }

  return (
    <>
    <p1 className='title'>
      {type} {type ==='Result(s) found for ' && '\''+searchQuery+'\''}
    </p1>
    <Carousel infinite responsive={responsive} draggable={false}>
      {displayList()}
    </Carousel>
    </>
  );
}

export default MovieCarousel;