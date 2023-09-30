import YoutubeEmbed from "./YoutubeEmbed";
import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import '../../css/movie select/SelectShowTime.css'
import {Link,useLocation} from 'react-router-dom'

function SelectShowTime() {
   
    const[startDate, setStartDate] = useState(new Date());
    const[timeList, setTimeList] = useState(['2:00 PM', '4:00 PM', '5:30 PM', '7:00 PM', '8:00 PM', '10:00 PM']);

    const location = useLocation();
    let movie = location.state.movie.fullMovie;

    return (
        <>
        <YoutubeEmbed video={movie.trailerVideo} thumbnail={movie.trailerPicture}/>
        <div className='body-margin'>
        <div className="showtime-title"><h2>{movie.title}</h2> <DatePicker minDate={new Date()} selected={startDate} onChange={(date) => setStartDate(date)} /></div>
        <div id='time-grid'>
        {timeList.map((time) => (
            <Link state={{ date:{startDate}, time:{time}, movie:{movie} }} id='timeLink' to='/movie/Showtime'>{time}</Link>
        ))}
        </div>
        </div>

        </>
    );
}

export default SelectShowTime;