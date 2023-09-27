import MovieCard from "./MovieCard";
import MovieCarousel from "./MovieCarousel";
import Navbar from "./Navbar";
import './css/Home.css';

function Home() {
    return (
        <>
            <Navbar></Navbar>
            <p1 className='title'>
                CURRENTLY RUNNING
            </p1>
            <MovieCarousel></MovieCarousel>
            <p1 className='title'>
                UPCOMING MOVIES
            </p1>
        </>
    );
}

export default Home;