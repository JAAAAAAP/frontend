import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:80/api',
    withCredentials: true,
    withXSRFToken:true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    }
})



export default api