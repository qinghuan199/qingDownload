import {
	defineConfig
} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
	plugins: [
		uni()
	],
	server: {
		proxy: {
			'/resApi': {
				target: 'http://38.180.188.66/',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/alumni\/api/, ''),
			}
		}
	}
})