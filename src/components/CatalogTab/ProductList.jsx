import React, { useEffect, useState } from "react";
import {
  getProducts,
  getProductsByParameters,
  getProductsBySeller,
} from "../../api/productsApi";
import { useNavigate } from "react-router-dom";

import "./productList.css";
import AddProductForm from "../Forms/AddProductForm";
import { ProductCards } from "./productCards";
import SearchBar from "../utils/SearchBar";

export const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const [products, setProducts] = useState([]);
  const [purchasesBulks, setPurchasesBulks] = useState([]);
  const [user, setUser] = useState({});
  const [createProduct, setCreateProduct] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const bulkSize = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const loadCatalog = async () => {
      let userLogged = JSON.parse(localStorage.getItem("USER"));
      if (userLogged) {
        setUser(userLogged);
      }
      if (userLogged.role == "VENDEDOR") {
        getProductsBySeller(userLogged.id).then((data) => setProducts(data));
      } else {
        getProducts().then((data) => setProducts(data));
      }
    };
    loadCatalog();
  }, [createProduct]);

  useEffect(() => {
    setPurchasesBulks(
      products
        ? Array.from(
            { length: Math.ceil(products.length / bulkSize) },
            (_, i) => products.slice(i * bulkSize, i * bulkSize + bulkSize)
          )
        : []
    );
  }, [products]);
  const onAddProduct = (product) => {
    const existingProduct = allProducts.find((item) => item.id === product.id);

    if (existingProduct) {
      const updatedProducts = allProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setAllProducts(updatedProducts);
    } else {
      setAllProducts([...allProducts, { ...product, quantity: 1 }]);
    }
    setCountProducts(countProducts + 1);
    setTotal(total + product.price);
  };

  const handleProductClick = (productId) => {
    navigate(`/catalogo/${productId}`);
  };

  const previousBulk = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const nextBulk = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < purchasesBulks.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handleSearch = async (e) => {
    const resp = await getProductsByParameters(e.category, e.subcategory);
    if (resp.length > 0) {
      setProducts(resp);
    }
  };
  return (
    <>
      {user.role === "VENDEDOR" && !createProduct && (
        <div>
          <h1>Tus Productos</h1>
          <button
            className="create-button"
            onClick={() => setCreateProduct(true)}
          >
            Crear producto
          </button>
        </div>
      )}
      <SearchBar handleSearch={handleSearch} />
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
      {createProduct ? (
        <AddProductForm setCreateProduct={setCreateProduct} />
      ) : (
        <div className="container-items">
          {products.length > 0 ? (
            purchasesBulks[currentIndex]?.map((product) => (
              <ProductCards
                key={products.id}
                onAddProduct={onAddProduct}
                product={product}
                user={user}
                handleProductClick={handleProductClick}
              />
            ))
          ) : (
            <div>No hay ningún producto para mostrar...</div>
          )}
        </div>
      )}
    </>
  );
};
