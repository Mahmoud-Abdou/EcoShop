import React, { useState, useEffect } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState(null)

    let history = useNavigate()

    const dispatch = useDispatch()
    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = '/' + window.location.search
 
    const submitHandler = (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password dosenot match')
        }else{
            dispatch(register(name, email, password))
        }
    }
    
    useEffect(()=> {
        console.log(userInfo)
        if(userInfo){
            history(redirect)
        }
    }, [history, redirect, userInfo]   )


    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {loading && <Loader/>}
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder='Enter Name' value = {name} 
                                onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder='Enter Email'  value = {email} 
                                onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder='Enter Password'  value = {password} 
                                onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder='Enter Password Again'  value = {confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Sign Up
                </Button>
                <Row className="py-3">
                    <Col>
                        Have An Account ? 
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                            Register
                        </Link>
                    </Col>
                </Row>
            </Form>
            
            
        </FormContainer>
    )
}

export default RegisterScreen
