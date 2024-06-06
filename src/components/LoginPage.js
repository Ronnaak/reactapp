import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterPage from './RegisterPage';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // Perform login logic here
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.email === email) {
        // On success, redirect to the account page
        navigate('/account');
      } else {
        setErrors({ email: 'Invalid email or password' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="login-page">
      
      <form onSubmit={handleLogin} noValidate>
      <h2>Login</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <p>
        Don't have an account? <a href="/register">Register here</a>.
      </p>
      </form>
     
    </div>
  );
}

export default LoginPage;
