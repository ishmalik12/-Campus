import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import weskill from './photos/weskillremovedbg.png';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    gender: '',
    email: '',
    password: '',
    city: '',
    collegeName: '',
    course: '',
    section: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send POST request to backend API
      const response = await fetch('http://localhost:5001/api/auth/signup', {  // Ensure correct URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Check if the response is OK
      if (response.ok) {
        const data = await response.json();
        const { token, user } = data;
  
        // Save user data and token to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user._id);
        localStorage.setItem('name', user.name);
        if (data.profileId) {
          localStorage.setItem('profileId', data.profileId);
        }
  
        // Navigate to welcome message page
        navigate('/welcomemsg');
      } else {
        // If the response is not OK, show the error message
        const data = await response.json();
        setError(data.message || 'An unknown error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error. Please try again later.');
    }
  };
  
  return (
    <div style={{ backgroundColor: 'whitesmoke' }}>
      <Navbar />
      <div className="container mt-5">
        <div className="card p-4">
          <h2 className="text-center mb-4">
            <img src={weskill} style={{ maxHeight: '10rem', maxWidth: '30rem', marginBottom: '2rem' }} alt="WeSkill Logo" />
            <br />
            Register
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="container">
              <div className="row g-3">
                <div className="col-sm-6 col-12">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6 col-12">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6 col-12">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6 col-12">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-sm-6 col-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6 col-12">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6 col-12">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6 col-12">
                  <label className="form-label">College Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="collegeName"
                    value={formData.college}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6 col-12">
                  <label className="form-label">Course</label>
                  <input
                    list="courseList"
                    className="form-control"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                  />
                  <datalist id="courseList">
                    <option value="B.Tech" />
                    <option value="BBA" />
                    <option value="LLB" />
                    <option value="B.Sc" />
                    <option value="BA" />
                    <option value="MBA" />
                    <option value="M.Tech" />
                  </datalist>
                </div>
                <div className="col-sm-6 col-12">
                  <label className="form-label">Section</label>
                  <input
                    type="text"
                    className="form-control"
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {error && <p className="text-danger mt-3">{error}</p>}

              <div className="text-center mt-4">
                <button type="submit" className="btn btn-primary px-5">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
