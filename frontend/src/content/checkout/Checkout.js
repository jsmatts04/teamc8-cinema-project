import YoutubeEmbed from "../movie select/YoutubeEmbed";
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import '../../css/checkout/Checkout.css'
import { useLocation, Link } from "react-router-dom";

function Checkout() {
    let adultPrice = 16.49;
    let childPrice = 13.49;
    let seniorPrice = 14.99;

    const location = useLocation();
    const numAdult = location.state.numAdult.numberAdultTickets;
    const numChild = location.state.numChild.numberChildTickets;
    const numSenior = location.state.numSenior.numberSeniorTickets;
    const {time} = location.state.time;
    const dateString = location.state.date.dateString;
    const movieTitle = location.state.movie.movie.title;

    let totalAdultPrice = numAdult * adultPrice;
    let totalChildPrice = numChild * childPrice; 
    let totalSeniorPrice = numSenior * seniorPrice;

    let subtotalCost = totalAdultPrice+totalChildPrice+totalSeniorPrice;
    let totalFees =(numAdult + numChild + numSenior)* 2.00;
    let totalTaxes = subtotalCost*0.08;
    let totalPrice = subtotalCost+totalTaxes+totalFees;

    let printAdult = () => {return <><div>Adult Tickets ({numAdult})</div><div>$ {totalAdultPrice.toFixed(2)}</div></>}    
    let printChild = () => {return <><div>Child Tickets ({numChild})</div><div>$ {totalChildPrice.toFixed(2)}</div></>}
    let printSenior = () => {return <><div>Senior Tickets ({numSenior})</div><div>$ {totalSeniorPrice.toFixed(2)}</div></>}

    let orderInfo = {
        numAdult: {numAdult},
        numChild: {numChild},
        numSenior: {numSenior},
        totalAdultPrice: {totalAdultPrice},
        totalChildPrice: {totalChildPrice},
        totalSeniorPrice: {totalSeniorPrice},
        totalFees: {totalFees},
        totalTaxes: {totalTaxes},
        totalPrice: {totalPrice}
    }

    return (
        <>
        <YoutubeEmbed/>
        <div className='checkoutGrid'>
        <Form>
        <Form.Group>
                <Form.Label>Name on Card</Form.Label>
                <Form.Control type="text" name='name' placeholder="Name"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Credit Card Number</Form.Label>
                <Form.Control type="number" name='ccNumber' placeholder='Credit Card Number'/>
            </Form.Group>
            <Row>
                <Form.Group as={Col}>
                    <Form.Label>Expiration Date</Form.Label>
                    <Form.Control type="tel" name='expiryDate' placeholder='Valid Thru' pattern='\d\d/\d\d'/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>CVC/CVV</Form.Label>
                    <Form.Control type="tel" name='cvv' placeholder='CVC' pattern='\d{3}'/>
                </Form.Group>
            </Row>
            <Form.Group>
                <Form.Label>Saved Cards</Form.Label>
                <Form.Select>
                    <option>Choose from saved cards</option>
                    <option value='1'>Card ending in 1234</option>
                    <option value='2'>Card ending in 9873</option>
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Enter Promo Code</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Promo Code"
                        className="promo input"
                    />
                    <Button type="submit" variant="outline-light">Apply</Button>
                </InputGroup>   
            </Form.Group>
        </Form>
        <div className='order-summary'>
            <div className='summary-movie-details'>
            <h4>Movie</h4> <p>{movieTitle}</p>
            <h4>Date</h4> <p>{dateString}</p>
            <h4>Time</h4> <p>{time}</p>
            </div>
            <hr/>
            TICKETS
            <div className='two-column-grid'>
            {numAdult !== 0 && printAdult()}
            {numChild !== 0 && printChild()}
            {numSenior !== 0 && printSenior()}
            </div>
            <br/>
            FEES
            <div className='two-column-grid'>
            <div>Online Fees</div><div>$ {totalFees.toFixed(2)}</div>
            </div>
            <hr/>
            <div className='two-column-grid'>
            <div>Taxes</div><div>$ {totalTaxes.toFixed(2)}</div>
            </div>
            <hr/>
            <div className='two-column-grid'>
            <div>TOTAL</div><div>$ {totalPrice.toFixed(2)}</div>
            </div>
        </div>
        </div>
        <Link state={{movie:{movieTitle}, date:{dateString}, time:{time}, orderInfo:{orderInfo}}} className='confirm-button' to='/order/confirmation'>Submit Order</Link>
        </>
    );
}

export default Checkout;