import React from 'react';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useFirebase } from '../context/Firebase';
import Card from '../components/Cardd';
import CardGroup from 'react-bootstrap/CardGroup';

const Home = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.ListAllBooks().then((books) => {
      setBooks(books.docs);
      // console.log(books.docs[0].data());
    })
  }, []);


  return (
    <div className='container mt-5'>
      Items List
      {
        <CardGroup>
          {books.map((book) => (
            <Card key={book.id} link={`/book/view/${book.id}`} id={book.id} {...book.data()} />
          ))}
        </CardGroup>
      }
    </div>
  )
}

export default Home;