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
    <div className="product-item">
      <h4 className="product-title">{product.productName}</h4>
      <div className="product-info">
        <img
          src={img}
          alt={product.productName}
          onError={handleError}
          className="product-image"
        />
        <div className="product-details">
          <p className="product-price">Precio: ${product.price}</p>
          <p className="product-stock">Total stock: {product.stock}</p>
          <p className="product-sold">Total vendido: {product.sold}</p>
          <button
            type="button"
            className="send-button"
            onClick={() => handleUpdateProduct(product.id)}
          >
            Actualizar informacion
          </button>
        </div>
      </div>
    </div>
  );
}
