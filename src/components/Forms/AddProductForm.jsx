import React, { useState } from 'react';
import './AddProductForm.css'; // Asegúrate de tener este archivo en tu proyecto
import { postProduct } from '../../api/productsApi';

function AddProductForm({ setCreateProduct }) {
    const [product, setProduct] = useState({
        productName: '',
        price: '',
        urlImage: '',
        stock: '',
        description: '',
        category: '',
        subcategory: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await postProduct(product);
        if (response && response.id) {
            setProduct({
                productName: '',
                price: '',
                urlImage: '',
                stock: '',
                description: '',
                category: '',
                subcategory: ''
            });
            setCreateProduct(false)
        }

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
                    value={product.productName}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="urlImage">Imagen del producto (URL)</label>
                <input
                    type="text"
                    id="urlImage"
                    name="urlImage"
                    value={product.urlImage}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="price">Precio</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="stock">Stock</label>
                <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="description">Descripción</label>
                <textarea
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    required
                />

                <div className='category-data'>
                    <div className="input-group">
                        <label htmlFor="category">Categoria</label>
                        <select
                            id="category"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione una categoría</option>
                            <option value="CLOTHES">Ropa</option>
                            <option value="FOOTWEAR">Calzado</option>
                            <option value="ACCESSORIES">Accesorios</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="subcategory">Sub-Categoría</label>
                        <select
                            id="subcategory"
                            name="subcategory"
                            value={product.subcategory}
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



                <button className='send-button' type="submit">Agregar Producto</button>
                <button className='cancel-button' onClick={() => setCreateProduct(false)}>Cancelar</button>
            </form>

        </>

    );
}

export default AddProductForm;
