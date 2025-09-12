import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Notifications(){
  const [rows, setRows] = useState([])
  useEffect(()=>{ api.get('/notifications').then(r=>setRows(r.data)) },[])
  return (
    <div>
      <h2>Thông báo</h2>
      <ul>
        {rows.map(n=> <li key={n.id}>{n.created_at} — {n.message}</li>)}
      </ul>
    </div>
  )
}
