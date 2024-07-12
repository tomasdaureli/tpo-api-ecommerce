import React, { useEffect, useState } from "react";
import "./productUserCard.css";
import imgen from "../../assets/imgs/noProductImage.png";
import { useNavigate } from "react-router-dom";

export function ProductVendorCard({ product }) {
  const navigate = useNavigate();

  const [img, setImg] = useState("");

  useEffect(() => {
    setImg(product.urlImage || imgen);
  }, [product.urlImage]);

  const handleError = () => {
    if (img !== imgen) {
      setImg(imgen);
    }
  };

  const handleUpdateProduct = async (id) => {
    navigate(`/catalogo/${id}`);
  };

  return (
    <div className="vendor-card">
      <h4 className="vendor-title">{product.productName}</h4>
      <div className="product-status">
        {product.active ? (
          <>
            <div className="status-indicator active"></div>
            <span className="status-text">Activo</span>
          </>
        ) : (
          <>
            <div className="status-indicator inactive"></div>
            <span className="status-text">Inactivo</span>
          </>
        )}
      </div>
      <div className="vendor-info">
        <img
          src={img}
          alt={product.productName}
          onError={handleError}
          className="vendor-image"
        />
        <div className="vendor-details">
          <p className="vendor-price">Precio: ${product.price}</p>
          <p className="vendor-stock">Total stock: {product.stock}</p>
          <p className="vendor-sold">Total vendido: {product.sold}</p>
          <button
            type="button"
            className="vendor-button"
            onClick={() => handleUpdateProduct(product.id)}
          >
            Actualizar información
          </button>
        </div>
      </div>
    </div>
  );
}
