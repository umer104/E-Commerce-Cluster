import React, { useState } from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import Message from '../components/Message';
import AboutModal from '../components/AboutModal';
import Loader from '../components/Loader';

function AboutScreen() {
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  setTimeout(() => {
    setLoading(false);
  }, 200);

  return (
    <Container className='d-flex justify-content-center mt-1' style={{ fontSize: '16px', maxWidth: '950px' }}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Card>
          <Row>
            <h1 style={{ textAlign: 'center' }}>About Us</h1>
          </Row>
          <hr />
          <Card.Body>
            <Card.Title>
              Welcome to 
              <strong>
                <a href='/' style={{ textDecoration: 'none' }}>
                  ProShop.com
                </a>
              </strong>
            </Card.Title>
            <Card.Text style={{ textAlign: 'justify', letterSpacing: '0' }}>
              <p style={{ fontSize: '18px' }}>
                At{' '}
                <strong>
                  <a href='/' style={{ textDecoration: 'none' }}>
                    ProShop.com
                  </a>
                </strong>
                , we're passionate about style, quality, and convenience. Our mission is to provide an exceptional online shopping experience for men, women, and kids, offering a curated selection of products that blend fashion, function, and affordability. <br />
                <hr />
                <strong>Our Team:</strong> Behind every successful venture is a dedicated team. From our designers to our customer service reps, we're here to make your shopping experience exceptional.<br />
                <hr />
                <strong>Our Promise:</strong> We promise exceptional customer service, high-quality products, staying ahead of trends, and continuous improvement.<br />
                <hr />
                <strong>Connect With Us:</strong> We love hearing from our customers! Connect with us on social media or drop us a line.<br />
                Thank you for choosing ProShop.com. Happy shopping!
              </p>
            </Card.Text>
            <AboutModal />
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default AboutScreen;
