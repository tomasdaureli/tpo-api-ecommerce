import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserByJWT, postUserPurchase } from "../../Features/User/UserAction";
import Alert from "../utils/SweetAlerts2/Alert";
import defaultImage from "../../assets/imgs/noProductImage.png";

export function Checkout({}) {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);
  const [discountCode, setDiscountCode] = useState(false);
  const [cart, setCart] = useState({
    products: [],
    countProducts: 0,
    total: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserByJWT());
    const cart = JSON.parse(localStorage.getItem("CART"));
    if (cart) {
      console.log(cart);
      setCart(cart);
    }
  }, []);

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
        setCart({
          products: [],
          countProducts: 0,
          total: 0,
        });
        localStorage.setItem(
          "CART",
          JSON.stringify({
            products: [],
            countProducts: 0,
            total: 0,
          })
        );
        Alert(
          "success",
          "Reservaste tu compra! Ve a la seccion de usuarios para confirmarla!",
          "center",
          "validationMessage"
        );
        navigate("/catalogo");
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
    <div className="checkout-wrapper">
      <div className="checkout-header">
        <button className="back-button" onClick={() => navigate("/catalogo")}>
          Volver al catálogo
        </button>
        <p>Usuario registrado como: {user?.email}</p>
      </div>
      <div className="checkout-body">
        <div className="checkout-info">
          <h2>Dirección para el envío</h2>
          <input type="text" placeholder="Provincia" />
          <input type="text" placeholder="Localidad" />
          <input type="text" placeholder="Calle y número" />
        </div>
        <div className="checkout-products">
          <ul className="product-list">
            {cart?.products?.map((product) => (
              <li key={product.id} className="product-item">
                <img
                  src={product.urlImage}
                  alt={product.nameProduct}
                  onError={(e) => (e.target.src = defaultImage)}
                />
                <div className="product-details">
                  <p>{product.nameProduct}</p>
                  <p>Cantidad: {product.quantity}</p>
                  <p>Precio: ${product.price}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="discount-code">
            <label>Código de descuento:</label>
            <input type="text" onChange={handleChangeDiscountCode} />
          </div>
          <div className="checkout-total">
            <p>Total de la compra: ${cart.total}</p>
            <button
              className="confirm-button"
              onClick={() => handlePurchase(cart.products)}
            >
              Reservar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
