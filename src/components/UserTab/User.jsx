import React, { useState, useEffect } from 'react'
import { userData } from "../../Database/data"
import './User.css'
import { UserPnSList } from './UserPnSList';

export function User() {

  const [user, setUser] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0);
  const bulkSize = 4;

  useEffect(() => {
    const loadUser = () => {
      setUser(userData)
      const userJson = localStorage.getItem('user');
      if (userJson) {
        setUser(JSON.parse(userJson));
      }
    };

    loadUser();
  }, []);

  const purchasesBulks = user?.purchases
    ? Array.from({ length: Math.ceil(user.purchases.length / bulkSize) }, (_, i) =>
      user.purchases.slice(i * bulkSize, i * bulkSize + bulkSize)
    )
    : [];

  const previousBulk = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const nextBulk = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < purchasesBulks.length - 1 ? prevIndex + 1 : prevIndex
    );
  };
  return (
    <>
      {!user ? (<div>Cargando datos del usuario...</div>) : (<>

        <div class="userData">
          <img className='userImage' src={user?.img} alt="" />
          <div className='Udata'>
            <h1>{user.name}</h1>
            <p>
              Email: {user.email}<br />
              Última conexión: {user.lastLogin}
            </p>
          </div>
        </div>
        <UserPnSList user={user} />
      </>)
      }

    </>


  );
}
