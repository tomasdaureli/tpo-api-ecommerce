import React, { useEffect, useState } from "react";
import imgen from "../../assets/imgs/noProductImage.png";

import "./productList.css";

export const ProductCards = ({
  onAddProduct,
  product,
  user,
  handleProductClick,
}) => {
  const [img, setImg] = useState([]);

  useEffect(() => {
    setImg(product.urlImage || imgen);
  }, [product.urlImage]);

  const handleError = () => {
    if (img !== imgen) {
      setImg(imgen);
    }
  };
  return (
    <>
      <div className="item" key={product.id}>
        <figure>
          <img
            src={img}
            alt={product.productName}
            onError={handleError}
            onClick={() => handleProductClick(product.id)}
          />
        </figure>
        <div className="info-product">
          {user?.role === "VENDEDOR" && (
            <div class="product-status product-card-status">
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
          )}

          <h2>{product.productName}</h2>
          <p className="price">${product.price}</p>
          {user?.role === "COMPRADOR" && (
            <button onClick={() => onAddProduct(product)}>
              Añadir al carrito
            </button>
          )}
        </div>
      </div>
    </>
  );
};
