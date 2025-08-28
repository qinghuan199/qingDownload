import {
	defineConfig
} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

export default defineConfig({
	plugins: [
		uni(),
		vueI18n({
			include: path.resolve(__dirname, './path-to-your-locales/**')
		})
	],
	define: {
		__VUE_I18N_FULL_INSTALL__: true,
		__VUE_I18N_LEGACY_API__: false, // 如果你不使用 legacy 模式
		__INTLIFY_PROD_DEVTOOLS__: false
	},
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