import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import './User.css';
import { UserPnSList } from './UserPnSList';
import defaultImg from "../../assets/imgs/User.png";
import { getUserByJWB } from '../../api/usersApi';

export function User() {
  const [user, setUser] = useState({})
  const [confirmationChange, setConfirmationChange] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const userResp = await getUserByJWB()
      localStorage.setItem("USER", JSON.stringify(userResp))
      if (userResp) {
        setUser(userResp);
      }
    };

    loadUser();
  }, [confirmationChange]);

  const refreshProducts = () => {
    setConfirmationChange(prev => !prev); // Toggle para forzar re-render
  };

  function LogOut() {
    localStorage.removeItem("USER")

    navigate("/", { replace: true });
    window.location.reload();
  }
  return (
    <>
      {!user ? (<div>Cargando datos del usuario...</div>) : (
        <div className="userData">
          <img className='userImage' src={user?.img ? user?.img : defaultImg} alt="User" />
          <div className='Udata'>
            <h1>{user.name}</h1>
            <p>Email: {user.email}<br />Última conexión: {user.lastLogin ? user.lastLogin : "Just Now"}</p>
          </div>
          <button className="logoutButton" onClick={() => { LogOut() }}>
            Logout
          </button>
        </div>
      )}

      <UserPnSList user={user} refreshProducts={refreshProducts} />
    </>
  );
}
