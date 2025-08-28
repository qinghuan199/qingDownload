import App from './App'
import messages from './locale/index'

let i18nConfig = {
  locale:  "pe",
  // locale: uni.getLocale(),
  messages
}


// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import minCache from "/utils/storage.js"
import {
	createI18n
} from 'vue-i18n'

const i18n = createI18n(i18nConfig)




export function createApp() {
	const app = createSSRApp(App)
	app.use(i18n);
	app.use(minCache);
	// app.use(Pinia.createPinia());
	return {
		app,
		minCache,

	}
}

// #endif