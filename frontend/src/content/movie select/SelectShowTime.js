import YoutubeEmbed from "./YoutubeEmbed";
import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../../css/movie select/SelectShowTime.css'
import {useOutletContext} from 'react-router-dom'
import ShowTimeGrid from "./ShowTimeGrid";
import { getShowtimesForMovieDate } from "../../api/ShowtimeApi";

function SelectShowTime({booking}) {
    const[startDate, setStartDate] = useState(new Date());
    const movie = useOutletContext();
    booking = {
        showtime: {
            timestamp: startDate
        }
    }

    useEffect(()=> {
        let dateString = startDate.getFullYear() + '-' + (startDate.getMonth()+1) + '-' + startDate.getDate() + 'T00-00-00';
        getShowtimesForMovieDate(movie.id, dateString).then(
            (response) => console.log(response.data)
        ).catch((err) => console.log(err))
    },[startDate])

    return (
        <>
        <div className="showtime-title"><h2>{movie.title}</h2> <DatePicker minDate={new Date()} selected={startDate} onChange={(date) => setStartDate(date)} /></div>
        <ShowTimeGrid booking={booking} startDate={startDate} movie={movie}/>
        </>
    );
}

export default SelectShowTime;