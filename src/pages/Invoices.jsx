import React, { useEffect, useState } from 'react'
import api from '../api'
import { API_BASE } from '../api'

export default function Invoices(){
  const [rows, setRows] = useState([])
  useEffect(()=>{ api.get('/invoices').then(r=>setRows(r.data)) },[])
  return (
    <div>
      <h2>Hóa đơn</h2>
      <table border="1" cellPadding="6" style={{ width:'100%' }}>
        <thead><tr><th>Mã</th><th>Waybill</th><th>Thành tiền</th><th>File</th></tr></thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r.id}>
              <td>{r.invoice_no}</td>
              <td>{r.waybill_no}</td>
              <td>{r.amount}</td>
              <td><a href={`${API_BASE}${r.pdf_path}`} target="_blank">Tải PDF</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
