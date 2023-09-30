import MovieCarousel from "./MovieCarousel";
import '../../css/homepage/Home.css';

function Home(props) {
    const { loginState, searchQuery } = props;

    return (
        <>
            <p1 className='title'>
                CURRENTLY RUNNING
            </p1>
            <MovieCarousel type={'current'} searchQuery={searchQuery} loginState={loginState} />
            <p1 className='title'>
                UPCOMING MOVIES
            </p1>
            <MovieCarousel type={'upcoming'} searchQuery={searchQuery} loginState={loginState} />
        </>
    );
}

export default Home;