import "./SearchBar.css";
import React, { useState } from "react";

function SearchBar({ handleSearch }) {
  const [searchParams, setSearchParams] = useState({
    name: "",
    category: "",
    subcategory: "",
  });

  const handleChange = (value, field) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      [field]: value,
    }));
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Buscar por nombre..."
        onChange={(e) => handleChange(e.target.value, "name")}
      />
      <select
        className="search-select"
        onChange={(e) => handleChange(e.target.value, "category")}
        defaultValue=""
      >
        <option value="">Seleccione una categoría</option>
        <option value="CLOTHES">Ropa</option>
        <option value="FOOTWEAR">Calzado</option>
        <option value="ACCESORIES">Accesorios</option>
      </select>
      <select
        className="search-select"
        onChange={(e) => handleChange(e.target.value, "subcategory")}
        defaultValue=""
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
      <button
        className="search-button"
        onClick={() => handleSearch(searchParams)}
      >
        Buscar
      </button>
    </div>
  );
}
export default SearchBar;
