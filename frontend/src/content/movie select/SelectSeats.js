import YoutubeEmbed from "./YoutubeEmbed";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import '../../css/movie select/SelectSeats.css'
import { Link } from 'react-router-dom';

function SelectSeats() {
    let[count,setCount] = useState(0);
    const[seatList, setSeatList] = useState([0,0,0,0,0,0,0,0,0,0,
                                             0,0,0,0,0,0,0,0,0,0,
                                             0,0,0,0,0,0,0,0,0,0,
                                             1,1,0,0,0,0,0,0,1,1,
                                             1,1,1,0,0,0,0,1,1,1]);
    const location = useLocation();
    const {time} = location.state.time;
    const {date} = location.state.date.startDate;
    const movieTitle = location.state.movie.movie.title;
    const movie = location.state.movie.movie;
    let dateString = JSON.stringify(location.state.date.startDate, null, '\t').substring(1,11);
    
    const handleChange = (event) => {
        if (event.target.checked) {
            count = count + 1;
        } else {
            count = count - 1;
        }
        setCount(count);
    }

    function printSeatList(){
        let list = 
        seatList.map((e) => (((e === 0) && <Form.Check onChange={handleChange} aria-label='option 1'/>)||( 
        (e === 1) && <Form.Check  disabled aria-label='option 1'/>)));
        return list;
    }

    function disabledButton(path) {
        if (count !== 0)
            return <Link state={{time:{time}, date:{dateString}, movie:{movie}}} ticketCount={count} className='confirm-button active' to={path}>Continue</Link>;
        return <Link className='confirm-button disabled' to=' '>Continue</Link>;
    }

    return (
        <>
            <YoutubeEmbed/>
            <h1 id='date-time'>{movieTitle}, {dateString}, {time}</h1>
            <h2 id='screen'>Screen</h2>
            <div id='cinema-layout'>
            {printSeatList()}
            </div>
            <div id='footer'>
            <h3 id='ticket-count'> {count} Ticket(s) Selected</h3>{disabledButton('/movie/ShowTime/Seats')}
            </div>
        </>
    );
}

export default SelectSeats;
