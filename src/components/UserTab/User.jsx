import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import './User.css';
import { UserPnSList } from './UserPnSList';
import defaultImg from "../../assets/imgs/User.png";

export function User({
  user,
  setUser
}) {
  let navigate = useNavigate();
  useEffect(() => {
    const loadUser = () => {
      const userJson = JSON.parse(localStorage.getItem('USER'));
      if (userJson) {
        setUser(userJson);
      }
    };

    loadUser();
  }, []);

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
            <p>Email: {user.email}<br />Última conexión: {user.lastLogin}</p>
          </div>
          <button className="logoutButton" onClick={() => { LogOut() }}>
            Logout
          </button>
        </div>
      )}

      <UserPnSList user={user} />
    </>
  );
}
