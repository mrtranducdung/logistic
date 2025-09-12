import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Suppliers(){
  const [suppliers, setSuppliers] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [form, setForm] = useState({ name:'', contact:'', phone:'' })
  const [vform, setVform] = useState({ plate_number:'', capacity_weight:0, driver_name:'', driver_phone:'', supplier_id:'' })
  const load = ()=>{
    api.get('/suppliers').then(r=>setSuppliers(r.data))
    api.get('/vehicles').then(r=>setVehicles(r.data))
  }
  useEffect(load,[])
  const addSup = async ()=>{ await api.post('/suppliers', form); setForm({name:'',contact:'',phone:''}); load(); }
  const addVeh = async ()=>{ await api.post('/vehicles', vform); setVform({plate_number:'',capacity_weight:0,driver_name:'',driver_phone:'',supplier_id:''}); load(); }
  return (
    <div>
      <h2>Nhà cung cấp & Xe</h2>
      <div style={{ display:'flex', gap:16 }}>
        <div style={{ flex:1 }}>
          <h4>Thêm NCC</h4>
          <input placeholder="Tên" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} />
          <input placeholder="Liên hệ" value={form.contact} onChange={e=>setForm(p=>({...p,contact:e.target.value}))} />
          <input placeholder="Điện thoại" value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} />
          <button onClick={addSup}>Thêm</button>
          <h4>Danh sách NCC</h4>
          <ul>{suppliers.map(s=><li key={s.id}>{s.name} - {s.contact} - {s.phone}</li>)}</ul>
        </div>
        <div style={{ flex:1 }}>
          <h4>Thêm xe</h4>
          <input placeholder="Biển số" value={vform.plate_number} onChange={e=>setVform(p=>({...p,plate_number:e.target.value}))} />
          <input placeholder="Tải trọng (kg)" type="number" value={vform.capacity_weight} onChange={e=>setVform(p=>({...p,capacity_weight:Number(e.target.value)}))} />
          <input placeholder="Tài xế" value={vform.driver_name} onChange={e=>setVform(p=>({...p,driver_name:e.target.value}))} />
          <input placeholder="SĐT tài xế" value={vform.driver_phone} onChange={e=>setVform(p=>({...p,driver_phone:e.target.value}))} />
          <select value={vform.supplier_id} onChange={e=>setVform(p=>({...p,supplier_id:Number(e.target.value)}))}>
            <option value="">-- NCC --</option>
            {suppliers.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <button onClick={addVeh}>Thêm xe</button>
          <h4>Danh sách xe</h4>
          <ul>{vehicles.map(v=><li key={v.id}>{v.plate_number} - {v.capacity_weight}kg - {v.driver_name} ({v.driver_phone})</li>)}</ul>
        </div>
      </div>
    </div>
  )
}
