import { useState } from 'react'
import './App.css'
import Home from './Pages/home'
import { Routes, Route } from 'react-router-dom'


function App() {

  return (
    <>
     <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
