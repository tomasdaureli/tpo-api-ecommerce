import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import { useDispatch, useSelector } from "react-redux";
import { postUserPurchase } from "../../Features/User/UserAction";

export function Checkout({
  allProducts,
  setAllProducts,
  total,
  setTotal,
  count,
  setCountProducts,
}) {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);
  const [discountCode, setDiscountCode] = useState(false);

  const navigate = useNavigate();

  const handlePurchase = async (purchase) => {
    const productsToSend = purchase.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
    }));
    dispatch(
      postUserPurchase({ purchase: productsToSend, discountCode: discountCode })
    )
      .unwrap()
      .then((result) => {
        console.log(result);
        setAllProducts([]);
        setTotal(0);
        setCountProducts(0);
        navigate("/buy/success");
      })
      .catch((error) => {
        console.error("Checkout failed:", error);
      });
  };
  const handleChangeDiscountCode = (event) => {
    const { name, value } = event.target;
    setDiscountCode(value);
  };

  return (
    <>
      <div className="button-back" onClick={() => navigate("/catalogo")}>
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
      <p>
        <strong>Usuario registrado como </strong>
        {user.email}
      </p>
      <div className="direccion-container">
        <h2>Direccion para el envío</h2>
        <label>Provincia </label>
        <input type="text" placeholder="Provincia" />
        <label>Localidad </label>
        <input type="text" placeholder="Localidad" />
        <label>Calle y número </label>
        <input type="text" placeholder="Calle y número" />
      </div>
      <div className="products-container">
        <ul>
          {allProducts.map((product) => (
            <li key={product.id}>
              <div className="product-container">
                <img src={product.urlImage} alt={product.nameProduct} />
                <p>{product.nameProduct}</p>
                <p>Cantidad: {product.quantity}</p>
                <p>Precio: ${product.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <input
        type="number"
        name="discountCode"
        id="discountCode"
        onChange={handleChangeDiscountCode}
      />
      <h1>Total de la compra: ${total}</h1>
      <button
        className="confirm-button"
        onClick={() => handlePurchase(allProducts)}
      >
        Confirmar compra
      </button>
    </>
  );
}
