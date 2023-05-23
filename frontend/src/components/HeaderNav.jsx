import { Navbar, Container, Button } from 'react-bootstrap';

const HeaderNav = () => {
  return (
    <Navbar className="shadow-sm bg-white">
    <Container>
      <Navbar.Brand href="#">Hexlet chat</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Button
          variant="primary"
          onClick={() => localStorage.removeItem('token')}
        >
          Выйти
        </Button>
      </Navbar.Collapse>
    </Container>
    </Navbar>
  )
};

export default HeaderNav;
