import axios from "axios";


const apiHemo = axios.create({
    baseURL: 'http://localhost:3333'
    // baseURL: 'http://api-doe.kinghost.net:21091'

    
})

// apiHemo.interceptors.request.use(async config => {
//     const userData = await localStorage.getItem('hemocentro:userData')
//     const token  = userData && JSON.parse(userData).data.token
//     config.headers.authorization = `Bearer ${token}`
//     return config
// })


export default apiHemo