import React from 'react';
import {
  Container, Row, Col, Card, Image,
} from 'react-bootstrap';
import signUpImage from '../img/signUp.jpg';
import SignUpForm from '../components/forms/SignUpForm.jsx';

const SignUp = () => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col xs={12} md={8} xxl={6}>
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
              <Image roundedCircle src={signUpImage} />
            </Col>
            <SignUpForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default SignUp;
