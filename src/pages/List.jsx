import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';


const List = () => {

    const [Name, setName] = useState('');
    const [ISBN, setIsbn] = useState('');
    const [Price, setPrice] = useState('');
    const [cover, setCover] = useState(null);
    const firebase = useFirebase();



    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log("Adding a book ...");
        await firebase.handleCreateNewListing(Name, ISBN, Price);
    }

    return (
        <div className='container mt-5'>
            <Form onSubmit={handlesubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Book Name" onChange={(e) => { setName(e.target.value) }} value={Name} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control type="text" placeholder="Enter ISBN" onChange={(e) => { setIsbn(e.target.value) }} value={ISBN} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" placeholder="Enter Price" onChange={(e) => { setPrice(e.target.value) }} value={Price} />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Book Cover</Form.Label>
                    <Form.Control type="file" placeholder="Upload Book Cover" onChange={(e) => { setCover(e.target.files[0]) }} />
                </Form.Group> */}


                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        </div>
    )
}

export default List