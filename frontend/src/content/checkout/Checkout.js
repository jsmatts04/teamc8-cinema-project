import YoutubeEmbed from "../movie select/YoutubeEmbed";
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import '../../css/checkout/Checkout.css'
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addBooking } from '../../api/BookingApi' 

function Checkout({userInfo, booking, setBooking}) {
    let adultPrice = 16.49;
    let childPrice = 13.49;
    let seniorPrice = 14.99;

    const location = useLocation();
    const numAdult = location.state.numAdult.numberAdultTickets;
    const numChild = location.state.numChild.numberChildTickets;
    const numSenior = location.state.numSenior.numberSeniorTickets;
    const {time} = location.state.time;
    const dateString = location.state.date.dateString;
    const movie = location.state.movie.movie;
    const seats = location.state.seats;

    let totalAdultPrice = numAdult * adultPrice;
    let totalChildPrice = numChild * childPrice; 
    let totalSeniorPrice = numSenior * seniorPrice;

    let subtotalCost = totalAdultPrice+totalChildPrice+totalSeniorPrice;
    let totalFees =(numAdult + numChild + numSenior)* 2.00;
    let totalTaxes = subtotalCost*0.08;
    let discount = 0;
    let totalPrice = (subtotalCost+totalTaxes+totalFees) * ((100-discount)/100);

    let printAdult = () => {return <><div>Adult Tickets ({numAdult})</div><div>$ {totalAdultPrice.toFixed(2)}</div></>}    
    let printChild = () => {return <><div>Child Tickets ({numChild})</div><div>$ {totalChildPrice.toFixed(2)}</div></>}
    let printSenior = () => {return <><div>Senior Tickets ({numSenior})</div><div>$ {totalSeniorPrice.toFixed(2)}</div></>}
    
    let orderInfo = {
        numAdult,
        numChild,
        numSenior,
        totalAdultPrice,
        totalChildPrice,
        totalSeniorPrice,
        totalFees,
        totalTaxes,
        totalPrice
    }

    function printSeats() {
        let string = "";
        for (let i = 0; i < seats.length - 1; i++) {
            string += seats[i] + ', ';
        }
        string += seats[seats.length - 1];
        return string;
    }

    let promo = undefined;
    const [promoInput, setPromoInput] = useState('');
    function applyPromo(promo) {
        /*
        checkPromo(promo).then(
            (response) => {
                promo = response.data;
                discount = promo.discountAmount
            }
        ).catch((err) => (console.log(err)))
        */
    }

    let paymentCards=[];
    if (userInfo.paymentCards !== undefined) {
        paymentCards=userInfo.paymentCards;
    }

    const [newPaymentInfo, setNewPaymentInfo] = useState({
        nameOnCard:'',
        cardNumber:'',
        lastFourDigits:'',
        expirationDate:'',
        securityCode:''
    });

    const [cardSelectedLast4Digits, setCardSelectedLast4Digits] = useState('');

    const convertTime12to24 = (time12h) => {
        const [time, modifier] = time12h.split(' ');
      
        let [hours, minutes] = time.split(':');
      
        if (hours === '12') {
          hours = '00';
        }
      
        if (modifier === 'PM') {
          hours = parseInt(hours, 10) + 12;
        }
      
        return `${hours}:${minutes}`;
      }

    let nav = useNavigate();

    const handleCheckout = (e) => {
        e.preventDefault();
        if ((newPaymentInfo.nameOnCard !== '' && newPaymentInfo.cardNumber !== '' && newPaymentInfo.expirationDate !== '' && newPaymentInfo.securityCode !== '') || (savedCardSelected)) {
            let newBooking = {
                userEmail:'',
                paymentCardLastFourDigits:'',
                promotion:{},
                showtime:{},
                total:'',
                date:''
            };
            newBooking.userEmail= userInfo.user.email 
            newBooking.paymentCardLastFourDigits = savedCardSelected ? booking.paymentCardLastFourDigits = cardSelectedLast4Digits : (
                booking.paymentCardLastFourDigits = newPaymentInfo.cardNumber.substring(newPaymentInfo.cardNumber.length - 4)
            )
            newBooking.promotion = promo === undefined ? booking.promotion=promo : booking.promotion=undefined;
            newBooking.showtime = {
                timestamp: dateString+'T'+convertTime12to24(time),
                room: {
                    id: 1,
                    numSeats: 25
                },
                movie: movie,
            }
            newBooking.total = totalPrice.toFixed(2)
            newBooking.date = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate()

            let extraDetails = {
                seats: printSeats(),
                numAdult: numAdult,
                numChild: numChild,
                numSenior: numSenior,
                totalAdultPrice: totalAdultPrice,
                totalChildPrice: totalChildPrice,
                totalSeniorPrice: totalSeniorPrice,
                totalFees: totalFees,
                totalTaxes: totalTaxes,
                totalPrice: totalPrice,
                discount: discount
            }
            newBooking.extraDetails = extraDetails;
            setBooking(newBooking)
            setNewPaymentInfo({})
            nav('../confirmation')

            /*
            addBooking(newBooking).then(() => {
                let extraDetails = {
                    seats: printSeats(),
                    numAdult: numAdult,
                    numChild: numChild,
                    numSenior: numSenior,
                    totalAdultPrice: totalAdultPrice,
                    totalChildPrice: totalChildPrice,
                    totalSeniorPrice: totalSeniorPrice,
                    totalFees: totalFees,
                    totalTaxes: totalTaxes,
                    totalPrice: totalPrice,
                    discount: discount
                }
                newBooking.extraDetails = extraDetails;
                setBooking(newBooking)
                setNewPaymentInfo({})
                nav('/Order/Confirmation')
                }
            ).catch((err) => {console.log(err)}) */
        } else {
            // display error
            console.log('error occured')
        }
    }
    
    const [savedCardSelected, setSavedCardSelected] = useState(false);
    function handleCardSelect(el) {
        if (el !== -1) {
            setSavedCardSelected(true)
            setCardSelectedLast4Digits(el)
        } else {
            setCardSelectedLast4Digits('');
            setSavedCardSelected(false);
        }
    }

    function handleCancel() {
        setBooking('');
        nav('/');
    }

    return (
        <>
        <Form onSubmit={handleCheckout}>
        <div className='checkoutGrid'>
        <div>
        <Form.Group>
                <Form.Label>Name on Card</Form.Label>
                <Form.Control type="text" name='name' placeholder="Name" value={newPaymentInfo.nameOnCard} onChange={(e) => setNewPaymentInfo({...newPaymentInfo, nameOnCard:e.target.value})}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Credit Card Number</Form.Label>
                <Form.Control type="number" name='ccNumber' placeholder='Credit Card Number' value={newPaymentInfo.cardNumber} onChange={(e) => setNewPaymentInfo({...newPaymentInfo, cardNumber:e.target.value})}/>
            </Form.Group>
            <Row>
                <Form.Group as={Col}>
                    <Form.Label>Expiration Date</Form.Label>
                    <Form.Control type="tel" name='expiryDate' placeholder='MM/YY' pattern='\d\d/\d\d' value={newPaymentInfo.expirationDate} onChange={(e) => setNewPaymentInfo({...newPaymentInfo, expirationDate:e.target.value})}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>CVC/CVV</Form.Label>
                    <Form.Control type="tel" name='cvv' placeholder='CVC' pattern='\d{3,4}' value={newPaymentInfo.securityCode} onChange={(e) => setNewPaymentInfo({...newPaymentInfo, securityCode:e.target.value})}/>
                </Form.Group>
            </Row>
            {(paymentCards.length !== 0) &&
                <Form.Group>
                <Form.Label>Saved Cards</Form.Label>
                <Form.Select title='card-selector' onChange={(e) => handleCardSelect(e.target.value)}>
                    <option value={-1}>Choose from saved card(s)</option>
                    {paymentCards.map((card) => (
                        <option value={card.lastFourDigits}>Card ending in {card.lastFourDigits}</option>
                    ))}
                </Form.Select>
                </Form.Group>
            }
            <Form.Group>
                <Form.Label>Enter Promo Code</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Promo Code"
                        className="promo input"
                        onChange={(e) => setPromoInput(e.target.value)}
                    />
                    <Button onClick={applyPromo('')} variant="outline-light">Apply</Button>
                </InputGroup>   
            </Form.Group>
        </div>
        <div className='order-summary'>
            <hr/>
            <div className='summary-movie-details'>
            <h4>Movie</h4> <h4>{movie.title}</h4>
            <h4>Date</h4> <h4>{dateString}</h4>
            <h4>Time</h4> <h4>{time}</h4>
            </div>
            <hr/>
            TICKETS
            <div className='two-column-grid'>
            {numAdult !== 0 && printAdult()}
            {numChild !== 0 && printChild()}
            {numSenior !== 0 && printSenior()}
            Seats {printSeats()}
            </div>
            FEES
            <div className='two-column-grid'>
            <div>Online Fees</div><div>$ {totalFees.toFixed(2)}</div>
            </div>
            <hr/>
            <div className='two-column-grid'>
            <div>Taxes</div><div>$ {totalTaxes.toFixed(2)}</div>
            {promo !== undefined && <><div>{promo.code}</div><div>{discount}%</div></>}
            </div>
            <hr/>
            <div className='two-column-grid'>
            <div>TOTAL</div><div>$ {totalPrice.toFixed(2)}</div>
            </div>
            <div className='center-button'>
            <Button variant='warning' type='submit'>Submit Order</Button>
            <Button variant='dark' onClick={()=>handleCancel()} id ='cancel-button'>Cancel</Button>
            </div>
        </div>
        </div>
        </Form>
        
        </>
    );
}

export default Checkout;