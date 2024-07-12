import React, { useState } from "react";
import {
  postProduct,
  updateProduct,
} from "../../Features/Products/ProductAction.js";
import { useDispatch, useSelector } from "react-redux";

import "./AddProductForm.css";
function AddProductForm({ setCreateProduct, productToUpdate }) {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const [productToSend, setProductToSend] = useState({
    productName: productToUpdate?.productName || "",
    price: productToUpdate?.price || "",
    urlImage: productToUpdate?.urlImage || "",
    stock: productToUpdate?.stock || "",
    description: productToUpdate?.description || "",
    category: productToUpdate?.category || "",
    subcategory: productToUpdate?.subcategory || "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductToSend((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(postProduct(productToSend));
    setProductToSend({
      productName: "",
      price: "",
      urlImage: "",
      stock: "",
      description: "",
      category: "",
      subcategory: "",
    });
    setCreateProduct(false);
  };

  const handleCancel = async (event) => {
    event.preventDefault();
    setCreateProduct(false);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    dispatch(updateProduct({ product: productToSend, id: productToUpdate.id }));
    setProductToSend({
      productName: "",
      price: "",
      urlImage: "",
      stock: "",
      description: "",
      category: "",
      subcategory: "",
    });
    setCreateProduct(false);
  };
  return (
    <>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <h2>Agregar Producto</h2>
        <label htmlFor="productName">Nombre del Producto</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={productToSend.productName}
          onChange={handleChange}
          required
        />
        <label htmlFor="urlImage">Imagen del producto (URL)</label>
        <input
          type="text"
          id="urlImage"
          name="urlImage"
          value={productToSend.urlImage}
          onChange={handleChange}
          required
        />

        <label htmlFor="price">Precio</label>
        <input
          type="number"
          id="price"
          name="price"
          value={productToSend.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={productToSend.stock}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={productToSend.description}
          onChange={handleChange}
          required
        />

        <div className="category-data">
          <div className="input-group">
            <label htmlFor="category">Categoria</label>
            <select
              id="category"
              name="category"
              value={productToSend.category}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una categoría</option>
              <option value="CLOTHES">Ropa</option>
              <option value="FOOTWEAR">Calzado</option>
              <option value="ACCESORIES">Accesorios</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="subcategory">Sub-Categoría</label>
            <select
              id="subcategory"
              name="subcategory"
              value={productToSend.subcategory}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una subcategoría</option>
              <option value="FASHION">Moda</option>
              <option value="SPORTS">Deportes</option>
              <option value="RUNNING">Carrera</option>
              <option value="FOOTBALL">Fútbol</option>
              <option value="SANDALS">Sandalias</option>
              <option value="SHIRTS">Camisas</option>
              <option value="SOCKS">Calcetines</option>
              <option value="CAPS">Gorras</option>
              <option value="BAGS">Bolsos</option>
              <option value="HOODIES">Sudaderas con Capucha</option>
              <option value="SHORTS">Pantalones Cortos</option>
              <option value="TROUSERS">Pantalones</option>
              <option value="BALLS">Balones</option>
            </select>
          </div>
        </div>
        {productToUpdate ? (
          <button className="send-button" onClick={handleUpdate}>
            Actualizar Producto
          </button>
        ) : (
          <button className="send-button" type="submit">
            Agregar Producto
          </button>
        )}
        <button className="cancel-button" onClick={handleCancel}>
          Cancelar
        </button>
      </form>
    </>
  );
}

export default AddProductForm;
