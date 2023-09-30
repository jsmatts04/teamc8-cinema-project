import YoutubeEmbed from "./YoutubeEmbed";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import '../../css/movie select/SelectSeats.css'
import { Link } from 'react-router-dom';
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

function SelectSeats() {
    let[count,setCount] = useState(0);

    let[selectedList, setSelectedList] = useState([]);
    const[seatList, setSeatList] = useState([0,0,0,0,0,0,0,0,0,0,
                                             0,0,0,0,0,0,0,0,0,0,
                                             0,0,0,0,0,0,0,0,0,0,
                                             1,1,0,0,0,0,0,0,1,1,
                                             1,1,1,0,0,0,0,1,1,1]);
    const location = useLocation();
    const {time} = location.state.time;
    const {date} = location.state.date.startDate;
    let movie = location.state.movie.movie;
    let dateString = JSON.stringify(location.state.date.startDate, null, '\t').substring(1,11);

    const handleChange = (event) => {
        if (event.target.checked) {
            count = count + 1;
            const newList = selectedList.concat(event.target.value)
            setSelectedList(newList);
        } else {
            count = count - 1;
            const newList = selectedList.filter((item) => item !== event.target.value);
            setSelectedList(newList);
        }
        setCount(count);
    }

    function returnSeat(num) {
        let newNum = num;
        if (num%10 != 0) 
            newNum = (num)%10;
        else 
            newNum = 10
        return String.fromCharCode('A'.charCodeAt(0) + (num - 1)/10) + newNum;
    }

    function printSeatList() {
        let list = 
        seatList.map((e,index) => (((e === 0) && <ToggleButton onChange={handleChange} id={'toggle-check' + index} type="checkbox" value={returnSeat(index+1)}>{returnSeat(index+1)}</ToggleButton>)||( 
        (e === 1) && <ToggleButton variant='dark' value={returnSeat(index+1)} disabled >{returnSeat(index+1)}</ToggleButton>)));
        return list;
    }

    function disabledButton(path) {
        if (count !== 0)
            return <Link state={{time:{time}, date:{dateString}, movie:{movie}, count:{count}, selectedList}}  className='confirm-button active' to={path}>Continue</Link>;
        return <Link className='confirm-button disabled' to=' '>Continue</Link>;
    }

    return (
        <>
            <YoutubeEmbed video={movie.trailerVideo} thumbnail={movie.trailerPicture}/>
            <h1 id='date-time'>{movie.title} | {dateString} | {time}</h1>
            <h2 id='screen'>Screen</h2>
            <ToggleButtonGroup type="checkbox" id='cinema-layout'>
                {printSeatList()}
            </ToggleButtonGroup>
            <div id='footer'>
            <h3 id='ticket-count'> {count} Ticket(s) Selected</h3>{disabledButton('/movie/ShowTime/Seats')}
            </div>
        </>
    );
}

export default SelectSeats;
