import {createApp} from 'vue'
// Import '@/style.css'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import dialoguePlugin from '@/components/dialogue/plugin'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from '@/router'
import {createPinia} from 'pinia'

const pinia = createPinia()

export default createApp(App).use(ElementPlus, {
	locale: zhCn
})
	.use(dialoguePlugin)
	.use(router)
	.use(pinia)
