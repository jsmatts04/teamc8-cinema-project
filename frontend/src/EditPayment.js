import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { useState } from 'react';
import { deletePaymentCard, editPaymentCard } from './api/PaymentCardApi';
import { useNavigate } from 'react-router-dom';

function EditPayment(props) {
    let {setList, list, expirationDate, id, lastFourDigits, cardType, nameOnCard} = props;

    const [expDate, setExpDate] = useState(expirationDate);
    const [cardNum, setCardNum] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [name, setName] = useState(nameOnCard);

    const inputLabelStyle = {
        fontSize: '15px',
    };

    const [showEdit, setShowEdit] = useState(false);
    const toggleShow = () => setShowEdit(!showEdit);
    const nav = useNavigate();
    const handleDelete = () => {
        setLoading(true)
        deletePaymentCard(id).then(() => {
            setLoading(false)
            nav('/EditProfile', {state: {showPaymentToastDelete: true, showPaymentToast: false}})
            setList(list.filter((card) => card.id !== id).map((card, index) => ({...card, id: index})))
            }     
        ).catch((err)=>(console.log(err)))
        setLoading(false)
    }
    const [loading, setLoading] = useState(false)
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        let card = {
            id: id,
            cardType: cardType,
            expirationDate: expDate,
            cardNumber: cardNum,
            nameOnCard: name        
        }
        editPaymentCard(card).then(() => {
            setShowEdit(false)
            setLoading(false)
            nav('/EditProfile', {state: {toastId: 'payment-toast'}})
        }
        ).catch((err)=>(console.log(err)))
        setLoading(false)
    }

    const handleCancel = (e) => {
        setShowEdit(false)
    }

    return(
        <>
        {!showEdit && <div style={{display:"inline-flex", width:'100%', justifyContent:'space-around', background:'#00000040', padding:'4px',borderRadius:'5px',marginBottom:'8px'}}><h4>{cardType} Card ending in {lastFourDigits}</h4><Button variant='warning' onClick={toggleShow}>Edit</Button><Button variant='danger' onClick={handleDelete}>X</Button></div>}
        {showEdit && <form onSubmit={handleSubmit}>
                        <hr/>
                        <p style={{ color: 'black' }}>Card</p>
                        <div className="mb-3">
                            <label htmlFor="nameOnCard" style={inputLabelStyle}>Name on Card</label>
                            <input required type="text" value={nameOnCard} placeholder="Enter Name on Card" className="form-control" id="nameOnCard" onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cardNumber" style={inputLabelStyle}>Card Number</label>
                            <input required type="text" placeholder={'....'+lastFourDigits} className="form-control" id="cardNumber" onChange={(e) => setCardNum(e.target.value)}/>
                        </div>
                        <div className="row mb-3">
                        <div className="col mb-3">
                            <label htmlFor="expirationDate" style={inputLabelStyle}>Expiration Date</label>
                            <input required type="text" value={expirationDate} placeholder="MM/YY" className="form-control" id="expirationDate" onChange={(e) => setExpDate(e.target.value)}/>
                        </div>
                        <div className="col mb-3">
                            <label htmlFor="cvv" style={inputLabelStyle}>CVV</label>
                            <input required type="text" placeholder="Enter CVV" className="form-control" id="cvv" onChange={(e) => setSecurityCode(e.target.value)}/>
                        </div>
                        </div>
                        <div className="row">
                            <Button
                                type='submit'
                                className="col"
                                variant='success'
                                disabled={loading}
                            >{loading ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                /> : 'Save Payment'}
                            </Button>
                            <Button
                                className="col"
                                onClick={handleDelete}
                                variant='danger'
                                disabled={loading}
                            >{loading ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                /> : 'Delete Payment'}
                            </Button>
                            <Button
                                className="col"
                                onClick={handleCancel}
                                variant='primary'
                            >
                                Cancel Edit
                            </Button>
                        </div>
                        <hr/>
                    </form>
                    }
        </>
    );
}

export default EditPayment;