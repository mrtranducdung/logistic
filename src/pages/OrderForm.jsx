import React, { useState } from 'react'
import api from '../api'

export default function OrderForm(){
  const [form, setForm] = useState({
    order_no:'ORD-'+Math.random().toString().slice(2,6),
    order_date:new Date().toISOString().slice(0,10),
    pickup_location:'',
    receiver_name:'',
    receiver_phone:'',
    receiver_address:'',
    goods_detail:'',
    weight_kg:0,
    volume_cbm:0,
    planned_delivery_date:''
  })
  const change = (k,v)=> setForm(p=>({...p,[k]:v}))
  const submit = async (e)=>{
    e.preventDefault()
    await api.post('/orders', form)
    alert('Đã tạo đơn')
    location.href = '/orders'
  }
  return (
    <div>
      <h2>Tạo đơn hàng</h2>
      <form onSubmit={submit} style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:8, maxWidth:900 }}>
        {input('Số đơn', 'order_no')}
        {input('Ngày đơn', 'order_date', 'date')}
        {input('Nơi nhận hàng*', 'pickup_location')}
        {input('Người nhận*', 'receiver_name')}
        {input('SĐT người nhận', 'receiver_phone')}
        {input('Địa chỉ nhận', 'receiver_address')}
        {input('Chi tiết hàng hóa*', 'goods_detail')}
        {input('Trọng lượng (kg)', 'weight_kg', 'number')}
        {input('Thể tích (cbm)', 'volume_cbm', 'number')}
        {input('Ngày giao dự kiến', 'planned_delivery_date', 'date')}
        <div style={{ gridColumn:'1 / -1' }}>
          <button>Tạo</button>
        </div>
      </form>
    </div>
  )
  function input(label, key, type='text'){
    return <label style={{ display:'grid' }}>{label}
      <input type={type} value={form[key]||''} onChange={e=>change(key, type==='number'? Number(e.target.value): e.target.value)} />
    </label>
  }
}
