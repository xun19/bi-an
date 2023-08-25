import {createApp} from 'vue'
// Import '@/style.css'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import dialoguePlugin from '@/components/dialogue/plugin'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from '@/router'
import {createPinia} from 'pinia'
import Terminal from 'vue-web-terminal'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css' // 暗黑模式

const pinia = createPinia()

const app = createApp(App).use(ElementPlus, {
	locale: zhCn
})
	.use(dialoguePlugin)
	.use(router)
	.use(pinia)
	.use(Terminal)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

export default app
