import YoutubeEmbed from "./YoutubeEmbed";
import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import '../../css/movie select/SelectShowTime.css'
import {Link} from 'react-router-dom'

function SelectShowTime() {
   
    const[startDate, setStartDate] = useState(new Date());
    const[timeList, setTimeList] = useState(['2:00 PM', '4:00 PM', '5:30 PM', '7:00 PM', '8:00 PM', '10:00 PM']);

    return (
        <>
        <YoutubeEmbed/>
        <DatePicker minDate={new Date()} selected={startDate} onChange={(date) => setStartDate(date)} />
        <div id='time-grid'>
        {timeList.map((time) => (
            <Link state={{ date:{startDate}, time:{time} }} id='timeLink' to='/movie/SelectShowtime/Showtime'>{time}</Link>
        ))}
        </div>

        </>
    );
}

export default SelectShowTime;