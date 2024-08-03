// import React from 'react'
// import { Card, CardBody, CardImg, CardText, CardTitle } from 'react-bootstrap'
// import Rating from './Rating'
// import { Link } from 'react-router-dom'

// function Product({product}) {
//   return (
//     <Card className='my-3 p-3 rounded products'>
//         <Link to={`/products/${product._id}`}>
//             <CardImg src={product.image} />
//         </Link>

//         <CardBody>
//             <Link to={`/products/${product._id}`}>
//                 <CardTitle as='div'>
//                     <strong>{product.name}</strong>
//                 </CardTitle>
//             </Link>
//             <CardText as='div'>
//                 <div className='my-3'>
//                     <Rating value={product.rating} text={`${product.numReviews} Reviews`} color={'#f8e825'}/>
//                 </div>
//             </CardText>
            
//             <CardText as='h3'>
//                 ${product.price}
//             </CardText>
//         </CardBody>
//     </Card>
//   )
// }

// export default Product

import React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Rating from './Rating';
import { Link } from 'react-router-dom';

function Product({ product }) {
  const isBest = product.isBest; // Assuming there's an isBest property
  const isVIP = product.isVIP; // Assuming there's an isVIP property

  // Define animation variants
  const cardVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05 },
  };

  const bestVariants = {
    initial: { boxShadow: '0px 0px 10px rgba(255, 215, 0, 0.5)' },
    animate: { boxShadow: '0px 0px 20px rgba(255, 215, 0, 1)', transition: { yoyo: Infinity, duration: 0.8 } },
    hover: {
      scale: 1.1,
      boxShadow: '0px 0px 30px rgba(255, 215, 0, 1)',
      transition: { duration: 0.3 },
    },
  };

  const vipVariants = {
    initial: { boxShadow: '0px 0px 10px rgba(128, 0, 128, 0.5)' },
    animate: { boxShadow: '0px 0px 20px rgba(128, 0, 128, 1)', transition: { yoyo: Infinity, duration: 0.8 } },
    hover: {
      scale: 1.1,
      boxShadow: '0px 0px 30px rgba(128, 0, 128, 1)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="my-3 p-3 rounded products"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover={isBest ? bestVariants.hover : isVIP ? vipVariants.hover : cardVariants.hover}
    >
      <Card>
        <Link to={`/products/${product._id}`}>
          <CardImg src={product.image} />
        </Link>

        <CardBody>
          <Link to={`/products/${product._id}`}>
            <CardTitle as='div'>
              <strong>{product.name}</strong>
            </CardTitle>
          </Link>
          <CardText as='div'>
            <div className='my-3'>
              <Rating value={product.rating} text={`${product.numReviews} Reviews`} color={'#f8e825'} />
            </div>
          </CardText>

          <CardText as='h3'>
            ${product.price}
          </CardText>
        </CardBody>
      </Card>
    </motion.div>
  );
}

export default Product;

