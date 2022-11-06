import React from 'react'
import Navbar from './components/navbar/Navbar'
import Main from './pages/Main'
import SiteA from './pages/SiteA'
import SiteB from './pages/SiteB'
import { Routes, Route, Navigate } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/home" element={<Main />} />
          <Route path="/site-a" element={<SiteA />} />
          <Route path="/site-b" element={<SiteB />} />
        </Routes>
      </div>
    </>
  )
}

export default App
