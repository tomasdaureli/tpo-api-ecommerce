import React from 'react'

import { useNavigate } from 'react-router-dom'

export default function Buy() {

  const navigate = useNavigate();

  const onBackHomePage = () => {
    navigate('/');
  }

  return (
    <>
      <h2>Gracias por su compra</h2>
      <button onClick={onBackHomePage}>Volver a la pagina de inicio</button>
    </>
  )
}
