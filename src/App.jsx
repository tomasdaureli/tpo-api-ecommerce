import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { Home } from './components/Home'
import { Catalog } from './components/Catalog'

function App() {

  return (
    <>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/catalogo">Catalogo</Link></li>
      </ul>
      <div>
        <Routes>
          <Route path='/' />
          <Route path='/home' element={<Home />} />
          <Route path='/catalogo' element={<Catalog />} />
        </Routes>
      </div>
    </>
  )
}

export default App
