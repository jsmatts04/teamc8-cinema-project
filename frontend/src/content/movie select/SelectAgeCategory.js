import YoutubeEmbed from "./YoutubeEmbed";
import { useState } from "react";
import '../../css/movie select/SelectAgeCategory.css'
import { Link, useLocation } from 'react-router-dom';

function SelectAgeCategory() {
    const location = useLocation();
    const {time} = location.state.time;
    const dateString = location.state.date.dateString;
    const movie = location.state.movie.movie;
    const {count} = location.state.count;

    let [numberTotalTickets, setNumberTotalTickets] = useState(count);
    let [numberAdultTickets, setNumberAdultTickets] = useState(0);
    let [numberChildTickets, setNumberChildTickets] = useState(0);
    let [numberSeniorTickets, setNumberSeniorTickets] = useState(0);

    function handleIncrementAdult() {
        if (numberTotalTickets > 0) {
            numberAdultTickets = numberAdultTickets + 1;
            setNumberTotalTickets(numberTotalTickets-1);
        }
        setNumberAdultTickets(numberAdultTickets);
    }

    function handleDecrementAdult() {
        if (numberAdultTickets !== 0) {
            numberAdultTickets = numberAdultTickets - 1;
            setNumberTotalTickets(numberTotalTickets+1);
        }
        setNumberAdultTickets(numberAdultTickets);
    }

    function handleIncrementChild() {
        if (numberTotalTickets > 0) {
            numberChildTickets = numberChildTickets + 1;
            setNumberTotalTickets(numberTotalTickets-1);
        }
        setNumberChildTickets(numberChildTickets);
    }

    function handleDecrementChild() {
        if (numberChildTickets !== 0) {
            numberChildTickets = numberChildTickets - 1;
            setNumberTotalTickets(numberTotalTickets+1);
        }
        setNumberChildTickets(numberChildTickets);
    }

    function handleIncrementSenior() {
        if (numberTotalTickets > 0) {
            numberSeniorTickets = numberSeniorTickets + 1;
            setNumberTotalTickets(numberTotalTickets-1);
        }
        setNumberSeniorTickets(numberSeniorTickets);
    }

    function handleDecrementSenior() {
        if (numberSeniorTickets !== 0) {
            numberSeniorTickets = numberSeniorTickets - 1;
            setNumberTotalTickets(numberTotalTickets+1);
        }
        setNumberSeniorTickets(numberSeniorTickets);
    }

    function disableLink(path) {
        if (numberTotalTickets===0) {
            return <Link className='confirm-button active' state={{ time:{time}, date:{dateString}, movie:{movie}, numAdult:{numberAdultTickets},numChild:{numberChildTickets},numSenior:{numberSeniorTickets} }} to={path}>Continue</Link>
        } else {
            return <Link className='confirm-button disabled' to=' '>Checkout</Link>
        }
    }

    return (
        <>
            <YoutubeEmbed/>
            <h1 className="title">Select {numberTotalTickets} Remaining Tickets</h1>
            <div id='ticket-select-grid'>
            <button id='plus-minus' onClick={handleDecrementAdult}>-</button>
            <h3 className='ticket-title'>{numberAdultTickets} Adult Tickets</h3>
            <button id='plus-minus' onClick={handleIncrementAdult}>+</button>
            <button id='plus-minus' onClick={handleDecrementChild}>-</button>
            <h3 className='ticket-title'>{numberChildTickets} Children Tickets</h3>
            <button id='plus-minus' onClick={handleIncrementChild}>+</button>
            <button id='plus-minus' onClick={handleDecrementSenior}>-</button>
            <h3 className='ticket-title'>{numberSeniorTickets} Senior Tickets</h3>
            <button id='plus-minus' onClick={handleIncrementSenior}>+</button>
            </div>
            <div className='center-button'>
            {disableLink('/Checkout')}
            </div>
        </>
    );
}

export default SelectAgeCategory;