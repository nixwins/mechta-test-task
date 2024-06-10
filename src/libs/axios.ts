import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL
})

instance.interceptors.request.use((req) => {
  console.log('REQUEST')
  console.dir(req)
  return req
})

export default instance
