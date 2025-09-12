import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Waybills(){
  const [rows, setRows] = useState([])
  useEffect(()=>{ api.get('/shipments').then(r=>setRows(r.data)) },[])
  return (
    <div>
      <h2>Waybill</h2>
      <table border="1" cellPadding="6" style={{ width:'100%' }}>
        <thead><tr><th>Waybill</th><th>Order</th><th>Xe</th><th>Ngày đóng</th><th>Ngày giao dự kiến</th><th>Trạng thái</th></tr></thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r.id}><td>{r.waybill_no}</td><td>{r.order_no}</td><td>{r.plate_number}</td><td>{r.loading_date||''}</td><td>{r.planned_delivery_date||''}</td><td>{r.status}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
