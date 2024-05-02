import React, { useState, useEffect } from "react"
import img from "../../assets/imgs/User.png";
import { useNavigate } from "react-router-dom";
import "./Login&Register.css"
export function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [confirmation, setConfirmation] = useState(false)

    let navigate = useNavigate();

    useEffect(() => {
        const loadUser = () => {
            const userJson = localStorage.getItem("USER");
            if (userJson) {
                navigate("/home", { replace: true });
                window.location.reload();
            }
        };
        loadUser();
    }, [confirmation]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const usersJson = localStorage.getItem("USER_REGISTERED");
        let users = usersJson ? JSON.parse(usersJson) : [];
        let usuarioEncontrado = users.find((u) => u.email === formData.email)
        if (!usuarioEncontrado || usuarioEncontrado.password !== formData.password) {
            alert("El usuario ingresado o la contraseña no son correctos")
            return
        };
        localStorage.setItem("USER", JSON.stringify({ //esta es la forma en la que preveo que la data del usuario va a venir del backend
            name: usuarioEncontrado.name,
            img: "",
            email: usuarioEncontrado.email,
            lastLogin: "",
            walletBalance: "",
            sales: [],
            purchases: usuarioEncontrado.purchases,
        }))
        setFormData({ email: "", password: "" });
        setConfirmation(true)
    };

    return (
        <div className="login-container">
            <div className="contenedor-imagen">
                <img src={img} />
            </div>
            <form id="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" onChange={handleChange} required />
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" name="password" onChange={handleChange} required />
                <button type="submit">Iniciar sesión</button>
            </form>
            <p>¿No tienes una cuenta? <a onClick={() => { navigate("/register", { replace: true }); }} id="signup-link">Regístrate aquí</a></p>
        </div>
    );
}
