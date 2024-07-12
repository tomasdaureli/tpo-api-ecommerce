import { useSelector } from "react-redux";
import "./SearchBar.css";
import React, { useEffect, useState } from "react";

function SearchBar({ handleSearch }) {
  const { user, status, error } = useSelector((state) => state.user);
  const [filterChanged, setFilterChanged] = useState(false);
  const [searchParams, setSearchParams] = useState({
    name: "",
    category: "",
    subcategory: "",
    sortPrice: "",
    activeStatus: "",
  });

  const handleChange = (value, field) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      [field]: value,
    }));
    setFilterChanged(true);
  };

  const handleClearFilter = async () => {
    if (!searchParams) {
      return;
    }
    const resetParams = {
      name: "",
      category: "",
      subcategory: "",
      sortPrice: "",
      activeStatus: "",
    };
    setSearchParams(resetParams);
    setFilterChanged(false);
    handleSearch(resetParams);
  };

  const isFilterActive = () => {
    return Object.values(searchParams).some((x) => x !== "");
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        value={searchParams.name}
        placeholder="Buscar por nombre..."
        onChange={(e) => handleChange(e.target.value, "name")}
      />
      <select
        className="search-select"
        value={searchParams.category}
        onChange={(e) => handleChange(e.target.value, "category")}
      >
        <option value="">Seleccione una categoría</option>
        <option value="CLOTHES">Ropa</option>
        <option value="FOOTWEAR">Calzado</option>
        <option value="ACCESORIES">Accesorios</option>
      </select>
      <select
        className="search-select"
        value={searchParams.subcategory}
        onChange={(e) => handleChange(e.target.value, "subcategory")}
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
      {user?.role == "COMPRADOR" && (
        <select
          className="search-select"
          value={searchParams.sortPrice}
          onChange={(e) => handleChange(e.target.value, "sortPrice")}
        >
          <option value="">Ordenar por precio</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      )}
      {user?.role == "VENDEDOR" && (
        <select
          className="search-select"
          value={searchParams.activeStatus}
          onChange={(e) => handleChange(e.target.value, "activeStatus")}
        >
          <option value="">Estado del producto</option>
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
        </select>
      )}
      <button
        className="searchBarrButton search-button"
        onClick={() => handleSearch(searchParams)}
      >
        Buscar
      </button>
      <button
        className={`searchBarrButton ${
          !isFilterActive() ? "blockButton" : " searchBarrButton search-button"
        }`}
        onClick={handleClearFilter}
        disabled={!isFilterActive()}
      >
        Borrar filtro
      </button>
    </div>
  );
}
export default SearchBar;
