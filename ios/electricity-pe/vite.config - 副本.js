import {
	defineConfig,
	loadEnv
} from "vite";
import createVitePlugins from "@vitejs/plugin-vue";
export default defineConfig(({
	mode,
	command
}) => {
	const env = loadEnv(mode, process.cwd());
	const {
		VITE_APP_ENV
	} = env;
	const getTarget = () => {
		if (env.VITE_USE_TEST_API === "true") {
			return `http://${env.VITE_API_URL}`;
		}
		return `https://${env.VITE_API_URL}`;
	};
	return {
		// 部署生产环境和开发环境下的URL。
		// 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
		// 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
		base: VITE_APP_ENV === "production" ? "/" : "/",
		plugins: createVitePlugins(env, command === "build"),

		// vite 相关配置
		server: {
			port: 8088,
			host: true,
			open: true,
			proxy: {
				// https://cn.vitejs.dev/config/#server-proxy
				[env.VITE_APP_BASE_API]: {
					target: getTarget(),
					// target: "http://38.000.8.66/",
					// target: "http://192.168.10.62:8080/",
					changeOrigin: true,
					logLevel: "debug",

					// rewrite: (p) => p.replace(/^\/resApi/, ""),
				},
			},
		},

	};
});