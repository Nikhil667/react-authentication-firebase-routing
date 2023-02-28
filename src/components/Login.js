import React, { useRef, useState } from 'react'
import { Form ,Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {

    const emailRef = useRef() 
    const passwordRef = useRef() 
    //to check whether we signed in
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault();
        
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value);
            setLoading(false)
            navigate('/')
        } catch (error){
            console.log(error)
            setError('Failed to Sign In')
        }
    }

  return (
    <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required></Form.Control>
                    </Form.Group>
                    <Button disabled={loading} className='w-100 mt-4' type="submit">Login</Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to="/forgot-password" >Forgot Password</Link>
                </div>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-3">
            Need an account? <Link to="/signup">Sign Up</Link> 
        </div>
    </>
  )
}
