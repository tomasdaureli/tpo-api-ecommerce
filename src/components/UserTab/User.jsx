import React, { useState } from 'react'
import { user } from "../../Database/data"
import './User.css'

export function User() {

  const [allProducts, setAllProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [countProducts, setCountProducts] = useState(0)
  return (
    <div className="container">
      <main className="main-content">
        <h1>{user.name}</h1>
        <p>Email: {user.email}</p>
        <p>Última conexión: {user.lastLogin}</p>
        <p>Total en cartera: ${user.walletBalance.toFixed(2)}</p>
        <p>Total de compras: {user.totalPurchases}</p>
        <p>Total de ventas: {user.totalSales}</p>
      </main>
    </div>
  );
}
