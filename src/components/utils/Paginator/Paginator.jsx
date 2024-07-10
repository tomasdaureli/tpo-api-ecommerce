import React from "react";
import "./Paginator.css";

const Paginator = ({ currentIndex, purchasesBulks, setCurrentIndex }) => {
  const previousBulk = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const nextBulk = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < purchasesBulks.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  return (
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
  );
};

export default Paginator;
