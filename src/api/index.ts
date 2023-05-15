import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL
const token = process.env.REACT_APP_TOKEN

const baseInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`
  }
})

baseInstance.interceptors.response.use(
  ({ data }) => data,
  error => {
    if (error.response) {
      // 서버로부터 에러 response를 받은 경우
      console.log('if')
    } else {
      // 요청 실패 혹은 응답을 받지 못한 경우 (네트워크 오류 등)
      console.log('else')
    }
    console.error(error)
    return Promise.reject(error)
  }
)

export default baseInstance
