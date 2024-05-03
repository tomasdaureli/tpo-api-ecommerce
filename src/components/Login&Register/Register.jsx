import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserByEmail, getUserByUsername } from "../../api/usersApi"

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
        let mailEncontrado = await getUserByEmail(formData.email)
        let usernameEncontrado = await getUserByUsername(formData.username)
        if (mailEncontrado) {
            alert('El email que esta tratando de utilizar ya se encuentra en uso');
            return;
        }
        if (usernameEncontrado) {
            alert('El nombre de usuario que esta tratando de utilizar ya se encuentra en uso');
            return;
        }

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        //esta sera la mannera en la que mandaria al backend para que me conirmen si es posible crear este usuario y la siguiente forma de persistir
        postUser({
            name: formData.username,
            img: "",
            email: formData.email,
            password: formData.password,
            lastLogin: "",
            walletBalance: "",
            sales: [],
            purchases: [],
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

                <input type="submit" value="Registrar" />
            </form>
            <p>¿Ya tienes una cuenta? <a onClick={() => { navigate('/', { replace: true }); }} id="signup-link">Entra aqui</a></p>
        </div>
    );
}
