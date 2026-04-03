import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const ViewOrderDetails = () => {
    const params = useParams();
    const firebase = useFirebase();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if (firebase.isLoggedIn) {
            firebase.getOrders(params.id).then((orders) => {
                setOrders(orders.docs);
            });
        }
    }, [firebase]);

    return (
        <div>
            <h1>Order Details</h1>
            {orders.map((order) => {
                const data = order.data();
                return (
                    <div key={order.id}>
                        <p>Order ID: {order.id}</p>
                        <p>Book ID: {data.bookId}</p>
                        <p>Quantity: {data.qty}</p>
                        <p>User ID: {data.userId}</p>
                        <p>User Email: {data.userEmail}</p>
                        <p>User Name: {data.userName}</p>
                        <p>Photo URL: {data.photoURL}</p>
                    </div>
                );
            })}
        </div>
    )
}

export default ViewOrderDetails