import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    first_Name: "",
    last_Name: "",
    address:"",
    city:"",
    state:"",
    zip_code:"",
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );
  

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>

        <label>
          username:{" "}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          firstName:{" "}
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name:{" "}
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          email:{" "}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          password:{" "}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <label>
          address:{" "}
          <input
          type = "text"
          name = "address"
          value={formData.address}
          onChange={handleInputChange}
          />
        </label>
        <label>
          city:{" "}
          <input
          type = "text"
          name = "city"
          value={formData.city}
          onChange={handleInputChange}
          />
        </label>
        <label>
          state:{" "}
          <input
          type = "text"
          name = "state"
          value={formData.state}
          onChange={handleInputChange}
          />
        </label>
        <label>
          zip_code:{" "}
          <input
          type = "text"
          name = "zip_code"
          value={formData.zip_code}
          onChange={handleInputChange}
          />
        </label>
        <button type="submit">Register!</button>
      </form>
    </div>
  );
};

export default RegisterPage;
