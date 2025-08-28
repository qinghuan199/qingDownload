const config = {
	// baseURL: import.meta.env.VITE_BASE_URL,
	baseURL: "https://admin2.cloud-idn.com/resApi",
	// baseURL: "/resApi",
	timeout: 10000,
	header: {
		'Content-Type': 'application/json'
	}
}

// 请求拦截器
const requestInterceptor = (options) => {
	const token = uni.getStorageSync('token')


	options.url = `${config.baseURL}${options.url}`
	options.timeout = options.timeout || config.timeout
	options.header = {
		...config.header,
		...options.header
	}

	if (token) {
		options.header.Authorization = `Bearer ${token}`
	}

	return options
}

// 响应拦截器
const responseInterceptor = (response) => {
	const {
		data,
		statusCode
	} = response

	// 请求成功
	if (statusCode === 200) {
		if (data.code === 0 || data.code === 200) {
			return Promise.resolve(data)
		} else {
			uni.showToast({
				title: data.message || '请求失败',
				icon: 'none'
			})
			return Promise.reject(data)
		}
	}

	// 请求失败
	uni.showToast({
		title: '网络错误',
		icon: 'none'
	})
	return Promise.reject(response)
}

// 请求函数
const request = (options = {}) => {
	options = requestInterceptor(options)
	return new Promise((resolve, reject) => {
		uni.request({
			...options,
			success: (res) => {
				responseInterceptor(res)
					.then(res => resolve(res))
					.catch(err => reject(err))
			},
			fail: (err) => {
				uni.showToast({
					title: 'Error',
					icon: 'none'
				})
				reject(err)
			}
		})
	})
}

// 封装常用请求方法
const http = {
	get(url, data = {}, options = {}) {
		return request({
			url,
			data,
			method: 'GET',
			...options
		})
	},

	post(url, data = {}, options = {}) {
		return request({
			url,
			data,
			method: 'POST',
			...options
		})
	},

	put(url, data = {}, options = {}) {
		return request({
			url,
			data,
			method: 'PUT',
			...options
		})
	},

	delete(url, data = {}, options = {}) {
		return request({
			url,
			data,
			method: 'DELETE',
			...options
		})
	}
}

export default http