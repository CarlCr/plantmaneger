import  axios from 'axios'

const api = axios.create({
    baseURL: 'http://172.16.36.81:3333'
})

export default api