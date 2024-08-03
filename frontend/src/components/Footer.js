import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <div>
      <footer>
        <Container>
          <Row>
            <Col style={{textAlign: 'center'}}>Copyright &copy; ProShop</Col>
          </Row>
        </Container>
      </footer>
    </div>
  )
}

export default Footer