import React from 'react'
import {  Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Home from './pages/Home'
import Form from './pages/Form'
import Choices from './pages/Choices'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/form' element={<Form/>}/>
        <Route path='/choices' element={<Choices/>}/>

      </Routes>
    </>  )
}

export default App