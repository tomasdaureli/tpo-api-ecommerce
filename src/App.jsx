import { Routes, Route } from "react-router-dom";

import React, { useState } from "react";

import "./App.css";
import { Home } from "./components/HomeTab/Home";
import { Login } from "./components/Login&Register/Login";
import { Register } from "./components/Login&Register/Register";
import { Catalog } from "./components/CatalogTab/Catalog";
import { CatalogLayout } from "./components/CatalogTab/CatalogLayout";
import { ProductInspection } from "./components/CatalogTab/productDetail/ProductInspection";
import { User } from "./components/UserTab/User";
import { Header } from "./components/Header";
import { Checkout } from "./components/BuyTab/Checkout";
import Buy from "./components/BuyTab/Buy";

function App() {
  const [user, setUser] = useState({});
  const [addedProduct, setAddedProduct] = useState();
  return (
    <>
      {!localStorage.getItem("USER") ? (
        ""
      ) : (
        <Header addedProduct={addedProduct} setAddedProduct={setAddedProduct} />
      )}
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/catalogo" element={<CatalogLayout />}>
            <Route
              index
              element={
                <Catalog
                  addedProduct={addedProduct}
                  setAddedProduct={setAddedProduct}
                />
              }
            />
            <Route
              path=":productId"
              element={
                <ProductInspection
                  addedProduct={addedProduct}
                  setAddedProduct={setAddedProduct}
                />
              }
            />
          </Route>
          <Route
            path="/user"
            element={<User user={user} setUser={setUser} />}
          />
          <Route path="/buy/checkout" element={<Checkout />} />
          <Route path="/buy/success" element={<Buy />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
