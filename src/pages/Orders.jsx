import React, { useEffect, useState } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'

export default function Orders(){
  const [rows, setRows] = useState([])
  useEffect(()=>{ load() },[])
  const load = ()=> api.get('/orders').then(r=>setRows(r.data))
  const reject = async (id)=> { await api.post(`/orders/${id}/reject`); load(); }
  return (
    <div>
      <h2>Đơn hàng</h2>
      <Link to="/orders/new">+ Tạo đơn</Link>
      <table border="1" cellPadding="6" style={{ width:'100%', marginTop:8 }}>
        <thead>
          <tr>
            <th>Order No</th><th>Ngày</th><th>Nơi nhận</th><th>Người nhận</th><th>Hàng hóa</th><th>Trọng lượng</th><th>Trạng thái</th><th>...</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r.id}>
              <td>{r.order_no}</td>
              <td>{r.order_date}</td>
              <td>{r.pickup_location}</td>
              <td>{r.receiver_name}</td>
              <td>{r.goods_detail}</td>
              <td>{r.weight_kg}</td>
              <td>{r.status}</td>
              <td><button onClick={()=>reject(r.id)}>Không chấp nhận</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
