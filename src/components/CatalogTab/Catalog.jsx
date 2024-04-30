import React from 'react'

import { ProductList } from './ProductList'

export function Catalog({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal
}) {

  return (
    <ProductList 
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts} />
  )
}
