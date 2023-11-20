import YoutubeEmbed from "./YoutubeEmbed";
import React, {useState} from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../../css/movie select/SelectShowTime.css'
import {useLocation} from 'react-router-dom'
import ShowTimeGrid from "./ShowTimeGrid";

function SelectShowTime() {

    const location = useLocation();
    const[startDate, setStartDate] = useState(new Date());
    let movie = location.state.movie.fullMovie;
    console.log(movie);

    return (
        <>
        <YoutubeEmbed video={movie.trailerVideo} thumbnail={movie.trailerPicture}/>
        <div className="showtime-title"><h2>{movie.title}</h2> <DatePicker minDate={new Date()} selected={startDate} onChange={(date) => setStartDate(date)} /></div>
        <ShowTimeGrid startDate={startDate} movie={movie}/>
        </>
    );
}

export default SelectShowTime;