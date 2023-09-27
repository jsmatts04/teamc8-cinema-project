import MovieCarousel from "./MovieCarousel";
import '../../css/homepage/Home.css';

function Home() {
    return (
        <>
            <p1 className='title'>
                CURRENTLY RUNNING
            </p1>
            <MovieCarousel/>
            <p1 className='title'>
                UPCOMING MOVIES
            </p1>
            <MovieCarousel/>
        </>
    );
}

export default Home;