import React from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

const Detail = () => {
    const params = useParams();
    const firebase = useFirebase();

    const [data, setData] = useState(null);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        firebase.getBookByID(params.id).then((data) => {
            setData(data.data());
        })
    }, [firebase, params.id]);


    if (data == null) return <h1>Loading...</h1>

    const orderHandler = async () => {
        const result = await firebase.placeOrder(params.id, qty);
        console.log("order placed ", result);
    };

    return (
        <div className='container mt-5'>
            <h1>{data.name}</h1>
            <p>Price: {data.price}</p>
            <p>ISBN: {data.isbn}</p>
            <p>User Name: {data.userName}</p>
            <p>User Email: {data.userEmail}</p>
            <p>Photo URL: {data.photoURL}</p>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" placeholder="Enter Quantity" onChange={(e) => { setQty(e.target.value) }} value={qty} />
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={orderHandler}>Buy</Button>
        </div>
    )
}

export default Detail