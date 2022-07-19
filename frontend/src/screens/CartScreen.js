import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form, ListGroupItem } from 'react-bootstrap'
import Message from '../components/Message.js'
import { addToCart, removeFromCart } from '../actions/cartActions.js'

const CartScreen = () => {
    let productId  = useParams()['id']
    const [searchParams, setSearchParams] = useSearchParams()
    const qty = searchParams.get("qty")
    const { cartItems } = useSelector(state => state.cart)

    const dispatch = useDispatch()
    const history = useNavigate()

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history(`/login?redirect=shipping`)
    }

    useEffect(()=> {
        if (productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty]   )

    return (
        <Row>
            <Col md={8}>
                {cartItems.length === 0? 
                    <Message> 
                        Your Cart Is Empty  
                        <Link to='/'> Go Back</Link> 
                    </Message>
                    : (
                        <ListGroup variant='flush'>
                            {
                                cartItems.map(item => (
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            
                                            <Col md={2}>
                                                ${item.price}
                                            </Col>
                                            
                                            <Col md={2}>
                                                <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {[...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                            
                                            <Col md={2}>
                                                <Button type="button" variant='light' onClick={() =>
                                                    removeFromCartHandler(item.product)
                                                }> 
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    )
                }
            </Col>
            <Col md={4}>
                <ListGroup vatiant='flush'>
                    <ListGroup.Item>
                        <h2>
                            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                        </h2>
                        total : $
                        ({cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}) 
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type='button' className='btn-block' disabled={cartItems.lenght === 0} onClick={checkoutHandler}>
                            Proceed To  CheckOut
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    )
}

export default CartScreen
