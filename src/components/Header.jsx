import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

export const Header = ({ addedProduct, setAddedProduct }) => {
  const [active, setActive] = useState(false);
  const [cart, setCart] = useState({
    products: [],
    countProducts: 0,
    total: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("CART"));
    if (cart) {
      setCart(cart);
    }
  }, [addedProduct]);

  const onDeleteProduct = (product) => {
    const newProducts = cart.products.filter((item) => item.id !== product.id);

    cart.products = newProducts;
    cart.countProducts = cart.countProducts - product.quantity;
    cart.total = cart.total - product.price * product.quantity;

    localStorage.setItem("CART", JSON.stringify(cart));
    setAddedProduct(!addedProduct);
  };

  const onFinishBuy = () => {
    setActive(false);
    navigate("/buy/checkout");
  };
  return (
    <header>
      <h1>Ballers Store</h1>
      <ul className="NavBar">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/catalogo">Catalogo</Link>
        </li>
        <li>
          <Link to="/user">Usuario</Link>
        </li>
      </ul>

      <div className="container-icon">
        <div className="container-cart-icon" onClick={() => setActive(!active)}>
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
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <div className="count-products">
            <span id="contador-productos">{cart.countProducts}</span>
          </div>
        </div>

        <div
          className={`container-cart-products ${active ? "" : "hidden-cart"}`}
        >
          {cart?.products?.length ? (
            <>
              <div className="row-product">
                {cart?.products?.map((product) => (
                  <div className="cart-product" key={product.id}>
                    <div className="info-cart-product">
                      <span className="cantidad-producto-carrito">
                        {product.quantity}
                      </span>
                      <p className="titulo-producto-carrito">
                        {product.productName}
                      </p>
                      <span className="precio-producto-carrito">
                        ${product.price}
                      </span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="icon-close"
                      onClick={() => onDeleteProduct(product)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                ))}
              </div>

              <div className="cart-total">
                <h3>Total:</h3>
                <span className="total-pagar">${cart.total}</span>
              </div>

              <button className="btn-finish-buy" onClick={onFinishBuy}>
                Ir al checkout
              </button>
            </>
          ) : (
            <p className="cart-empty">El carrito está vacío</p>
          )}
        </div>
      </div>
    </header>
  );
};
