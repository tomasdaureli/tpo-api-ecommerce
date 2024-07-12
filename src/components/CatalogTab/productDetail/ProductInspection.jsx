import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import imgen from "../../../assets/imgs/noProductImage.png";
import AddProductForm from "../../Forms/AddProductForm";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "../../../Features/Products/ProductAction";
import "./productInspection.css";
import { getUserByJWT } from "../../../Features/User/UserAction";
import Swal from "sweetalert2";
import Alert from "../../utils/SweetAlerts2/Alert";

export function ProductInspection({ addedProduct, setAddedProduct }) {
  const dispatch = useDispatch();
  const { product, status, error, changeFlag } = useSelector(
    (state) => state.products
  );
  const { user } = useSelector((state) => state.user);
  const { productId } = useParams();
  const [createProduct, setCreateProduct] = useState(false);
  const [cart, setCart] = useState({
    products: [],
    countProducts: 0,
    total: 0,
  });
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserByJWT());
    const cart = JSON.parse(localStorage.getItem("CART"));
    if (cart) {
      console.log(cart);
      setCart(cart);
    }
  }, []);

  useEffect(() => {
    dispatch(getProductById(formattedProductId));
    dispatch(getUserByJWT())
      .unwrap()
      .then((result) => {
        localStorage.setItem("USER", JSON.stringify(result));
      })
      .catch((error) => {
        console.error("Product Inspector failed:", error);
      });
  }, [dispatch, changeFlag, createProduct]);

  useEffect(() => {
    setImg(product.urlImage || imgen);
  }, [product.urlImage]);

  const handleError = () => {
    if (img !== imgen) {
      setImg(imgen);
    }
  };

  const formattedProductId = parseInt(productId, 10);

  const onAddProduct = (product) => {
    const existingProduct = cart.products.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
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
      } else {
        cart.products.push({ ...product, quantity: 1 });
      }
    }

    cart.countProducts = cart.countProducts + 1;
    cart.total = cart.total + product.price;

    localStorage.setItem("CART", JSON.stringify(cart));
    setAddedProduct(!addedProduct);
  };

  const handleProductUpdate = () => {
    setCreateProduct(!createProduct);
  };

  const handleProductStatusChange = () => {
    dispatch(
      updateProduct({
        product: { ...product, active: !product.active },
        id: product.id,
      })
    );
  };

  const handleOpenModal = () => {
    Swal.fire({
      title: "¿Está seguro que desea eliminar este producto?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showDenyButton: true,
      confirmButtonColor: "#d33",
      denyButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      denyButtonText: "No, cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(product.id))
          .unwrap()
          .then(() => {
            Swal.fire({
              title: "Eliminado!",
              text: "Navegando al catálogo.",
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
              didClose: () => navigate("/catalogo"),
            });
          })
          .catch((error) => {
            console.error("Product deletion failed:", error);
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar el producto.",
              icon: "error",
            });
          });
      }
    });
  };

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <>
      {!createProduct && (
        <div className="container-product-detail">
          <div className="button-back" onClick={() => navigate("/catalogo")}>
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </div>
          <div className="img-product-detail">
            <img src={img} alt={product.productName} onError={handleError} />
          </div>
          <div className="text-product-detail">
            <h1>{product.productName}</h1>
            <p>
              <strong>Precio: </strong>${product.price}
            </p>
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
            {user?.role === "COMPRADOR" ? (
              <button
                className="add-to-cart"
                onClick={() => onAddProduct(product)}
              >
                Añadir al carrito
              </button>
            ) : (
              <div className="insp-buttons-changes">
                <button
                  className="update-product-button"
                  onClick={handleProductUpdate}
                >
                  Actualizar producto
                </button>
                <button
                  className={`change-status-button ${
                    product.active ? "deactive" : "active"
                  }`}
                  onClick={handleProductStatusChange}
                >
                  {product.active ? "Desactivar producto" : "Activar producto"}
                </button>
              </div>
            )}
          </div>
          <div className="product-details">
            <div className="product-description">
              <h2>Descripción</h2>
              <p>{product.description}</p>
            </div>

            <div className="product-category">
              <h3>Categoría</h3>
              <p>{product.category}</p>
            </div>

            <div className="product-subcategory">
              <h3>Subcategoría</h3>
              <p>{product.subcategory}</p>
            </div>
          </div>
          <div className="danger-zone">
            <h2>Zona de peligro</h2>
            <button className="danger-button" onClick={() => handleOpenModal()}>
              Eliminar producto
            </button>
          </div>
        </div>
      )}

      {createProduct && (
        <AddProductForm
          setCreateProduct={setCreateProduct}
          productToUpdate={product}
        />
      )}
    </>
  );
}
