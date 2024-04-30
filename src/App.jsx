import { Routes, Route } from 'react-router-dom'

import React, { useState } from 'react'

import './App.css'
import { Home } from './components/HomeTab/Home'
import { Catalog } from './components/CatalogTab/Catalog'
import { CatalogLayout } from './components/CatalogTab/CatalogLayout'
import { Product } from './components/CatalogTab/Product'
import { User } from './components/UserTab/User'
import { Header } from './components/Header'
import { Checkout } from './components/BuyTab/Checkout'
import Buy from './components/BuyTab/Buy'

function App() {

  const [allProducts, setAllProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [countProducts, setCountProducts] = useState(0)
  const [user, setUser] = useState({})

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
          <Route path='/user' element={<User 
            user={user}
            setUser={setUser}/>
          } />
          <Route path='/buy/checkout' element={<Checkout 
            user={user}
            setUser={setUser}
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            total={total}
            setTotal={setTotal}
            setCountProducts={setCountProducts}/>
          } />
          <Route path='/buy/success' element={<Buy />} />
        </Routes>
      </div>
    </>
  )
}

export default App
