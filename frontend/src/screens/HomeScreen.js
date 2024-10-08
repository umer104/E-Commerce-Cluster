import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'

function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { error, products } = productList

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setShowLoader(false);
    }, 200);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <div>
      <h1>Latest Products</h1>

      {showLoader ? <Loader /> :
        error ? <Message variant='danger'>{error}</Message> :
          <Row>
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
      }
    </div>
  )
}

export default HomeScreen
