import MovieCarousel from "./MovieCarousel";
import '../../css/homepage/Home.css';

function Home(props) {
    const { loginState, searchQuery } = props;

    return (
        <>
            <MovieCarousel type={'CURRENTLY RUNNING'} searchQuery={searchQuery} loginState={loginState} />
            <MovieCarousel type={'UPCOMING MOVIES'} searchQuery={searchQuery} loginState={loginState} />
        </>
    );
}

export default Home;