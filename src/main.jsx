import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Portfolio from './pages/Portfolio'
import Examples from './pages/Examples'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/:username" element={<Portfolio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
