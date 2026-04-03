import { React, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { messaging } from './context/Firebase';
import { getToken } from 'firebase/messaging';
//pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import List from './pages/List';
import Detail from './pages/Detail';
import Orders from './pages/Orders';
import ViewOrderDetails from './pages/ViewOrderDetails';
//components
import Navbarr from './components/Navbarr';


const App = () => {

  const [isTokenFound, setTokenFound] = useState(false);

  const requestpermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted");
      try {
        const token = await getToken(messaging, { vapidKey: "BEl_ZgBv79TD3rJaoOdq2MCDZ875wlvsnOgY7XjldJ8sbbrNFh9RKNdO6grA5PjH-ZTCFzaCDum501Kpvcyjheo" });
        console.log("Token retrieved: ", token);
      } catch (e) {
        console.error("An error occurred while retrieving token: ", e);
      }
    }
  }

  useEffect(() => {
    requestpermission();
  }, []);


  return (
    <div>
      <Navbarr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/list" element={<List />} />
        <Route path="/book/view/:id" element={<Detail />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/book/orders/:id" element={<ViewOrderDetails />} />
      </Routes>
    </div>
  )
}

export default App
