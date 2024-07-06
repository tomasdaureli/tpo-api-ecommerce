import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteProduct, getProductById } from "../../../api/productsApi";
import imgen from "../../../assets/imgs/noProductImage.png";

import "./productInspection.css";
import { getUserByJWB } from "../../../api/usersApi";
import AddProductForm from "../../Forms/AddProductForm";
import ConfirmationModal from "../../modals/ConfirmationModal";

export function ProductInspection({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) {
  const [product, setProduct] = useState([]);
  const { productId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [createProduct, setCreateProduct] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState("");
  const [img, setImg] = useState([]);

  useEffect(() => {
    getProductById(formattedProductId).then(async (data) => {
      setProduct(data);
      try {
        const response = await fetch(data.urlImage);
        if (response.ok) {
          setImg(data.urlImage);
        } else {
          setImg(imgen);
        }
      } catch (error) {
        setImg(imgen);
      }
    });
    const loadUser = async () => {
      const userResp = await getUserByJWB();
      localStorage.setItem("USER", JSON.stringify(userResp));
      if (userResp) {
        setUser(userResp);
      }
    };

    loadUser();
  }, [createProduct]);

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

  const handleConfirmAction = async () => {
    const resp = await deleteProduct(product.id);
    setIsOpen(false);
    navigate("/catalogo");
  };

  const handleOpenModal = (actionDescription) => {
    setAction(actionDescription);
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
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
            <img src={img} alt={product.productName} />
          </div>
          <div className="text-product-detail">
            <h1>{product.productName}</h1>
            <p>
              <strong>Precio: </strong>${product.price}
            </p>
            {user.role === "COMPRADOR" ? (
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
                  onClick={() =>
                    handleOpenModal(
                      "¿Está seguro que desea eliminar este producto?"
                    )
                  }
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
      <ConfirmationModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
        action={action}
      />
      {createProduct && (
        <AddProductForm
          setCreateProduct={setCreateProduct}
          productToUpdate={product}
        />
      )}
    </>
  );
}
