import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from "../../api/usersApi"

import "./Login&Register.css";

export function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [confirmation, setConfirmation] = useState(false)

    let navigate = useNavigate();

    useEffect(() => {
        const loadUser = () => {
            const userJson = localStorage.getItem('USER');
            if (userJson) {
                navigate('/home', { replace: true });
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
        const { password, confirmPassword } = formData;
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        registerUser({
            name: formData.username,
            lastName: formData.lastname || " - ",
            email: formData.email,
            password: formData.password,
            role: formData.role
        })
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        navigate('/', { replace: true });
        setConfirmation(true)

    };

    return (
        <div className="login-container">
            <h2>Registro de usuario</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Nombre de usuario:</label><br />
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required /><br />
                <label htmlFor="email">Email:</label><br />
                <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} required /><br />

                <label htmlFor="password">Contraseña:</label><br />
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required /><br />

                <label htmlFor="confirmPassword">Confirmar contraseña:</label><br />
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required /><br />

                <label for="rol">Rol:</label>
                <select id="rol" name="rol" required>
                    <option value="" disabled selected>-- Seleccione una opción --</option>
                    <option value="VENDEDOR">Vendedor</option>
                    <option value="COMPRADOR">Comprador</option>
                </select>

                <input type="submit" value="Registrar" />
            </form>
            <p>¿Ya tienes una cuenta? <a onClick={() => { navigate('/', { replace: true }); }} id="signup-link">Entra aqui</a></p>
        </div>
    );
}
