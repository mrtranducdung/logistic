// import React, { useState } from 'react'
// import api from '../api'

// export default function Login(){
//   const [username, setUsername] = useState('admin')
//   const [password, setPassword] = useState('admin123')
//   const [error, setError] = useState('')
//   const submit = async (e)=>{
//     e.preventDefault()
//     try{
//       const { data } = await api.post('/auth/login', { username, password })
//       localStorage.setItem('token', data.token)
//       location.href = '/'
//     }catch(err){
//       setError('Sai tài khoản hoặc mật khẩu')
//     }
//   }
//   return (
//     <div style={{ display:'grid', placeItems:'center', height:'100vh', fontFamily:'sans-serif' }}>
//       <form onSubmit={submit} style={{ width:320, display:'grid', gap:8 }}>
//         <h3>Đăng nhập</h3>
//         <input placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
//         <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
//         {error && <div style={{ color:'red' }}>{error}</div>}
//         <button>Đăng nhập</button>
//       </form>
//     </div>
//   )
// }

import React, { useState } from 'react'

export default function Login(){
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()

    // Fake API call: delay 0.5s
    await new Promise(resolve => setTimeout(resolve, 500))

    // Kiểm tra username/password cứng
    if(username === 'admin' && password === 'admin123'){
      localStorage.setItem('token', 'fake-token-123') // fake token
      alert('Login thành công!')
      location.href = '/'  // chuyển hướng
    } else {
      setError('Sai tài khoản hoặc mật khẩu')
    }
  }

  return (
    <div style={{ display:'grid', placeItems:'center', height:'100vh', fontFamily:'sans-serif' }}>
      <form onSubmit={submit} style={{ width:320, display:'grid', gap:8 }}>
        <h3>Đăng nhập</h3>
        <input
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div style={{ color:'red' }}>{error}</div>}
        <button>Đăng nhập</button>
      </form>
    </div>
  )
}
