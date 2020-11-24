import axios from 'axios'
const { apiUrl } = require('../config')

const http = axios.create({
	baseURL: apiUrl,
	timeout: 15000,
	withCredentials: true,
})

export default http
