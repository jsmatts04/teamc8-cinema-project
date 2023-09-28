import tomatoImage from '../../Images/FreshTomato.png';
import imdbImage from '../../Images/imdb.png';
import Button from 'react-bootstrap/Button';
import '../../css/movie select/MovieDetail.css'
import YoutubeEmbed from './YoutubeEmbed';
import SelectShowTime from './SelectShowTime';
import { Link } from 'react-router-dom';

function MovieDetail ({movie}) {

    return (
        <>
        <YoutubeEmbed/>
        <h1 id='detailsTitle'>OPPENHEIMER</h1>
        <Link to={'/Movie/SelectShowtime'} element={<SelectShowTime/>}>
        <Button className='book-button-details'>BOOK TICKETS</Button>
        </Link>
        <div className="book-ticket-content">
            <div className="left-column-detail">
                <div id='ratingsDiv'>
                    <img src={tomatoImage} alt='rotten tomatoes logo' className='ratings-logo'/><h2>98%</h2>
                    <img src={imdbImage} alt='IMDb logo' className='ratings-logo'/><h2>98%</h2>
                </div>
                <ul>
                    <li>Director: Christopher Nolan</li>
                    <li>Genre: Suspense/Thriller</li>
                    <li>Release Date: July 21, 2023</li>
                    <li>Movie Duration: 3 hours</li>
                </ul>
                <h3>Cast and Crew</h3>
                <ul>
                    <li>Cillian Murphy </li>
                    <li>Emily Blunt</li>
                    <li>David Krumholtz</li>
                    <li>Aiden Ehrenrich</li>
                    <li>Josh Harnett</li>
                    <li>Robert Downey Jr.</li>
                </ul>
            </div>
            <div className="right-column-detail">
                <p>
                Written and directed by Christopher Nolan, Oppenheimer is an IMAX®-shot epic thriller that thrusts audiences into the pulse-pounding paradox of the enigmatic man who must risk destroying the world in order to save it. The film stars Cillian Murphy as J. Robert Oppenheimer and Emily Blunt as his wife, biologist and botanist Katherine “Kitty” Oppenheimer. Oscar® winner Matt Damon portrays General Leslie Groves Jr., director of the Manhattan Project, and Robert Downey, Jr. plays Lewis Strauss, a founding commissioner of the U.S. Atomic Energy Commission. Academy Award® nominee Florence Pugh plays psychiatrist Jean Tatlock, Benny Safdie plays theoretical physicist Edward Teller, Michael Angarano plays Robert Serber and Josh Hartnett plays pioneering American nuclear scientist Ernest Lawrence. Oppenheimer also stars Oscar® winner Rami Malek and reunites Nolan with eight-time Oscar® nominated actor, writer and filmmaker Kenneth Branagh. The cast includes Dane DeHaan (Valerian and the City of a Thousand Planets), Dylan Arnold (Halloween franchise), David Krumholtz (The Ballad of Buster Scruggs), Alden Ehrenreich (Solo: A Star Wars Story) and Matthew Modine (The Dark Knight Rises). The film is based on the Pulitzer Prize-winning book American Prometheus: The Triumph and Tragedy of J. Robert Oppenheimer by Kai Bird and the late Martin J. Sherwin. The film is produced by Emma Thomas, Atlas Entertainment’s Charles Roven and Christopher Nolan. Oppenheimer is filmed in a combination of IMAX® 65mm and 65mm large-format film photography including, for the first time ever, sections in IMAX® black and white analogue photography. Nolan’s films, including Tenet, Dunkirk, Interstellar, Inception and The Dark Knight trilogy, have earned more than $5 billion at the global box office and have been awarded 11 Oscars and 36 nominations, including two Best Picture nominations.
                </p>
            </div>
        </div>
        </>
    );
}




export default MovieDetail;