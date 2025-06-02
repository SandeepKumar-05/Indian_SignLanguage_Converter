import React from 'react'
import Home from '../Pages/HomePage/Home'
import Layout from '../Pages/Layout/Layout'
import ConvertPage from '../Pages/ConvertPage/ConvertPage'
import TextToSignPage from '../Pages/ConvertPage/TextToSignPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
export default function MainComponent() {
  return (
    <Router>
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/' element={<Home/>} />
        <Route path="translate" element={<ConvertPage/>} />
        <Route path='texttosign' element={<TextToSignPage/>}/>
      </Route>
    </Routes>
  </Router>
  )
}
