import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';

function LoginScreen({ location = {}}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()

    const { search } = location;
    const redirect = search ? search.split('=')[1] : '/';

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if(userInfo){
            window.location.href = redirect;
        }
    }, [userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    };

    return (
        <FormContainer>
            <h1 style={{textAlign: 'center'}}>Sign In</h1>
            {error && <Message varient='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} className='p-4 rounded border'>
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
                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>

            <Row className='text-center'>
                <Col>
                    New Customer? <Link style={{textDecoration: "none"}} to={redirect ? `/register?redirect=${redirect}` : '/register'}><strong>Register</strong></Link>
                </Col>
            </Row>
            <Row className='text-center'>
                <Col className='p-3 rounded'>
                    <Button variant='info' className='rounded mx-4'><i className='fa-brands fa-facebook pt-1' style={{fontSize: '18px'}}></i></Button>
                    <Button variant='danger' className='rounded mx-4'><i className='fa-brands fa-google pt-1' style={{fontSize: '18px'}}></i></Button>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default LoginScreen;
