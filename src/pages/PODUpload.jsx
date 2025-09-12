import React, { useEffect, useState } from 'react'
import api from '../api'

export default function PODUpload(){
  const [shipments, setShipments] = useState([])
  const [selected, setSelected] = useState('')
  const [file, setFile] = useState(null)
  useEffect(()=>{ api.get('/shipments').then(r=>setShipments(r.data)) },[])
  const upload = async ()=>{
    if (!file || !selected) return alert('Chọn chuyến và file')
    const fd = new FormData()
    fd.append('file', file)
    const { data } = await api.post(`/pod/${selected}`, fd, { headers:{ 'Content-Type':'multipart/form-data' } })
    alert('Đã upload POD: '+data.file)
  }
  return (
    <div>
      <h2>Upload POD</h2>
      <select value={selected} onChange={e=>setSelected(Number(e.target.value))} style={{ width:'100%' }}>
        <option value="">-- chọn chuyến --</option>
        {shipments.map(s=><option key={s.id} value={s.id}>{s.waybill_no}</option>)}
      </select>
      <input type="file" onChange={e=>setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
    </div>
  )
}
