import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header'
import Login from './Login';
import ForgotPassword from './ForgotPassword';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="flex flex-col min-h-full w-full">
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </BrowserRouter>,
  </React.StrictMode>,
  document.getElementById('root')
)
