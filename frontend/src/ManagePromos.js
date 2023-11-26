import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Card, Table, Toast, Form } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';

const ManagePromo = () => {
    const [promos, setPromos] = useState([
        { id: 1, name: 'Discount Promo 1', amount: '20%', code: 'ABC123' },
        { id: 2, name: 'Summer Sale Promo', amount: '15%', code: 'DEF456' },
        // Add more promos as needed
    ]);

    const [showToast, setShowToast] = useState(false);
    const [showAddPromo, setShowAddPromo] = useState(false);
    const [newPromo, setNewPromo] = useState({ name: '', amount: '', code: '' });

    const handleEditPromo = (promoId) => {
        // Handle editing the selected promo (promoId)
        console.log(`Edit promo with ID: ${promoId}`);
    };

    const handleDeletePromo = (promoId) => {
        // Handle deleting the selected promo (promoId)
        const updatedPromos = promos.filter((promo) => promo.id !== promoId);
        setPromos(updatedPromos);
        setShowToast(true);
    };

    const handleSaveChanges = () => {
        // Save the newly added promo to the list
        const updatedPromos = [...promos];
        updatedPromos.push({
            id: promos.length + 1,
            name: newPromo.name,
            amount: newPromo.amount,
            code: newPromo.code,
        });
        setPromos(updatedPromos);
        setShowAddPromo(false);
        setNewPromo({ name: '', amount: '', code: '' });
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
                                    <Form>
                                        <Form.Group controlId="promoName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={newPromo.name}
                                                onChange={(e) => setNewPromo({ ...newPromo, name: e.target.value })}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="promoAmount">
                                            <Form.Label>Amount</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={newPromo.amount}
                                                onChange={(e) => setNewPromo({ ...newPromo, amount: e.target.value })}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="promoCode">
                                            <Form.Label>Code</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={newPromo.code}
                                                onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value })}
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
                                    <th>Name</th>
                                    <th>Amount</th>
                                    <th>Code</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                {/* Table body */}
                                <tbody>
                                {promos.map((promo) => (
                                    <tr key={promo.id}>
                                        <td>{promo.name}</td>
                                        <td>{promo.amount}</td>
                                        <td>{promo.code}</td>
                                        <td>
                                            <Button
                                                variant="success"
                                                className="mr-2"
                                                onClick={() => handleEditPromo(promo.id)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDeletePromo(promo.id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
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
                                <Toast.Body>Promo Successfully Deleted!</Toast.Body>
                            </Toast>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    );
};

export default ManagePromo;
