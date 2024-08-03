import React from 'react'
import logo from '../logo.png';
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav, Form, Button, Image, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()
  const logoutHandler = () =>{
    dispatch(logout())
  }

  return (
    <div className='App'>
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' className='p-1'>
      <Container>
        <LinkContainer to='/'>
          <Image src={logo} className='logo me-5' />
        </LinkContainer>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <LinkContainer to='/'>
              <Nav.Link className='me-4'>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/products'>
              <Nav.Link className='me-4'>Products</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/about'>
              <Nav.Link className='me-4'>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/contact'>
              <Nav.Link className='me-4'>Contact</Nav.Link>
            </LinkContainer>
            </Nav>
            <Nav className='me-auto'>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link className='me-4 btn btn-danger'>Login</Nav.Link>
              </LinkContainer>
            )}

            <LinkContainer to='/cart'>
              <Nav.Link className='me-4 btn btn-success'>Cart</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <Form className='d-flex'>
            <Form.Control
              type='search'
              placeholder='Search'
              className='me-2'
              aria-label='Search'
            />
            <Button variant='outline-success'>Search</Button>
          </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header
