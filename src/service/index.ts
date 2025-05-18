import axios from 'axios'
import nookies from 'nookies'

const url: string = 'http://localhost:8080/v1'

const api = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const cookies = nookies.get()
    const token = cookies.TK

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api