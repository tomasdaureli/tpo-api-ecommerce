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
          <h2>{product.productName}</h2>
          <p className="price">${product.price}</p>
          {user.role === "COMPRADOR" && (
            <button onClick={() => onAddProduct(product)}>
              Añadir al carrito
            </button>
          )}
        </div>
      </div>
    </>
  );
};
