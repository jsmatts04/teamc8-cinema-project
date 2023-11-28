import YoutubeEmbed from "./YoutubeEmbed";
import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../../css/movie select/SelectShowTime.css'
import {useOutletContext} from 'react-router-dom'
import ShowTimeGrid from "./ShowTimeGrid";
import { getShowtimesForMovieDate } from "../../api/ShowtimeApi";

function SelectShowTime() {
    const[date, setDate] = useState(new Date());
    const {movie, booking, setBooking} = useOutletContext();

    const convertDate = (d) => {
        return(d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate())
    }

    return (
        <>
        <div className="showtime-title"><h2>{movie.title}</h2> <DatePicker minDate={new Date()} selected={date} onChange={(e) => setDate(e)} /></div>
        <ShowTimeGrid booking={booking} date={convertDate(date)} movie={movie} setBooking={setBooking}/>
        </>
    );
}

export default SelectShowTime;