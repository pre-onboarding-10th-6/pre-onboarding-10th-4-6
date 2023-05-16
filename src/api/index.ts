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
      // 공통된 에러 로직 처리 수행
    } else {
      // 요청 실패 혹은 응답을 받지 못한 경우 (네트워크 오류 등)
      // 500 에러 처리 페이지로 redirect
    }
    // API 호출부(api/searct.ts, api/todo.ts)로 throw
    return Promise.reject(error)
  }
)

export default baseInstance
