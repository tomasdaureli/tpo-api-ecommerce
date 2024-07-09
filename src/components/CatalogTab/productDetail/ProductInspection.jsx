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

  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState("");
  const [img, setImg] = useState([]);

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
    const loadProduct = async () => {
      try {
        const response = await fetch(product.urlImage);
        if (response.ok) {
          setImg(product.urlImage);
        } else {
          setImg(imgen);
        }
      } catch (error) {
        console.log(error);
        setImg(imgen);
      }
    };

    loadProduct();
  }, [dispatch, product]);

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
    dispatch(deleteProduct(product.id))
      .unwrap()
      .then((result) => {
        console.log(result);
        setIsOpen(false);
        navigate("/catalogo");
      })
      .catch((error) => {
        console.error("Product Inspector failed:", error);
      });
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
