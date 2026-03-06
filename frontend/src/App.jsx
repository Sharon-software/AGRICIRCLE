import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/home'
import Postskill from './Pages/Postskill'
import PostSupply from './Pages/PostSupply'
import FindSuppliers from './Pages/FindSuppliers'
import Register from './Pages/Register'




function App() {

  return (
    
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Postskill' element={<Postskill />}></Route>
        <Route path='/PostSupply' element={<PostSupply />}></Route>
        <Route path='/FindSuppliers' element={<FindSuppliers />}></Route>
        <Route path='/Register' element={<Register />}></Route>

      </Routes>
    
  )
}

export default App
