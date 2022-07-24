import React, { useState, useEffect } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let history = useNavigate()

    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = '/' + window.location.search
 
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(login(email, password))
    }
    
    useEffect(()=> {
        console.log(userInfo)
        if(userInfo){
            history(redirect)
        }
    }, [history, redirect, userInfo]   )


    return (
        <FormContainer>
            <h1>Sign In</h1>
            {
                 loading ? <Loader/>
                 : error ? <Message variant='danger'>{error}</Message> : ''
            }
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder='Enter Email' value={email}
                                        onChange={(e) => setEmail(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder='Enter Password'  value={password}
                                        onChange={(e) => setPassword(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            Sign IN
                        </Button>
                        <Row className="py-3">
                            <Col>
                                New Customer ? 
                                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                                    Register
                                </Link>
                            </Col>
                        </Row>
                    </Form>
            
            
        </FormContainer>
    )
}

export default LoginScreen
