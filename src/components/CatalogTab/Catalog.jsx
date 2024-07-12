import React from "react";

import { ProductList } from "./ProductList";

export function Catalog({ addedProduct, setAddedProduct }) {
  return (
    <ProductList
      addedProduct={addedProduct}
      setAddedProduct={setAddedProduct}
    />
  );
}
