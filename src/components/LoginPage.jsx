import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Inputs from './login-page/Inputs';
import './LoginPage.css';

export default function LoginPage({ type, handleProceed, changeLoginPage }) {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      validateToken(token);
    }
  }, []);

  const validateToken = async token => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        handleProceed(); // Automatically proceed if token is valid
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      localStorage.removeItem('token'); // Remove invalid token
    }
  };

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const validateEmail = email => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = password => {
    const minLength = 8;
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasSpecialChars;
  };

  const handleClick = async () => {
    const isEmailValid = validateEmail(formData.email);
    const isPasswordStrong = validatePassword(formData.password);

    if (isEmailValid && isPasswordStrong) {
      setEmailError('');
      setPasswordError('');
      console.log('Form Data:', formData);
      if (type === 'login') {
        try {
          // First, try to login
          const loginResponse = await axios.post(
            'http://127.0.0.1:8000/auth/token',
            {
              username: formData.email,
              password: formData.password,
            },
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          );

          console.log('Login successful:', loginResponse.data);
          // Store the token in localStorage
          localStorage.setItem('token', loginResponse.data.access_token);
          console.log('Token saved:', loginResponse.data.access_token);
          handleProceed(); // Proceed to next step after successful login
        } catch (loginError) {
          console.error('Login failed:', loginError.response ? loginError.response.data : loginError.message);
          setLoginError('Login Failed. Are you sure you have an account?');
        }
      } else {
        try {
          const signupResponse = await axios.post('http://127.0.0.1:8000/auth/', formData);
          console.log('Signup successful:', signupResponse.data);
          // After successful signup, log in to get the token
          const loginAfterSignupResponse = await axios.post(
            'http://127.0.0.1:8000/auth/token',
            {
              username: formData.email,
              password: formData.password,
            },
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          );
          localStorage.setItem('token', loginAfterSignupResponse.data.access_token);
          console.log('Token saved:', loginResponse.data.access_token);
          handleProceed();
        } catch (signupError) {
          console.error('Signup failed:', signupError.response ? signupError.response.data : signupError.message);
        }
      }
    } else {
      if (!isEmailValid) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
      if (!isPasswordStrong) {
        setPasswordError('Password must be at least 8 characters long and a special character.');
      } else {
        setPasswordError('');
      }
    }
  };

  return (
    <div className="inner-box">
      <div className="form-box">
        <b className="form-title">{type === 'login' ? 'Log in' : 'Sign up'} to AlgoAligator</b>
        <div className="small-text">{`Quick & Simple way to Automate your investment`}</div>
        <div className="frame-group">
          <div className="outer-frame">
            {type === 'signup' && (
              <>
                <Inputs type="first_name" inputValue={formData.first_name} handleChange={handleChange} />
                <Inputs type="last_name" inputValue={formData.last_name} handleChange={handleChange} />
              </>
            )}
            <Inputs type="email" inputValue={formData.email} handleChange={handleChange} />
            <Inputs type="password" inputValue={formData.password} handleChange={handleChange} />
          </div>
          {emailError && <div className="error-text">{emailError}</div>}
          {passwordError && <div className="error-text">{passwordError}</div>}
          {loginError && <div className="error-text">{loginError}</div>}
          <div className="checkbox-frame">
            <input className="checkbox" type="checkbox" />
            <div className="remember-me">Remember Me</div>
          </div>
          <button className="button1" onClick={handleClick}>
            <div className="proceed-text">PROCEED</div>
          </button>
        </div>
        <button className="button2" onClick={changeLoginPage}>
          {type === 'signup' ? 'Already have an account? Log in here.' : 'No account yet? Sign up now'}
        </button>
      </div>
    </div>
  );
}
