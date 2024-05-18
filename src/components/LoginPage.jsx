import React, { useState } from "react";
import Inputs from "./login-page/Inputs";
import "./LoginPage.css";

export default function LoginPage({ type, handleProceed, handleFormPage }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChars
    );
  };

  const handleClick = () => {
    const isEmailValid = validateEmail(formData.email);
    const isPasswordStrong = validatePassword(formData.password);

    if (isEmailValid && isPasswordStrong) {
      setEmailError("");
      setPasswordError("");
      console.log("Form Data:", formData);
      handleProceed();
    } else {
      if (!isEmailValid) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }

      if (!isPasswordStrong) {
        setPasswordError(
          "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character."
        );
      } else {
        setPasswordError("");
      }
    }
  };

  return (
    <div className="inner-box">
      <div className="form-box">
        <b className="form-title">
          {type === "login" ? "Log in" : "Sign up"} to FBA Quant
        </b>
        <div className="small-text">{`Quick & Simple way to Automate your investment`}</div>
        <div className="frame-group">
          <div className="outer-frame">
            {type === "signup" && (
              <Inputs
                type="name"
                inputValue={formData.name}
                handleChange={handleChange}
              />
            )}
            <Inputs
              type="email"
              inputValue={formData.email}
              handleChange={handleChange}
            />
            <Inputs
              type="password"
              inputValue={formData.password}
              handleChange={handleChange}
            />
          </div>
          {emailError && <div className="error-text">{emailError}</div>}
          {passwordError && <div className="error-text">{passwordError}</div>}
          <div className="checkbox-frame">
            <input className="checkbox" type="checkbox" />
            <div className="remember-me">Remember Me</div>
          </div>
          <button className="button1" onClick={handleClick}>
            <div className="proceed-text">PROCEED</div>
          </button>
        </div>
        <div className="or">OR</div>
        <button className="button2" onClick={handleFormPage}>
          No account yet? Register now
        </button>
      </div>
    </div>
  );
}
