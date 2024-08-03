import React, { useState } from 'react';
import { Button, Form, Modal, InputGroup } from 'react-bootstrap';

function AboutModal() {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <Button variant='primary' onClick={handleShow}>Subscribe</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Subscribe Our NewsLetter</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontFamily: 'sans-serif' }}>
          <Form style={{ fontSize: '18px' }} noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Email Address</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  style={{ border: '1px solid grey' }}
                  type='email'
                  placeholder='Email Address'
                  aria-describedby='inputGroupPrepend'
                  required
                />  
              </InputGroup>
            </Form.Group>
            <Form.Group md='12' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>Comments</Form.Label>
              <Form.Control style={{border: '1px solid grey'}} as='textarea' rows={3} placeholder='Enter Your Comments...' required />
          </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' className='btn btn-light my-3' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' type='submit' onClick={handleSubmit}>
            Send Email
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AboutModal;
