import React from 'react'
import { BrowserRouter as Router, Routes, Route , Navigate, BrowserRouter } from "react-router-dom";
import Stock from '../pages/Index';
import CompanyOverview from '../pages/CompanyOverview';
import Product from '../pages/Product';

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Stock />} />
          <Route path="/products" element={<Product />} />
          <Route path="/company/:ticker" element={<CompanyOverview />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
  )
}
export default AppRoutes;
