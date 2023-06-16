import React, { useContext, useEffect, useRef } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { ContextData } from '../contexts/ContextData.js';

const HeaderNav = () => {
  const [data, setData] = useContext(ContextData);
  return (
    <Navbar className="shadow-sm bg-white" expand="lg">
    <Container>
      <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
      {data ? (
        <Button
          variant="primary"
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            setData({ username: null, token: null, socket: null });
          }}
        >        
          Выйти
        </Button>
      ) : null}
    </Container>
    </Navbar>
  )
};

export default HeaderNav;
