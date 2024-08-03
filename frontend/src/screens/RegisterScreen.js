import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';

function RegisterScreen({ location = {}}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch()

    const { search } = location;
    const redirect = search ? search.split('=')[1] : '/';

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if(userInfo){
            window.location.href = redirect;
        }
    }, [userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Password Do Not Match')
        }else{
            dispatch(register(name, email, password))
        }
    };

  return (
    <FormContainer>
        <h1 style={{textAlign: 'center'}}>Register</h1>
        {message && <Message varient='danger'>{message}</Message>}
        {error && <Message varient='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler} className='p-4 rounded border'>
        <FormGroup controlId='name'>
            <FormLabel>Name</FormLabel>
                <FormControl
                    style={{border: '1px solid grey'}}
                    required
                    type='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
        </FormGroup>
        <hr />
        <FormGroup controlId='email'>
            <FormLabel>Email Address</FormLabel>
                <FormControl
                    style={{border: '1px solid grey'}}
                    required
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
        </FormGroup>
        <hr />
        <FormGroup controlId='password'>
            <FormLabel>Password</FormLabel>
                <FormControl
                    style={{border: '1px solid grey'}}
                    required
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
        </FormGroup>
        <hr />
        <FormGroup controlId='passwordConfirm'>
            <FormLabel>Confirm Password</FormLabel>
                <FormControl
                    style={{border: '1px solid grey'}}
                    required
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
        </FormGroup>
        <hr />
        <Button type='submit' variant='primary'>
            Register
        </Button>
        </Form>
        <Row className='text-center'>
                <Col>
                    Have an Account? <Link style={{textDecoration: "none"}} to={redirect ? `/login?redirect=${redirect}` : '/login'}><strong>Sign In</strong></Link>
                </Col>
            </Row>
    </FormContainer>
  )
}

export default RegisterScreen
