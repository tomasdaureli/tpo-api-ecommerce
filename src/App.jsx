import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { Home } from './Home'

function App() {
  return (
    <>
      <h1>Hello world</h1>
      <h2>Start project</h2>
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
