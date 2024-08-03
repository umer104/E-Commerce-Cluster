import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Link, useParams, useNavigate  } from 'react-router-dom';
import { Row, Col, ListGroup, ListGroupItem, Image, FormControl, Button, Card, Container } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'


function CartScreen() {
    const { id } = useParams();
    const qty = new URLSearchParams(window.location.search).get('qty') || 1;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart);
    const { cartItems, loading, error } = cart;
    

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty));
        }
    }, [dispatch, id, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping');
    }

    return (
        <Container>
            <h1>Shopping Cart</h1>
            <Link to='/' className="btn btn-light my-1">
                Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Row>
                    <Col md={8}>
                    {
                    cartItems.length === 0 ? (
                        <Message varient="info">
                            Your Cart is Empty...
                        </Message>
                    ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map(item =>(
                                <ListGroupItem key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/products/${item.product}`} style={{textDecoration: "none"}}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>
                                            ${item.price}
                                        </Col>
                                        <Col xs="auto">
                                        <FormControl
                                            as="select"
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                            >{
                                            [...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                </option>
                                                ))
                                            }
                                        </FormControl>
                                        </Col>
                                        <Col md={1}>
                                            <Button
                                                type="button"
                                                variant="light"
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h2>Subtotal {cartItems.reduce((acc, item) => acc + parseInt(item.qty), 0)} items</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroupItem>
                        
                        <ListGroupItem>
                            <Button
                                type="button"
                                className="btn-block"
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        )}
    </Container>
    );
}

export default CartScreen;
