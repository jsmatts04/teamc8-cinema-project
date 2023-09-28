import YoutubeEmbed from "./YoutubeEmbed";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import '../../css/movie select/SelectSeats.css'

function SelectSeats() {
    const[seatList, setSeatList] = useState([0,0,0,0,0,0,0,0,0,0,
                                             0,0,0,0,0,0,0,0,0,0,
                                             0,0,0,0,0,0,0,0,0,0,
                                             1,1,0,0,0,0,0,0,1,1,
                                             1,1,1,0,0,0,0,1,1,1]);
    const location = useLocation();
    const {time} = location.state.time;
    const {date} = location.state.date.startDate;
    let dateString = () => (JSON.stringify(location.state.date.startDate, null, '\t').substring(1,11))
    
    function printSeatList(){
        let list = 
        seatList.map((e) => ((e === 0) && <Form.Check aria-label='option 1'/> || 
        (e === 1) && <Form.Check disabled aria-label='option 1'/>));
        return list;
    }

    return (
        <>
            <YoutubeEmbed/>
            <h1>{dateString()}, {time}</h1>
            <div id='cinema-layout'>
            {printSeatList()}
            </div>
        </>
    );
}

export default SelectSeats;
