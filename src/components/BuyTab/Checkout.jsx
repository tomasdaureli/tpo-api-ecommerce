import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { postUserPurchase } from '../../api/usersApi';
import "./Checkout.css"

export function Checkout({
  user,
  setUser,
  allProducts,
  setAllProducts,
  total,
  setTotal,
  count,
  setCountProducts
}) {
  const [discountCode, setDiscountCode] = useState(false)
  
  const navigate = useNavigate();

  const handlePurchase = async (purchase) => {
    console.log(discountCode);
    let userLogged = JSON.parse(localStorage.getItem('USER'));
    const productsToSend = purchase.map(product => ({
      productId: product.id,
      quantity: product.quantity
    }));

    userLogged = await postUserPurchase(userLogged, productsToSend, discountCode)

    // localStorage.setItem("USER", JSON.stringify({
    //   id: userLogged.id,
    //   name: userLogged.name,
    //   img: userLogged.img,
    //   email: userLogged.email,
    //   lastLogin: userLogged.lastLogin,
    //   walletBalance: userLogged.walletBalance,
    //   sales: userLogged.sales,
    //   purchases: userLogged.purchases,
    // }))
  };
  const handleChangeDiscountCode = (event) => {
    const { name, value } = event.target;
    setDiscountCode(value)
  };

  const onConfirmBuy = () => {
    handlePurchase(allProducts)
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
    navigate("/buy/success")
  }

  return (
    <>
      <div className='button-back' onClick={() => navigate("/catalogo")}>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="icon-cart"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <label> Volver al catalogo</label>
      </div>
      <p><strong>Usuario registrado como </strong>{user.email}</p>
      <div className='direccion-container'>
        <h2>Direccion para el envío</h2>
        <label>Provincia </label>
        <input type="text" placeholder='Provincia' />
        <label>Localidad </label>
        <input type="text" placeholder='Localidad' />
        <label>Calle y número </label>
        <input type="text" placeholder='Calle y número' />
      </div>
      <div className='products-container'>
        <ul>
          {allProducts.map((product) => (
            <li key={product.id}>
              <div className='product-container'>
                <img src={product.urlImage} alt={product.nameProduct} />
                <p>{product.nameProduct}</p>
                <p>Cantidad: {product.quantity}</p>
                <p>Precio: ${product.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <input type="number" name="discountCode" id="discountCode" onChange={handleChangeDiscountCode} />
      <h1>Total de la compra: ${total}</h1>
      <button className='confirm-button' onClick={() => onConfirmBuy()}>Confirmar compra</button>
    </>
  )
}
