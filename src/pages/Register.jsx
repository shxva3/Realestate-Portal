import { useState } from "react";

import api from "../services/api";

import { useNavigate }
  from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "user"
    });

  const [error, setError] =
    useState("");

  function handleChange(e) {

    setError("");

    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    const email =
      user.email
        .trim()
        .toLowerCase();

    try {

      const response =
        await api.get("/users");

      const emailExists =
        response.data.some(
          (existingUser) =>
            existingUser.email
              .trim()
              .toLowerCase() === email
        );

      if (emailExists) {

        setError(
          "Email already exists"
        );

        return;

      }

      await api.post(
        "/users",
        { ...user, email }
      );

      navigate("/login");

    } catch (err) {

      console.log(err);

      setError(
        "Something went wrong. Please try again."
      );

    }
  }

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>Signup</h1>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <select
            name="role"
            value={user.role}
            onChange={handleChange}
          >
            <option value="user">
              User
            </option>

            <option value="admin">
              Admin
            </option>
          </select>

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <button className="submit-btn">
            Signup
          </button>

        </form>

      </div>

    </div>

  );
}

export default Register;
