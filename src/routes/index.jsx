import React from 'react'
import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";
import Stock from '../pages/stocks/Index';
const AppRoutes = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Stock />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
  )
}
export default AppRoutes;
