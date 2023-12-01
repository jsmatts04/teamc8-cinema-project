import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import '../../css/checkout/Checkout.css'
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addBooking } from '../../api/BookingApi' 
import { validatePromo } from "../../api/PromotionApi";
import { addTickets } from "../../api/TicketApi";
import { useEffect } from 'react'
import { getAllUserInfo } from '../../api/UserApi'

function Checkout({setUserInfo, userInfo, movie, booking, setBooking}) {
    let adultPrice = 16.49;
    let childPrice = 13.49;
    let seniorPrice = 14.99;
    
    const location = useLocation();
    const numAdult = location.state.numAdult.numberAdultTickets;
    const numChild = location.state.numChild.numberChildTickets;
    const numSenior = location.state.numSenior.numberSeniorTickets;
    const seats = location.state.seats;
    let [dateString, time] = booking.showtime.timestamp.split('T');
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
    time = convertTime24to12(time)

    let totalAdultPrice = numAdult * adultPrice;
    let totalChildPrice = numChild * childPrice; 
    let totalSeniorPrice = numSenior * seniorPrice;

    let subtotalCost = totalAdultPrice+totalChildPrice+totalSeniorPrice;
    let totalFees =(numAdult + numChild + numSenior)* 2.00;
    let totalTaxes = subtotalCost*0.08;
    const [discount, setDiscount] = useState(0);
    let totalPrice = (subtotalCost+totalTaxes+totalFees) * ((100-discount)/100);

    let printAdult = () => {return <><div>Adult Tickets ({numAdult})</div><div>$ {totalAdultPrice.toFixed(2)}</div></>}    
    let printChild = () => {return <><div>Child Tickets ({numChild})</div><div>$ {totalChildPrice.toFixed(2)}</div></>}
    let printSenior = () => {return <><div>Senior Tickets ({numSenior})</div><div>$ {totalSeniorPrice.toFixed(2)}</div></>}

    const [promo, setPromo] = useState();
    const [promoInput, setPromoInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function applyPromo(promo) {
        setPromo();
        setDiscount(0);
        setPromoInput('');
        validatePromo(promo).then(
            response => {
                console.log(response)
                if (response.status !== 500) {
                    setPromo(response.data);
                    setDiscount(response.data.discountAmount);
                } else {
                    setErrorMessage('Promo code does not exist')
                }
            }
        ).catch((err) => (console.log(err)))
    }

    let paymentCards=[];
    useEffect(()=> {
        getAllUserInfo().then((response)=>{
            setUserInfo(response.data);
        }).catch(err=>console.log(err))
    },[])
    
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

    const [cardSelected, setCardSelected] = useState('');

    let nav = useNavigate();

    const [loading, setLoading] = useState(false);
    const handleCheckout = (e) => {
        setLoading(true)
        e.preventDefault();
        if ((newPaymentInfo.nameOnCard !== '' && newPaymentInfo.cardNumber !== '' && newPaymentInfo.expirationDate !== '' && newPaymentInfo.securityCode !== '') || (savedCardSelected)) {
            let newBooking = {
                showtimeId: booking.showtime.id,
                paymentCardId: cardSelected !== undefined ? cardSelected : '',
                promotionId: promo !== undefined ? promo.id: '',
                total: totalPrice.toFixed(2),
                date: ''
            };
            newBooking.date = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate();
            console.log(newBooking)
            if (newBooking.date.length < 10) {
                if (newBooking.date.lastIndexOf('-') - newBooking.date.indexOf('-') !== 3) {
                    newBooking.date = newBooking.date.substring(0,newBooking.date.indexOf('-')+1) + 0 + newBooking.date.substring(newBooking.date.indexOf('-')+1) 
                }
                if (newBooking.date.length !== 10) {
                    newBooking.date = newBooking.date.substring(0,newBooking.date.lastIndexOf('-')+1) + 0 + newBooking.date.substring(newBooking.date.lastIndexOf('-')+1)
                }
            }

            addBooking(newBooking).then((response) => {
                let id = response.data;
                let typeArray = [];
                for (let i = 0; i < numChild; i++) {
                    typeArray = [...typeArray, 1]
                }
                for (let i = 0; i < numAdult; i++) {
                    typeArray = [...typeArray, 2]
                }
                for (let i = 0; i < numSenior; i++) {
                    typeArray = [...typeArray, 3]
                }
                let ticketArray = [];
                for (let i = 0; i < numChild+numAdult+numSenior; i++) {
                    let ticket = {
                        typeId: typeArray[i], 
                        seatId: seats[i].substring(0,seats[i].indexOf(':'))
                    }
                    ticketArray = [...ticketArray, ticket]
                }
                setBooking(newBooking)
                setBooking({...booking, id: id, extraDetails:{
                    seats: seats,
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
                }})
                setNewPaymentInfo({})
                console.log(booking)
                console.log(ticketArray)
                addTickets(id, ticketArray).then((response) => {
                    console.log(response.data)
                    setLoading(false)
                    nav('../confirmation')
                }).catch(err => console.log(err))
                }
            ).catch((err) => {console.log(err)})
        } else {
            // display error
            setErrorMessage('ERROR: Please choose a saved card or fill out all the payment fields')
            setTimeout(()=>setErrorMessage(''),2000)
        }
    }
    
    const [savedCardSelected, setSavedCardSelected] = useState(false);
    function handleCardSelect(el) {
        if (el !== -1) {
            setSavedCardSelected(true)
            setCardSelected(el)
        } else {
            setCardSelected('');
            setSavedCardSelected(false);
        }
    }

    function handleCancel() {
        setBooking('');
        nav('/');
    }

    return (
        <>
        <h4 style={{color:'red', left:'25%', position:'absolute'}}>{errorMessage}</h4>
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
                        <option value={card.id}>Card ending in {card.lastFourDigits}</option>
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
                    <Button onClick={()=>applyPromo(promoInput)} variant="outline-light">Apply</Button>
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
            Seats {seats.map((seat,index) => (index !== seats.length - 1 ? (seat.substring(seat.indexOf(':')+1) + ", ") : (seat.substring(seat.indexOf(':')+1))))}
            </div>
            FEES
            <div className='two-column-grid'>
            <div>Online Fees</div><div>$ {totalFees.toFixed(2)}</div>
            </div>
            <hr/>
            <div className='two-column-grid'>
            <div>Taxes</div><div>$ {totalTaxes.toFixed(2)}</div>
            {promo !== undefined && <><div style={{color:'lightgreen'}}>Code: {promo.code}</div><div style={{color:'lightgreen'}}>{promo.discountAmount} %</div></>}
            </div>
            <hr/>
            <div className='two-column-grid'>
            <div>TOTAL</div><div>$ {totalPrice.toFixed(2)}</div>
            </div>
            <div className='center-button'>
            
            <Button variant='warning' type='submit' disabled={loading}> 
            {loading ? <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            /> : 'Submit Order'}</Button>
            <Button variant='dark' onClick={()=>handleCancel()} id ='cancel-button'>Cancel</Button>
            </div>
        </div>
        </div>
        </Form>
        
        </>
    );
}

export default Checkout;