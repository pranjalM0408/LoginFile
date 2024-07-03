import React, { useState } from 'react';
import axios from 'axios';

function Home() {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        address: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:5000/save-user-info', userInfo)
            .then(res => {
                console.log('User info saved successfully: ', res.data);
                
            })
            .catch(err => {
                console.error('Error saving user info: ', err);
                
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="container mt-4">
            <h2>Welcome!</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" value={userInfo.firstName} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" value={userInfo.lastName} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                    <input type="tel" className="form-control" id="mobileNumber" name="mobileNumber" value={userInfo.mobileNumber} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea className="form-control" id="address" name="address" value={userInfo.address} onChange={handleInputChange} rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Save Information</button>
            </form>
        </div>
    );
}

export default Home;
