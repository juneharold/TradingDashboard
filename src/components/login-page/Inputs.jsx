import React from "react";
import "./Inputs.css";

const INPUTFIELDS = {
  firstname: {
    title: "First Name",
    placeholder: "John",
  },
  lastname: {
    title: "Last Name",
    placeholder: "Doe",
  },
  email: {
    title: "Email Address",
    placeholder: "johndoe@mail.com",
  },
  password: {
    title: "Password",
    placeholder: "",
  },
};

export default function Inputs({ type, inputValue, handleChange }) {
  return (
    <div className="inner-frame">
      <div className="text-frame">
        <div className="input-type">{INPUTFIELDS[type].title}</div>
        <input
          className="placeholder-text"
          placeholder={INPUTFIELDS[type].placeholder}
          type={type}
          value={inputValue}
          onChange={(e) => handleChange(type, e.target.value)}
        />
      </div>
    </div>
  );
}
