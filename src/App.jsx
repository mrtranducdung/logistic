import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'

export default function App() {
  const nav = useNavigate();
  const logout = () => { localStorage.removeItem('token'); nav('/login'); };
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      <aside style={{ width: 240, background: '#0f172a', color:'#fff', padding: 16 }}>
        <h3>Logistic</h3>
        <nav style={{ display:'grid', gap:8 }}>
          <Link style={{ color:'#fff' }} to="/">Dashboard</Link>
          <Link style={{ color:'#fff' }} to="/orders">Đơn hàng</Link>
          <Link style={{ color:'#fff' }} to="/orders/new">Tạo đơn</Link>
          <Link style={{ color:'#fff' }} to="/vehicle-check">Kiểm tra xe</Link>
          <Link style={{ color:'#fff' }} to="/suppliers">Nhà cung cấp</Link>
          <Link style={{ color:'#fff' }} to="/waybills">Waybill</Link>
          <Link style={{ color:'#fff' }} to="/tracking">Tracking</Link>
          <Link style={{ color:'#fff' }} to="/delivery">Giao hàng</Link>
          <Link style={{ color:'#fff' }} to="/pod">Upload POD</Link>
          <Link style={{ color:'#fff' }} to="/costs">Chi phí</Link>
          <Link style={{ color:'#fff' }} to="/invoices">Hóa đơn</Link>
          <Link style={{ color:'#fff' }} to="/notifications">Thông báo</Link>
        </nav>
        <button onClick={logout} style={{ marginTop: 16 }}>Đăng xuất</button>
      </aside>
      <main style={{ flex: 1, padding: 20, overflow: 'auto' }}>
        <Outlet />
      </main>
    </div>
  )
}
