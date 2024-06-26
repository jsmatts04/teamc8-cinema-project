import {useState, useEffect} from 'react';
import {Link, useOutletContext} from 'react-router-dom';
import { getShowtimesForMovieDate } from '../../api/ShowtimeApi';

function ShowTimeGrid({date, movie, booking, setBooking}) {
    if (date.length < 10) {
        if (date.lastIndexOf('-') - date.indexOf('-') !== 3) {
            date = date.substring(0,date.indexOf('-')+1) + 0 + date.substring(date.indexOf('-')+1) 
        }
        if (date.length !== 10) {
            date = date.substring(0,date.lastIndexOf('-')+1) + 0 + date.substring(date.lastIndexOf('-')+1)
        }
    }
    const[showtimeList, setShowtimeList] = useState([]);
    useEffect(()=> {
        getShowtimesForMovieDate(movie.id, date).then((response) => {
            let list = response.data.map(showtime=>showtime)
            setShowtimeList(list)
        }).catch((err) => console.log(err))
    },[date, movie.id])

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

    function updateBooking(_showtime) {
        let timestamp = date + 'T' + _showtime.time
        let st = {
            id:_showtime.id,
            timestamp:timestamp,
            room:_showtime.room,
            movie:_showtime.movie
        }
        setBooking({...booking, showtime:{...st}})
        console.log(booking)
    }

    return (
    <div className='body-margin'>
        {showtimeList.length === 0 && <h3 style={{fontSize:'100%',color:'grey', textAlign:'center'}}>No showtimes found for this date</h3>}
        <div id='time-grid'>
        {showtimeList.map((showtime) => <Link onClick={() => updateBooking(showtime)} id='timeLink' to={'/movie/'+movie.id+'/booking/seats'}>{convertTime24to12(showtime.time)}</Link>)}
        </div>
    </div>
    );
}

export default ShowTimeGrid;