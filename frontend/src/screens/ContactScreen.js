import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, InputGroup, Container } from 'react-bootstrap';
import Loader from '../components/Loader';

function ContactScreen() {
  const [loading, setLoading] = useState(true);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container className='d-flex justify-content-center mt-1' style={{ fontSize: '16px' }}>
      <Form
        className='p-4 rounded border'
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        style={{ maxWidth: '900px' }}
      >
        <Row>
          <h1 style={{ textAlign: 'center' }}>Contact Us</h1>
        </Row>
        <hr />
        <Row className='mb-3'>
          <Form.Group as={Col} md='6' controlId='validationCustom01'>
            <Form.Label>First name</Form.Label>
            <Form.Control
              style={{border: '1px solid grey'}}
              required
              type='text'
              placeholder='First name'
            />
          </Form.Group>
          <Form.Group as={Col} md='6' controlId='validationCustom02'>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              style={{border: '1px solid grey'}}
              required
              type='text'
              placeholder='Last name'
            />
          </Form.Group>
          <Form.Group as={Col} md='6' controlId='validationCustomUsername'>
            <Form.Label>Email Address</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                style={{border: '1px solid grey'}}
                type='email'
                placeholder='Email Address'
                aria-describedby='inputGroupPrepend'
                required
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md='6' controlId='validationCustomUsername'>
            <Form.Label>Phone Number</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                style={{border: '1px solid grey'}}
                type='text'
                placeholder='Phone Number'
                aria-describedby='inputGroupPrepend'
                required
              />
            </InputGroup>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md='12' controlId='exampleForm.ControlTextarea1'>
            <Form.Label>Message</Form.Label>
            <Form.Control style={{border: '1px solid grey'}} as='textarea' rows={3} placeholder='Enter Your Message...' required />
          </Form.Group>
        </Row>
        <Form.Group className='mb-3'>
          <Form.Check
            required
            color='grey'
            label='Agree to terms and conditions'
            feedbackType='invalid'
          />
        </Form.Group>
        <Button type='submit'>Submit form</Button>
      </Form>
    </Container>
  );
}

export default ContactScreen;
