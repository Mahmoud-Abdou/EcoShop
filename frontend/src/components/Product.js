import React from 'react'
import { Card, CardImg } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = ( {product} ) => {
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
            <CardImg src={product.image} variant='top'/>
        </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`} >
                <Card.Title as='div'>
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text>
                <Rating value={product.rating} reviews={product.numReviews}/>
            </Card.Text>
            <Card.Text as='h3'>       
                ${product.price}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product