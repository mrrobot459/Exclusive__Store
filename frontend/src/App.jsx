import React from 'react'
import Layout from './pages/Layout.jsx';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import SignUp from "./pages/SignUp.jsx"
import Login from "./pages/Login.jsx"
import Wishlist from './pages/Wishlist.jsx';
import Cart from './pages/Cart.jsx';



const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />

          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>
      </Routes>

    </>)
}

export default App 
