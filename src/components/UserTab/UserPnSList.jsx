import React, { useEffect, useState } from "react";
import "./User.css";
import { ProductBuyerCard } from "../Cards/productBuyerCard";
import { ProductVendorCard } from "../Cards/productVendorCard";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySeller } from "../../Features/Products/ProductAction";

export function UserPnSList({ refreshProducts }) {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const { user, buys } = useSelector((state) => state.user);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [productsToShow, setProductsToShow] = useState({});
  const bulkSize = 4;
  useEffect(() => {
    const loadUser = async () => {
      if (user?.role == "VENDEDOR") {
        dispatch(getProductsBySeller(user.id));
      }
      if (user?.role == "COMPRADOR") {
        setProductsToShow(buys);
      }
    };
    loadUser();
  }, [user]);

  useEffect(() => {
    if (status === "succeeded" && user?.role == "VENDEDOR") {
      setProductsToShow(products);
    }
  }, [products, status]);

  const purchasesBulks = productsToShow
    ? Array.from(
        { length: Math.ceil(productsToShow.length / bulkSize) },
        (_, i) => productsToShow.slice(i * bulkSize, i * bulkSize + bulkSize)
      )
    : [];

  const previousBulk = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const nextBulk = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < purchasesBulks.length - 1 ? prevIndex + 1 : prevIndex
    );
  };
  return (
    <>
      {!user ? (
        <div>Cargando datos del usuario...</div>
      ) : (
        <div className="container">
          <div className="userPurchases">
            {user?.role == "COMPRADOR" ? (
              <p>Total de compras: {productsToShow.length}</p>
            ) : (
              <p>Total de productos: {productsToShow.length}</p>
            )}
            <div className="pagination-container">
              <button
                className="page-button"
                onClick={previousBulk}
                disabled={currentIndex === 0}
              >
                Anterior
              </button>
              <div className="page-info">
                Página: {currentIndex + 1} de {purchasesBulks.length}
              </div>
              <button
                className="page-button"
                onClick={nextBulk}
                disabled={currentIndex === purchasesBulks.length - 1}
              >
                Siguiente
              </button>
            </div>
            <div className="user-container-items">
              {user?.role == "COMPRADOR" ? (
                <>
                  {purchasesBulks[currentIndex]?.map((product, index) => (
                    <ProductBuyerCard
                      product={product}
                      key={index}
                      refreshProducts={refreshProducts}
                    />
                  ))}
                </>
              ) : (
                <>
                  {purchasesBulks[currentIndex]?.map((product, index) => (
                    <ProductVendorCard
                      product={product}
                      key={index}
                      refreshProducts={refreshProducts}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
