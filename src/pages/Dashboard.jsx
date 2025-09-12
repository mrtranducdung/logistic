import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Dashboard(){
  const [orders, setOrders] = useState([])
  const [shipments, setShipments] = useState([])
  useEffect(()=>{
    api.get('/orders').then(r=>setOrders(r.data))
    api.get('/shipments').then(r=>setShipments(r.data))
  },[])
  return (
    <div>
      <h2>Tổng quan</h2>
      <div style={{ display:'flex', gap:16 }}>
        <Card title="Đơn hàng" value={orders.length} />
        <Card title="Chuyến hàng" value={shipments.length} />
      </div>
    </div>
  )
}
function Card({ title, value }){
  return <div style={{ border:'1px solid #ddd', padding:16, borderRadius:8 }}>
    <div style={{ color:'#555' }}>{title}</div>
    <div style={{ fontSize:28 }}>{value}</div>
  </div>
}
