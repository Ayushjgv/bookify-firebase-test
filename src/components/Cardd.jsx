import React from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';


const Cardd = (props) => {
    const navigate = useNavigate();

    // console.log(props);


    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text>
                    this book is uploaded by {props.userName} and it has price {props.price}
                </Card.Text>
                <Card.Link onClick={() => navigate(props.link)} style={{ cursor: "pointer" }}>Card Link</Card.Link>
            </Card.Body>
        </Card>
    )
}

export default Cardd;