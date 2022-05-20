import './../styles/global.scss'
import 'react-toastify/dist/ReactToastify.css'

import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { Layout } from '../components/Layout'
import { store } from './../redux/store'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </Provider>
  )
}

export default MyApp
