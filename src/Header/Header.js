import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../firebase.init';
import './Header.css';

const Header = () => {
  const [user] = useAuthState(auth);
  

  const singout = () => {
    signOut(auth);
  };

    return (
        <Navbar className='coustom-css' expand="lg"  collapseOnSelect   variant="dark">
        <Container >
          <Navbar.Brand className='fw-bold fs-2'>Inventory </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className="ms-auto link-css">
              <Link to='/home'>Home</Link>
              <Link to='add'>Add Items</Link>
              <Link to='/profile'>Profile</Link> 
              {
                user?<button className='siginout-css' onClick={singout}>Sign Out</button>:
                <Link to='/login'  >Login</Link>
              }
              {
                user?' ':<Link to='/signin' > Register</Link>
              }
              
            </Nav>
           
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default Header;