import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  async function handleLogin() {
    if (username !== '' && password !== '')  {
      try {
        const res = await axios.post('/api/login', { username, password })
        if (res.status == 200) {
          router.push('/admin')
        } else {
          //show error
        }
      } catch(err) {
        alert('Um erro ocorreu')
      }
    } else {
      alert('Preencha as infos')
    }
    
  }

  return (
    <div>
      <h1>Login</h1>
      <label htmlFor="username">Admin</label>
      <input onChange={e => setUsername(e.target.value)} type="text" name="username" />
      <label htmlFor="password">Password</label>
      <input onChange={e => setPassword(e.target.value)} type="text" name="password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = req.cookies

  if (token) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}