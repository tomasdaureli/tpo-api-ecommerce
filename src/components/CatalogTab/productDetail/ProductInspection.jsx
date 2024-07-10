import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import imgen from "../../../assets/imgs/noProductImage.png";
import AddProductForm from "../../Forms/AddProductForm";
import ConfirmationModal from "../../modals/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProductById,
} from "../../../Features/Products/ProductAction";
import "./productInspection.css";
import { getUserByJWT } from "../../../Features/User/UserAction";
import Swal from "sweetalert2";

export function ProductInspection({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) {
  const dispatch = useDispatch();
  const { product, status, error } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const { productId } = useParams();
  const navigate = useNavigate();
  const [createProduct, setCreateProduct] = useState(false);

  const [img, setImg] = useState("");

  useEffect(() => {
    dispatch(getProductById(formattedProductId));
    const loadUser = async () => {
      dispatch(getUserByJWT())
        .unwrap()
        .then((result) => {
          localStorage.setItem("USER", JSON.stringify(result));
        })
        .catch((error) => {
          console.error("Product Inspector failed:", error);
        });
    };
    loadUser();
  }, [createProduct]);

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

  const handdleProductUpdate = () => {
    setCreateProduct(!createProduct);
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
              // didClose: () => navigate("/catalogo"),
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
            {user?.role === "COMPRADOR" ? (
              <button
                className="add-to-cart"
                onClick={() => onAddProduct(product)}
              >
                Añadir al carrito
              </button>
            ) : (
              <>
                <button className="add-to-cart" onClick={handdleProductUpdate}>
                  Actualizar producto
                </button>
                <button
                  className="add-to-cart delete"
                  onClick={() => handleOpenModal()}
                >
                  Eliminar producto
                </button>
              </>
            )}
          </div>
          <p className="description">
            <strong>Descripción: </strong>
            <br />
          </p>
          <p className="description-text">{product.description}</p>
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
