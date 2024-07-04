import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import Validation from './LoginValidation';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:5000/login', values)
                .then(res => {
                    if(res.data === "Success") {
                    navigate('/home');
                    }
                    else{
                      alert("No record" ); 
                    }
                })
                .catch(err => console.log(err));
        }
    };

     const handleGoogleLoginSuccess = (response) => {
        const { email, name } = response.profileObj;

        axios.post('http://localhost:5000/google-login', { email, name })
            .then(res => {
                console.log('Google login success: ', res.data);
                navigate('/home');
            })
            .catch(err => console.error('Error storing user data: ', err));
    };

    const handleGoogleLoginFailure = (response) => {
        console.error('Google login failed: ', response);
    }; 
   

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-In</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            placeholder='Enter Email'
                            name='email'
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            name='password'
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>

                    <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>

                    <p></p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Sign up</Link>
                </form>

                <hr />

                <GoogleLogin
                 clientId="290985781285-q0t9lavgk2iq0umf1id1db0iivt0qstp.apps.googleusercontent.com"
                    buttonText='Login with Google'
                    onSuccess={handleGoogleLoginSuccess}
                    onFailure={handleGoogleLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    className='w-100 rounded-0'
                />
            </div>
        </div>
    );
}

export default Login;
