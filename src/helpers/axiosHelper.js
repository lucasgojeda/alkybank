import axios from 'axios'

/** Helpers */
import { getEnvironmets } from './getEnvironmets';

const { VITE_REACT_APP_API_URL } = getEnvironmets();

// I N S T A N C E S
export const axiosClientToken = axios.create({
	baseURL: VITE_REACT_APP_API_URL,
})

export const axiosClient = axios.create({
	baseURL: VITE_REACT_APP_API_URL,
})

//I N T E R C E P T O R S

//Response
axiosClient.interceptors.response.use(
	(response) => {
		response.data.accessToken && localStorage.setItem('token', response.data.accessToken)
		return response
	},
	(error) => {
		console.log(error)
		return Promise.reject(error)
	}
)

axiosClientToken.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		console.log(error)
		return Promise.reject(error)
	}
)

//Request

axiosClientToken.interceptors.request.use(
	(request) => {
		const token = localStorage.getItem('token')
		request.headers['Authorization'] = `Bearer ${token}`
		return request
	},
	(error) => {
		console.log(error)
		return Promise.reject(error)
	}
)
