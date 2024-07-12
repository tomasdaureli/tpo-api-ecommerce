import React, { useEffect } from "react";
import "./productUserCard.css";
import { useDispatch, useSelector } from "react-redux";
import { patchConfirmPurchase } from "../../Features/Products/ProductAction";
import { getUserByJWT } from "../../Features/User/UserAction";
import Alert from "../utils/SweetAlerts2/Alert";

export function ProductBuyerCard({ product, refreshProducts }) {
  const dispatch = useDispatch();
  const { status, error, errorMessage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (errorMessage) {
      Alert("error", errorMessage);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(getUserByJWT());
    }
  }, [status, dispatch]);

  const handleConfirmBuy = async () => {
    dispatch(patchConfirmPurchase(product.number));
  };

  return (
    <div className="buyer-card">
      Productos:
      <div className="buyer-product-spans">
        {product?.items?.map((p, index) => (
          <span key={index}>
            {console.log(p.productName)}
            {p.product.productName} - Cantidad: {p.quantity}
          </span>
        ))}
      </div>
      <div className="buyer-product-info">
        <p className="buyer-price">Total: ${product.total}</p>
        <div className="buyer-status">
          Estado de la compra: {product.status}
        </div>
        {product.status === "PENDING" ? (
          <button
            type="button"
            className="vendor-button"
            onClick={handleConfirmBuy}
          >
            Terminar compra
          </button>
        ) : null}
      </div>
    </div>
  );
}
