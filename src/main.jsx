import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Orders from './pages/Orders.jsx'
import OrderForm from './pages/OrderForm.jsx'
import VehicleCheck from './pages/VehicleCheck.jsx'
import Suppliers from './pages/Suppliers.jsx'
import Waybills from './pages/Waybills.jsx'
import Tracking from './pages/Tracking.jsx'
import Delivery from './pages/Delivery.jsx'
import PODUpload from './pages/PODUpload.jsx'
import Costs from './pages/Costs.jsx'
import Invoices from './pages/Invoices.jsx'
import Notifications from './pages/Notifications.jsx'

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireAuth><App /></RequireAuth>}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/new" element={<OrderForm />} />
        <Route path="vehicle-check" element={<VehicleCheck />} />
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="waybills" element={<Waybills />} />
        <Route path="tracking" element={<Tracking />} />
        <Route path="delivery" element={<Delivery />} />
        <Route path="pod" element={<PODUpload />} />
        <Route path="costs" element={<Costs />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
