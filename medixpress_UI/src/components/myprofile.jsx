import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Profile() {
    const [profile, setProfile] = useState({});
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchProfile = async () => {
            if (!userId) return;
            try {
                const response = await axios.get(`http://localhost:8081/api/Accounts/${userId}`);
                setProfile(response.data.Value[0]);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfile();
    }, [userId]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/gateway/Orders/GetOrdersByUserId/${userId}`);
            setOrders(response.data);
            console.log(response.data);
            
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <Container className="mt-4">
            <Card>
                <Card.Body>
                    <Card.Title>Profile Details</Card.Title>
                    <Card.Text><strong>Username:</strong> {profile.UserName}</Card.Text>
                    <Card.Text><strong>Email:</strong> {profile.Email}</Card.Text>
                    <Card.Text><strong>Role:</strong> {profile.Roles}</Card.Text>
                    <Button variant="primary" onClick={fetchOrders}>View Orders</Button>
                </Card.Body>
            </Card>
            {orders.length > 0 && (
                <Container className="mt-4">
                    <h3>Orders</h3>
                    {orders.map(order => (
                        <Card key={order.id} className="mb-2">
                            <Card.Body>
                                <Card.Text><strong>Order ID:</strong> {order.orderId}</Card.Text>
                                <Card.Text><strong>Order Address:</strong> {order.address}</Card.Text>
                                <Card.Text><strong>Total Amount:</strong> {order.total}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Container>
            )}
        </Container>
    );
}

export default Profile;
