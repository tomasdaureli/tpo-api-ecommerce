import { Routes, Route } from 'react-router-dom'

import React, { useState } from 'react'

import './App.css'
import { Home } from './components/HomeTab/Home'
import { Catalog } from './components/CatalogTab/Catalog'
import { CatalogLayout } from './components/CatalogTab/CatalogLayout'
import { Product } from './components/CatalogTab/Product'
import { User } from './components/UserTab/User'
import { Header } from './components/Header'

function App() {

  const [allProducts, setAllProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [countProducts, setCountProducts] = useState(0)

  return (
    <>
      <Header 
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts} />
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalogo' element={<CatalogLayout />}>
            <Route index element={<Catalog 
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              total={total}
              setTotal={setTotal}
              countProducts={countProducts}
              setCountProducts={setCountProducts}/>
            } />
            <Route path=':productId' element={<Product
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              total={total}
              setTotal={setTotal}
              countProducts={countProducts}
              setCountProducts={setCountProducts} />
            } />
          </Route>
          <Route path='/user' element={<User />} />
        </Routes>
      </div>
    </>
  )
}

export default App
