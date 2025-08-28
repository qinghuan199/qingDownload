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
				target: 'http://cloud368.com/',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/alumni\/api/, ''),
			}
		}
	}
})