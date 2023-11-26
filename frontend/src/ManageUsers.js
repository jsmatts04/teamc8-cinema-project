import React, { Component } from 'react';
import { Table, Button, Card, Container, Toast } from 'react-bootstrap';

class ManageUsers extends Component {
    state = {
        users: [
            { id: 1, firstName: 'John', lastName: 'Doe', subscribed: true },
            { id: 2, firstName: 'Jane', lastName: 'Smith', subscribed: false },
            // Add more users as needed
        ],
        showToast: false,
    };

    handleDeleteUser = (userId) => {
        // Handle deleting the selected user
        const updatedUsers = this.state.users.filter((user) => user.id !== userId);
        this.setState({ users: updatedUsers, showToast: true });

        // Perform additional actions like sending deletion request to the backend
        // You might want to debounce the deletion or make a network request here
        // to delete the user from your database.

        // For now, let's simulate a delay and hide the toast after a few seconds.
        setTimeout(() => {
            this.setState({ showToast: false });
        }, 3000);
    };

    render() {
        const cardStyle = {
            maxWidth: '700px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: 'white',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
        };

        const toastStyle = {
            position: 'absolute',
            top: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#28a745',
        };

        return (
            <div style={{ position: 'relative' }}>
                <Toast
                    show={this.state.showToast}
                    onClose={() => this.setState({ showToast: false })}
                    style={toastStyle}
                    delay={3000}
                    autohide
                >
                    <Toast.Body>User Successfully Deleted!</Toast.Body>
                </Toast>
                <div style={{ background: 'linear-gradient(180deg, #000000 0%, #923CB5 100%)', minHeight: '100vh', paddingTop: '20px' }}>
                    <Container>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
                            <Card style={cardStyle}>
                                <Card.Body>
                                    <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Users</h1>
                                    <Table striped bordered hover>
                                        <thead>
                                        <tr>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Promotions</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.users.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.subscribed ? 'Subscribed' : 'Unsubscribed'}</td>
                                                <td>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => this.handleDeleteUser(user.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

export default ManageUsers;
