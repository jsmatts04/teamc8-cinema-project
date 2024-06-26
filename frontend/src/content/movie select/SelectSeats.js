import { useState,useEffect } from "react";
import '../../css/movie select/SelectSeats.css'
import { Link } from 'react-router-dom';
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { getSeatsForShowtime } from "../../api/SeatApi";

function SelectSeats({movie, booking, setBooking}) {
    let[count,setCount] = useState(0);
    let[selectedList, setSelectedList] = useState([]);
    const[seatList, setSeatList] = useState([]);
    let [date, time] = booking.showtime.timestamp.split('T');

    const convertTime24to12 = (time24h) => {
        let [hours, minutes, seconds] = time24h.split(':');
        let modifier = 'AM';
        if (hours === '00') {
          hours = '12';
        }
        if (parseInt(hours) > 12) {
            hours = parseInt(hours) % 12;
            modifier = 'PM'
        }
        return `${hours}:${minutes} ${modifier}`;
    }
    time = convertTime24to12(time)

    useEffect(()=> {
        getSeatsForShowtime(booking.showtime.id).then(
            response=>{setSeatList(response.data.sort(function(a,b){return a.id - b.id}))})
        .catch(err => console.log(err))
    },[booking.showtime.id])

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
        console.log(selectedList);
        setCount(count);
    }

    function printSeatList() {
        let list = 
        seatList.map((e) => (((e.reserved === false) && <ToggleButton onChange={handleChange} id={'toggle-check' + (e.seatRow+e.seatNum)} type="checkbox" value={e.id + ':' + e.seatRow+e.seatNum}>{e.seatRow+e.seatNum}</ToggleButton>)||( 
            (e.reserved === true) && <ToggleButton variant='dark' value={e.id + ':' + e.seatRow+e.seatNum} disabled >{e.seatRow+e.seatNum}</ToggleButton>)));
        return list;
    }

    function disabledButton(path) {
        if (count !== 0)
            return <Link state={{count:{count}, selectedList}}  className='confirm-button active' to={path}>Continue</Link>;
        return <Link className='confirm-button disabled' to=' '>Continue</Link>;
    }

    return (
        <>
            <h1 id='date-time'>{movie.title} | {date} | {time}</h1>
            <h2 id='screen'>Screen</h2>
            <ToggleButtonGroup type="checkbox" id='cinema-layout'>
                {printSeatList()}
            </ToggleButtonGroup>
            <div id='footer'>
            <h3 id='ticket-count'> {count} Ticket(s) Selected</h3>{disabledButton('../age-category')}
            </div>
        </>
    );
}

export default SelectSeats;
