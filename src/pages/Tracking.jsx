import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Tracking(){
  const [shipments, setShipments] = useState([])
  const [events, setEvents] = useState([])
  const [selected, setSelected] = useState('')
  const [form, setForm] = useState({ status:'PICKED_UP', location:'', note:'' })
  useEffect(()=>{ api.get('/shipments').then(r=>setShipments(r.data)) },[])
  const loadEvents = async (id)=>{
    setSelected(id)
    const { data } = await api.get(`/tracking/${id}`)
    setEvents(data)
  }
  const addEvent = async ()=>{
    if (!selected) return alert('Chọn chuyến')
    await api.post(`/tracking/${selected}/events`, form)
    loadEvents(selected)
  }
  return (
    <div>
      <h2>Tracking chuyến hàng</h2>
      <select onChange={e=>loadEvents(Number(e.target.value))} style={{ width:'100%' }}>
        <option value="">-- chọn chuyến --</option>
        {shipments.map(s=><option key={s.id} value={s.id}>{s.waybill_no} | {s.order_no}</option>)}
      </select>
      <div style={{ display:'flex', gap:16, marginTop:8 }}>
        <div style={{ flex:1 }}>
          <h4>Sự kiện</h4>
          <ul>
            {events.map(ev=> <li key={ev.id}>{ev.event_time} — {ev.status} — {ev.location} — {ev.note}</li>)}
          </ul>
        </div>
        <div style={{ flex:1 }}>
          <h4>Thêm sự kiện</h4>
          <select value={form.status} onChange={e=>setForm(p=>({...p,status:e.target.value}))}>
            <option>PICKED_UP</option>
            <option>IN_TRANSIT</option>
            <option>ARRIVED_DEPOT</option>
            <option>OUT_FOR_DELIVERY</option>
            <option>DELIVERED</option>
          </select>
          <input placeholder="Vị trí" value={form.location} onChange={e=>setForm(p=>({...p,location:e.target.value}))} />
          <input placeholder="Ghi chú" value={form.note} onChange={e=>setForm(p=>({...p,note:e.target.value}))} />
          <button onClick={addEvent}>Thêm</button>
        </div>
      </div>
    </div>
  )
}
