import React, { useState, useEffect } from "react"
import img from "../../assets/imgs/User.png";
import { useNavigate } from "react-router-dom";
import "./Login&Register.css"
import { getUserByJWB, loginUser } from "../../api/usersApi";

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const resp = await loginUser({
            email: formData.email,
            password: formData.password
        })
        localStorage.setItem("access_token", resp.accessToken)
        const userResp = await getUserByJWB()
        console.log(userResp);
        localStorage.setItem("USER", JSON.stringify(userResp))
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
                <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} required />
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Iniciar sesión</button>
            </form>
            <p>¿No tienes una cuenta? <a onClick={() => { navigate("/register", { replace: true }); }} id="signup-link">Regístrate aquí</a></p>
        </div>
    );
}
