import MovieCarousel from "./MovieCarousel";
import '../../css/homepage/Home.css';

function Home(props) {
    const { loginState } = props;

    return (
        <>
            <p1 className='title'>
                CURRENTLY RUNNING
            </p1>
            <MovieCarousel loginState={loginState} />
            <p1 className='title'>
                UPCOMING MOVIES
            </p1>
            <MovieCarousel loginState={loginState} />
        </>
    );
}

export default Home;