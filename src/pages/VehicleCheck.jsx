import React, { useEffect, useState } from 'react'
import api from '../api'

export default function VehicleCheck(){
  const [orders, setOrders] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [selected, setSelected] = useState({ order_id:'', vehicle_id:'' })
  const [dates, setDates] = useState({ loading_date:'', planned_delivery_date:'' })
  useEffect(()=>{
    api.get('/orders').then(r=>setOrders(r.data.filter(x=>x.status==='accepted' || x.status==='vehicle_assigned')))
    api.get('/vehicles').then(r=>setVehicles(r.data))
  },[])
  const createShipment = async ()=>{
    if (!selected.order_id || !selected.vehicle_id) return alert('Chọn đơn và xe')
    const { data } = await api.post('/shipments', { ...selected, ...dates })
    alert('Waybill: '+data.waybill_no)
  }
  return (
    <div>
      <h2>Kiểm tra & gán xe</h2>
      <div style={{ display:'flex', gap:16 }}>
        <div style={{ flex:1 }}>
          <h4>Đơn hàng</h4>
          <select value={selected.order_id} onChange={e=>setSelected(p=>({...p,order_id:Number(e.target.value)}))} style={{ width:'100%' }}>
            <option value="">-- chọn đơn --</option>
            {orders.map(o=> <option key={o.id} value={o.id}>{o.order_no} | {o.goods_detail} | {o.weight_kg}kg</option>)}
          </select>
          <label>Ngày đóng hàng <input type="date" value={dates.loading_date} onChange={e=>setDates(p=>({...p,loading_date:e.target.value}))} /></label>
          <label>Ngày giao dự kiến <input type="date" value={dates.planned_delivery_date} onChange={e=>setDates(p=>({...p,planned_delivery_date:e.target.value}))} /></label>
        </div>
        <div style={{ flex:1 }}>
          <h4>Xe sẵn sàng</h4>
          <select value={selected.vehicle_id} onChange={e=>setSelected(p=>({...p,vehicle_id:Number(e.target.value)}))} style={{ width:'100%' }}>
            <option value="">-- chọn xe --</option>
            {vehicles.map(v=> <option key={v.id} value={v.id}>{v.plate_number} | {v.driver_name} | {v.capacity_weight}kg</option>)}
          </select>
        </div>
      </div>
      <button style={{ marginTop: 8 }} onClick={createShipment}>Tạo waybill</button>
    </div>
  )
}
