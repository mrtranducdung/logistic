import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Costs(){
  const [shipments, setShipments] = useState([])
  const [selected, setSelected] = useState('')
  const [form, setForm] = useState({ base_fare:0, distance_km:0, weight_kg:0, fuel_surcharge:0, extra_fee:0 })
  const [result, setResult] = useState(null)
  useEffect(()=>{ api.get('/shipments').then(r=>setShipments(r.data)) },[])
  const calc = async ()=>{
    const { data } = await api.post(`/costs/${selected}/calc`, form)
    setResult(data.total)
  }
  const review = async (approved)=>{
    await api.post(`/costs/${selected}/review`, { approved })
    alert(approved ? 'Chi phí Đúng' : 'Chi phí Không đúng')
  }
  const generateInvoice = async ()=>{
    const { data } = await api.post(`/invoices/${selected}/generate`)
    alert('Đã phát hành hóa đơn: '+data.invoice_no)
  }
  return (
    <div>
      <h2>Tính chi phí & hóa đơn</h2>
      <select value={selected} onChange={e=>setSelected(Number(e.target.value))}>
        <option value="">-- chuyến --</option>
        {shipments.map(s=><option key={s.id} value={s.id}>{s.waybill_no} | {s.order_no}</option>)}
      </select>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:8, maxWidth:900 }}>
        {input('Base fare', 'base_fare')}
        {input('Km', 'distance_km')}
        {input('Trọng lượng (kg)', 'weight_kg')}
        {input('Phụ phí nhiên liệu', 'fuel_surcharge')}
        {input('Phí khác', 'extra_fee')}
      </div>
      <div style={{ marginTop:8 }}>
        <button onClick={calc}>Tính</button>
        {result!=null && <b style={{ marginLeft:8 }}>Tổng: {result}</b>}
      </div>
      <div style={{ marginTop:8 }}>
        <button onClick={()=>review(true)}>Đúng</button>
        <button onClick={()=>review(false)} style={{ marginLeft:8 }}>Không đúng</button>
        <button onClick={generateInvoice} style={{ marginLeft:8 }}>Phát hành hóa đơn</button>
      </div>
    </div>
  )
  function input(label, key){
    return <label style={{ display:'grid' }}>{label}
      <input type="number" value={form[key]} onChange={e=>setForm(p=>({...p,[key]: Number(e.target.value)}))} />
    </label>
  }
}
