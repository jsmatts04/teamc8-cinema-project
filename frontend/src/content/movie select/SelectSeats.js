import { useState,useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import '../../css/movie select/SelectSeats.css'
import { Link } from 'react-router-dom';
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { getSeatsForShowtime } from "../../api/SeatApi";

function SelectSeats() {
    let[count,setCount] = useState(0);
    let[selectedList, setSelectedList] = useState([]);
    const[seatList, setSeatList] = useState([0,0,0,0,0,0,0,0,0,0,
                                             0,0,0,0,0,0,0,0,0,0,
                                             0,0,0,0,0,0,0,0,0,0,
                                             1,1,0,0,0,0,0,0,1,1,
                                             1,1,1,0,0,0,0,1,1,1]);
    const { movie, booking, setBooking } = useOutletContext();
    let [date, time] = booking.showtime.timestamp.split('T');

    const convertTime24to12 = (time24h) => {
        const [hours, minutes, seconds] = time24h.split(':');
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
            response=>setSeatList(response.data))
        .catch(err => console.log(err))
    },[])

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

    function printSeatList() {
        let list = 
        seatList.map((e) => (((e.reserved === false) && <ToggleButton onChange={handleChange} id={'toggle-check' + (e.seatRow+e.seatNum)} type="checkbox" value={e.seatRow+e.seatNum}>{e.seatRow+e.seatNum}</ToggleButton>)||( 
            (e.reserved === true) && <ToggleButton variant='dark' value={e.seatRow+e.seatNum} disabled >{e.seatRow+e.seatNum}</ToggleButton>)));
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
