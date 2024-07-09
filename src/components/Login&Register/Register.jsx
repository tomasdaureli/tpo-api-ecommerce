import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Login&Register.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Features/User/UserAction";

export function Register() {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [confirmation, setConfirmation] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const userJson = localStorage.getItem("USER");
      if (userJson) {
        navigate("/home", { replace: true });
      }
    };
    loadUser();
  }, [confirmation]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    dispatch(
      registerUser({
        name: formData.username,
        lastName: formData.lastname || " - ",
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })
    )
      .unwrap()
      .then((result) => {
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="login-container">
      <h2>Registro de usuario</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nombre de usuario:</label>
        <br />
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="password">Contraseña:</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="confirmPassword">Confirmar contraseña:</label>
        <br />
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <br />

        <label for="role">Rol:</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="" disabled selected>
            -- Seleccione una opción --
          </option>
          <option value="VENDEDOR">Vendedor</option>
          <option value="COMPRADOR">Comprador</option>
        </select>

        <input type="submit" value="Registrar" />
      </form>
      <p>
        ¿Ya tienes una cuenta?{" "}
        <a
          onClick={() => {
            navigate("/", { replace: true });
          }}
          id="signup-link"
        >
          Entra aqui
        </a>
      </p>
    </div>
  );
}
