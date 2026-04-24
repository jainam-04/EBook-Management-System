import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AddBook from './pages/AddBook'
import Books from './pages/Books'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/add-book' element={<AddBook/>}/>
        <Route path='/books' element={<Books/>}/>
      </Routes>
    </div>
  )
}

export default App
