import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstant';

function UserProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if(!userInfo){
            window.location.href = '/login';
        }else{
            if(!user || !user.name || success){
                dispatch({
                    type: USER_UPDATE_PROFILE_RESET
                })
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [ dispatch, userInfo, user, success ]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Password Do Not Match')
        }else{
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
        }))
            setMessage('')
        }
    };

  return (
    <Row>
        <Col md={4}>
            <h2>User Profile</h2>
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
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                </FormGroup>
            <hr />
                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
        </Col>

        <Col md={8}>
            <h2>My Orders</h2>
        </Col>
    </Row>
)
}

export default UserProfileScreen
