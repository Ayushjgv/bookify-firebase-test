import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();
  const [UserName, setUserName] = useState('');
  const firebase = useFirebase();
  // console.log(firebase);


  useEffect(() => {
    if (firebase.isLoggedIn) {
      console.log("User is logged in");
      navigate("/");
    } else {
      console.log("User is not logged in");
    }
  }, [firebase, navigate]);



  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("Signinging up a user ...");
    const result = await firebase.registerUser(Email, Password, UserName);
    console.log("Signed up a user ...", result);
    await firebase.updateProfile(UserName);
  }


  return (
    <div className='container mt-5'>
      <Form onSubmit={handlesubmit}>

        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" placeholder="Enter User Name" onChange={(e) => { setUserName(e.target.value) }} value={UserName} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} value={Email} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} value={Password} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    </div>
  )
}

export default Register
