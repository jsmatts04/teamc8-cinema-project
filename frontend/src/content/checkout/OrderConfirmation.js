import YoutubeEmbed from "../movie select/YoutubeEmbed";
import Card from 'react-bootstrap/Card'
import { useLocation, Link } from 'react-router-dom'
import '../../css/checkout/OrderConfirmation.css'

function OrderConfirmation ({booking}) {
    console.log(booking);
    let {userEmail, showtime, paymentCardLastFourDigits, total} = booking;

    const location = useLocation();
    let [dateString,time] = showtime.timestamp.split('T')
    const movie = showtime.movie;
    let orderInfo = booking.extraDetails;
    let {numAdult,numChild,numSenior,totalAdultPrice,totalChildPrice,totalSeniorPrice,totalFees,totalTaxes,totalPrice, seats} = orderInfo;
    let printAdult = () => {return <><div>Adult Tickets ({numAdult})</div><div>$ {totalAdultPrice.toFixed(2)}</div></>}    
    let printChild = () => {return <><div>Child Tickets ({numChild})</div><div>$ {totalChildPrice.toFixed(2)}</div></>}
    let printSenior = () => {return <><div>Senior Tickets ({numSenior})</div><div>$ {totalSeniorPrice.toFixed(2)}</div></>}

    return(
        <>
        <h2 className='center-text'>Order Completed Successfully</h2>   
        <h3 className='center-text'>A copy of this confirmation has been sent to {userEmail}</h3>
        
        <Card id='confirmation-card' bg='dark'>
            <Card.Header><h3>Booking #10056794</h3></Card.Header>
            <div id='order-summary' className='two-column-grid'>
                <div className='summary-movie-details' id='order-summary'>
                <h4>Movie:</h4> <h4>{movie.title}</h4>
                <h4>Date:</h4> <h4>{dateString}</h4>
                <h4>Time:</h4> <h4>{time}</h4>
                <h4>Theatre:</h4> <h4>Hall {showtime.room.id}</h4>
                <h4>Seats:</h4> <h4>{seats}</h4>
                </div>
                <div className='two-column-grid'>
                {numAdult !== 0 && printAdult()}
                {numChild !== 0 && printChild()}
                {numSenior !== 0 && printSenior()}
                <div>Online Fees</div> <div>$ {totalFees.toFixed(2)}</div>
                <div>Taxes</div> <div>$ {totalTaxes.toFixed(2)}</div>
                {booking.promotion !== undefined && <><div>Discount</div> <div>{booking.promotion.discountAmount}%</div></>}
                <div>Total</div> <div>$ {totalPrice.toFixed(2)}</div>
                </div>
            </div>
            <div className="center-text">
            <Link className='confirm-button' to='/'>Back to Home</Link>
            </div>
        </Card>
        
        </>
    );
}

export default OrderConfirmation;