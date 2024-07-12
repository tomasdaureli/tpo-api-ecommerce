import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./productList.css";
import AddProductForm from "../Forms/AddProductForm";
import { ProductCards } from "./productCards";
import SearchBar from "../utils/Searchbar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getProductsByParameters,
  getProductsBySeller,
} from "../../Features/Products/ProductAction";
import { getUserByJWT } from "../../Features/User/UserAction";
import Alert from "../utils/SweetAlerts2/Alert";

export const ProductList = ({ addedProduct, setAddedProduct }) => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const [purchasesBulks, setPurchasesBulks] = useState([]);
  const [createProduct, setCreateProduct] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cart, setCart] = useState({
    products: [],
    countProducts: 0,
    total: 0,
  });
  const bulkSize = 4;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserByJWT());
    const cart = JSON.parse(localStorage.getItem("CART"));
    if (cart) {
      setCart(cart);
      setAddedProduct(!addedProduct);
    }
  }, []);

  useEffect(() => {
    if (user?.role == "VENDEDOR") {
      dispatch(
        getProductsBySeller({
          sellerId: user.id,
          nombre: null,
          category: null,
          subcategory: null,
          actives: null,
        })
      );
    }
    if (user?.role == "COMPRADOR") {
      dispatch(getProducts());
    }
  }, [createProduct, user?.role]);

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
    const existingProduct = cart.products.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      console.log(product);
      if (existingProduct.quantity + 1 > product.stock) {
        Alert(
          "warning",
          "Este producto no tiene mas stock, no podras agregar mas de lo que tienes en tu carrito.",
          "center"
        );
        return;
      } else {
        cart.products = cart.products.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
    } else {
      if (product.stock < 1) {
        Alert(
          "error",
          "El producto seleccionado no tiene stock, disculpa las molestias",
          "center"
        );
        return;
      } else {
        cart.products.push({ ...product, quantity: 1 });
      }
    }

    cart.countProducts = cart.countProducts + 1;
    cart.total = cart.total + product.price;

    localStorage.setItem("CART", JSON.stringify(cart));
    setAddedProduct(!addedProduct);
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
    if (user?.role == "VENDEDOR") {
      dispatch(
        getProductsBySeller({
          sellerId: user.id,
          nombre: e.name,
          category: e.category,
          subcategory: e.subcategory,
          actives: e.activeStatus,
        })
      )
        .unwrap()
        .then((result) => {
          setCurrentIndex(0);
        })
        .catch((error) => {
          console.error("Failed:", error);
        });
    }
    if (user?.role == "COMPRADOR") {
      dispatch(
        getProductsByParameters({
          nombre: e.name,
          category: e.category,
          subcategory: e.subcategory,
          sortPriceAsc: e.sortPrice,
        })
      )
        .unwrap()
        .then((result) => {
          setCurrentIndex(0);
        })
        .catch((error) => {
          console.error("Failed:", error);
        });
    }
  };
  return (
    <>
      {user?.role === "VENDEDOR" && !createProduct && (
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

      {createProduct ? (
        <AddProductForm setCreateProduct={setCreateProduct} />
      ) : (
        <>
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
          <SearchBar handleSearch={handleSearch} />
          <div
            className="container-items"
            style={{
              gridTemplateColumns: `repeat(${bulkSize}, minmax(180px, 1fr))`,
            }}
          >
            {products.length > 0 ? (
              purchasesBulks[currentIndex]?.map((product, index) => (
                <ProductCards
                  key={index}
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
        </>
      )}
    </>
  );
};
