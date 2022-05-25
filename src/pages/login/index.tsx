import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { showSimpleErrorAlert } from '../../helpers/showAlert'
import styles from './styles.module.scss'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showErrors, setShowErrors] = useState(false)
  const [msgError, setMsgError] = useState('')
  const [onRequest, setOnRequest] = useState(false)

  const router = useRouter()

  async function handleLogin() {
    if (username !== '' && password !== '')  {
      setOnRequest(true)
      try {
        const res = await axios.post('/api/login', { username, password })
        if (res.status == 200) {
          setShowErrors(false)
          setMsgError('')
          setOnRequest(false)
          router.push('/admin')
        } else {
          setOnRequest(false)
          showSimpleErrorAlert('Error!', 'E-mail or password is wrong')
        }
      } catch(err) {
        setOnRequest(false)
        showSimpleErrorAlert('Error!', `Something went wrong: ${err.message}`)
      }
    } else {
      setMsgError('All informations are required')
      setShowErrors(true)
    }
  }


  return (
    <div className={styles.container}>
      <h1>Admin Login</h1>
      <div className={styles.inputField}>
        <label htmlFor="username">Username</label>
        <input 
          onChange={e => {
            if (showErrors && msgError !== '') {
              setShowErrors(false)
              setMsgError('')
            }
            setUsername(e.target.value)
          }} 
          type="text" name="username" />
      </div>
      <div className={styles.inputField}>
        <label htmlFor="password">Password</label>
        <input 
          onChange={e => {
            if (showErrors && msgError !== '') {
              setShowErrors(false)
              setMsgError('')
            }
            setPassword(e.target.value)
          }} 
          type="password" name="password" />
      </div>
      {showErrors && 
        <div className={styles.errors}>
          <span>{msgError}</span>
        </div>
      }
      <button disabled={onRequest} onClick={handleLogin}>Login</button>
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