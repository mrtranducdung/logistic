import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Delivery(){
  const [shipments, setShipments] = useState([])
  const [selected, setSelected] = useState('')
  const [location, setLocation] = useState('')
  const [note, setNote] = useState('')
  useEffect(()=>{ api.get('/shipments').then(r=>setShipments(r.data)) },[])
  const markDelivered = async ()=>{
    await api.post(`/tracking/${selected}/deliver`, { location, note })
    alert('Đã đánh dấu giao hàng')
  }
  return (
    <div>
      <h2>Giao hàng</h2>
      <select value={selected} onChange={e=>setSelected(Number(e.target.value))} style={{ width:'100%' }}>
        <option value="">-- chọn chuyến --</option>
        {shipments.map(s=><option key={s.id} value={s.id}>{s.waybill_no} | {s.order_no}</option>)}
      </select>
      <input placeholder="Vị trí" value={location} onChange={e=>setLocation(e.target.value)} />
      <input placeholder="Ghi chú" value={note} onChange={e=>setNote(e.target.value)} />
      <button onClick={markDelivered}>Xác nhận giao</button>
    </div>
  )
}
