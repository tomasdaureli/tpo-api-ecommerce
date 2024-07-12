import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserByJWT, postUserPurchase } from "../../Features/User/UserAction";
import Alert from "../utils/SweetAlerts2/Alert";
import defaultImage from "../../assets/imgs/noProductImage.png";
import { getCouponByCoide } from "../../Features/Coupons/CuponsAction";

export function Checkout({}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { cupon } = useSelector((state) => state.coupons);
  const [discountCode, setDiscountCode] = useState("");
  const [totalChanged, setTotalChanged] = useState(null);
  const [isDiscountCodeValid, setIsDiscountCodeValid] = useState(false);
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
    const { value } = event.target;
    setDiscountCode(value);
    setIsDiscountCodeValid(false);
    setTotalChanged(null); // Reset the totalChanged when code is changed
  };

  const isPurchaseButtonEnabled = () => {
    return !discountCode || isDiscountCodeValid;
  };

  const checkCode = () => {
    dispatch(getCouponByCoide(discountCode))
      .unwrap()
      .then((result) => {
        if (result) {
          setIsDiscountCodeValid(true);
          const discountAmount = (result.percentage * cart.total) / 100;
          setTotalChanged(cart.total - discountAmount);
        } else {
          setIsDiscountCodeValid(false);
        }
      })
      .catch(() => {
        setIsDiscountCodeValid(false);
      });
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
            <div className="discount-code-inputs">
              <input
                type="text"
                value={discountCode}
                onChange={handleChangeDiscountCode}
              />
              <button type="button" onClick={checkCode}>
                Confirmar codigo
              </button>
            </div>
          </div>
          <div className="checkout-total">
            <p>
              Total de la compra: $
              {Math.round(totalChanged !== null ? totalChanged : cart.total)}
            </p>
            <button
              className={`confirm-button ${
                isPurchaseButtonEnabled() ? "" : "blocked"
              }`}
              onClick={() => handlePurchase(cart.products)}
              disabled={!isPurchaseButtonEnabled()}
            >
              Reservar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
