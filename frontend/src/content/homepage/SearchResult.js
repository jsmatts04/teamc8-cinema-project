import MovieCarousel from './MovieCarousel';

function SearchResult(props) {
    const { loginState, searchQuery } = props;

    
    return (
        <MovieCarousel type={'result(s) found for '} searchQuery={searchQuery} loginState={loginState} />
    );
}

export default SearchResult;