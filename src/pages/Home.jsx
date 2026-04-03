import React from 'react';
import { Button } from 'react-bootstrap';
import { useFirebase } from '../context/Firebase';

const Home = () => {
  const firebase = useFirebase();

  return (
    <div>
      Home
    </div>
  )
}

export default Home;