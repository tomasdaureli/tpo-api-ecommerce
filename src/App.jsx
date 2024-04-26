import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { Home } from './components/Home'
import { ProductList } from './components/ProductList'
import { Header } from './components/Header'
import { useState } from 'react'

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
      <ProductList 
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts} />
      <ul>
        <li><Link to="/home">Home</Link></li>
      </ul>
      <div>
        <Routes>
          <Route path='/' />
          <Route path='/home' element={<Home />} />
        </Routes>
      </div>
    </>
  )
}

export default App
