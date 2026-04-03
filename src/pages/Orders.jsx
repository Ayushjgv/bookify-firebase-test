import { React, useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import Cardd from '../components/Cardd';
import { CardGroup } from 'react-bootstrap';

const Orders = () => {
    const firebase = useFirebase();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if (firebase.isLoggedIn) {
            firebase.fetchMyBooks(firebase.User.uid).then((orders) => {
                setOrders(orders.docs);
            });
        }
    }, [firebase]);


    if (!firebase.isLoggedIn) return <h1>Please Login </h1>


    return (
        <div>
            <CardGroup className='m-5' >
                {orders.map((order) => (
                    <Cardd key={order.id} link={`/book/orders/${order.id}`} id={order.id} {...order.data()} />
                ))}
            </CardGroup>
        </div>
    )
}

export default Orders;