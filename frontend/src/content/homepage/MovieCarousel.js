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
      response => {
        setMovieListCurrent(response.data);
      }
    ).catch((err)=>console.log(err))
  },[])
  
  useEffect(() => {
    fetchMovieCoversUpcoming().then(
      response => {
        setMovieListUpcoming(response.data);
      }
    ).catch((err)=>console.log(err))
  },[])

  function handleSearch() {
    let list = [];
    if (typeof movieListCurrent !== 'undefined' && typeof movieListUpcoming !== 'undefined')
      list = movieListCurrent.concat(movieListUpcoming)
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
    } else if (type ==='result(s) found for '){
      return (typeof movieListUpcoming === 'undefined' || typeof movieListCurrent === 'undefined') ? (
        <p>No Results Found</p>
      ) : (
        handleSearch().map((movie) => (<MovieCard loginState={loginState} movie={movie} />))
      )
    }
  }

  return (
    <>
    <p1 className='title'>
    {type ==='result(s) found for ' && handleSearch().length} {type} {type ==='result(s) found for ' && '\''+searchQuery+'\''}
    </p1>
    {handleSearch().length === 0 && type ==='result(s) found for ' && <p style={{color:'whitesmoke'}}>No Results Found</p>}
    <Carousel infinite responsive={responsive} draggable={false}>
      {displayList()}
    </Carousel>
    </>
  );
}

export default MovieCarousel;