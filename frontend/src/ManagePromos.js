import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Card, Table, Toast, Form } from 'react-bootstrap';
import { getAllPromos, addPromo } from './api/PromotionApi';

const ManagePromo = () => {
    const [promos, setPromos] = useState([]);

    useEffect(() => {
        getAllPromos().then(
            (response) => {
                setPromos(response.data)
            }
        ).catch(
            (err) => (console.log(err))
        )
    },[promos.length])

    const [showToast, setShowToast] = useState(false);
    const [showAddPromo, setShowAddPromo] = useState(false);
    const [newPromo, setNewPromo] = useState({
        discountAmount: 0,
        startDate: new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate(),
        endDate: new Date().getFullYear()  + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate(),
        code: ''
    })
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    // Assumed no delete and edit cause we send out emails instantly after adding a promotion

    const handleSaveChanges = () => {
        console.log(newPromo)
        if (newPromo.startDate > newPromo.endDate) {
            setErrMessage('Inputted dates are not in a valid order');
            setShowErrorMessage(true)
        } else if (newPromo.discountAmount <= 0) {
            setErrMessage('Discount amount must be greater than 0');
            setShowErrorMessage(true);
        } else if (newPromo.code.trim() === '' || newPromo.code === 'undefined') {
            setErrMessage('Code cannot be empty');
            setShowErrorMessage(true);
        } else {
            addPromo(newPromo).then((response) => {
                console.log(response.data)
                setShowAddPromo(false);
                setShowToast(true);
            }).catch((err) => (console.log(err)))
        }
    };

    return (
        <div style={{ background: 'linear-gradient(180deg, #000000 0%, #923CB5 100%)', minHeight: '100vh', paddingTop: '20px' }}>
            <Container style={{ maxWidth: '700px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
                    <Card style={{ backgroundColor: 'white', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)' }}>
                        <Card.Body>
                            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Promos</h1>
                            <Button
                                variant="primary"
                                style={{ display: 'block', margin: '0 auto', marginBottom: '20px' }}
                                onClick={() => setShowAddPromo(true)}
                            >
                                Add Promo
                            </Button>
                            {showAddPromo && (
                                <div style={{ marginBottom: '20px' }}>
                                    {showErrorMessage && (
                                        <h4 style={{fontSize:'15px',color: 'red'}}>ERROR: {errMessage}</h4>
                                    )}
                                    <Form>
                                        <Form.Group controlId="promoCode">
                                            <Form.Label>Code</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={newPromo.code}
                                                placeholder='Enter code here'
                                                onChange={(e) => {
                                                    setNewPromo({ ...newPromo, code: e.target.value })
                                                    setShowErrorMessage(false);
                                                }}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="promoAmount">
                                            <Form.Label>Amount</Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={newPromo.discountAmount}
                                                onChange={(e) => {
                                                    setNewPromo({ ...newPromo, discountAmount: e.target.value });
                                                    setShowErrorMessage(false);
                                                }}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="promoStartDate">
                                            <Form.Label>Start Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={newPromo.startDate}
                                                onChange={(e) => {
                                                    setNewPromo({ ...newPromo, startDate: e.target.value });
                                                    setShowErrorMessage(false);
                                                }}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="promoEndDate">
                                            <Form.Label>End Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={newPromo.endDate}
                                                onChange={(e) => {
                                                    setNewPromo({ ...newPromo, endDate: e.target.value });
                                                    setShowErrorMessage(false);
                                                }}
                                            />
                                        </Form.Group>
                                        <Button variant="primary" onClick={handleSaveChanges}>
                                            Save Changes
                                        </Button>
                                    </Form>
                                </div>
                            )}
                            <Table striped bordered hover>
                                {/* Table header */}
                                <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Amount</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                </tr>
                                </thead>
                                {/* Table body */}
                                <tbody>
                                {promos.map((promo) => (
                                    <tr key={promo.id}>
                                        <td>{promo.code}</td>
                                        <td>{promo.discountAmount}</td>
                                        <td>{promo.startDate}</td>
                                        <td>{promo.endDate}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <Link to="/AdminHomePage">
                                <Button variant="primary" style={{ display: 'block', margin: '0 auto', marginTop: '20px' }}>
                                    Back
                                </Button>
                            </Link>
                            <Toast
                                show={showToast}
                                onClose={() => setShowToast(false)}
                                style={{
                                    position: 'fixed',
                                    top: '65px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    backgroundColor: '#28a745',
                                }}
                                delay={3000}
                                autohide
                            >
                                <Toast.Body>Promo Successfully Added!</Toast.Body>
                            </Toast>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    );
};

export default ManagePromo;
