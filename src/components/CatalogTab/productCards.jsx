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
    const loadCatalog = async () => {
      try {
        const response = await fetch(product.urlImage);
        if (response.ok) {
          setImg(product.urlImage);
        } else {
          setImg(imgen);
        }
      } catch (error) {
        setImg(imgen);
      }
    };
    loadCatalog();
  }, [product]);

  return (
    <>
      <div
        className="item"
        key={product.id}
        onClick={() => handleProductClick(product.id)}
      >
        <figure>
          <img src={img} alt={product.productName} />
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
