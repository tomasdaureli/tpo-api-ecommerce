import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { Home } from './components/HomeTab/Home'
import { Catalog } from './components/CatalogTab/Catalog'
import { User } from './components/UserTab/User'

function App() {

  return (
    <>
      <ul className='NavBar'>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/catalogo">Catalogo</Link></li>
        <li><Link to="/user">Usuario</Link></li>
      </ul>
      <div>
        <Routes>
          <Route path='/' />
          <Route path='/home' element={<Home />} />
          <Route path='/catalogo' element={<Catalog />} />
          <Route path='/user' element={<User />} />
        </Routes>
      </div>
    </>
  )
}

export default App
