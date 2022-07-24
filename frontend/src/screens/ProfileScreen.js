import React, { useState, useEffect } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const ProfileScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState(null)

    let history = useNavigate()

    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails
    
    const updateUserDetails = useSelector((state) => state.updateUserDetails)
    const { success } = updateUserDetails

    const redirect = '/' + window.location.search
 
    const submitHandler = (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password dosenot match')
        }else{
            dispatch(updateUserProfile(name, email, password))
        }
    }
    
    useEffect(()=> {
        if(!userInfo){
            history('/login')
        }else{
            if(!user.name){
                dispatch(getUserDetails())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, dispatch, user]   )

    return (
        <Row>
            <Col md={3}>
                <h1>Profile</h1>
                {loading && <Loader/>}
                {error && <Message variant='danger'>{error}</Message>}
                {message && <Message variant='danger'>{message}</Message>}
                {success && <Message variant='success'>Updated Successfully</Message>}
                
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
                        Update Profile
                    </Button>
                    
                </Form>
            </Col>
            <Col md={9}>
                My Orders
            </Col>
        </Row>
    )
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

export default ProfileScreen
