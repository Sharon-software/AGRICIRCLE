
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/home'
import Postskill from './Pages/Postskill'
import PostSupply from './Pages/PostSupply'
import FindSuppliers from './Pages/FindSuppliers'
import Register from './Pages/Register'
import Login from './Pages/Login'
import PrivateRoute from './PrivateRoute'
import Dashboard from './Pages/Dashboard'
import PublicRoute from './PublicRoute'


function App() {

  return (
     
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Postskill' element={<PrivateRoute><Postskill /></PrivateRoute>} />
        <Route path='/PostSupply' element={<PrivateRoute><PostSupply /></PrivateRoute>} />
        <Route path='/FindSuppliers' element={<PrivateRoute><FindSuppliers /></PrivateRoute>}/>
        <Route path='/Register' element={<PublicRoute><Register /></PublicRoute>}></Route>
        <Route path='/Login' element={<PublicRoute><Login /></PublicRoute>}></Route>
        <Route path='/Dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route>

      </Routes>
    
  )
}

export default App
