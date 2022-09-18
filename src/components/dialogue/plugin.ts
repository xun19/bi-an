import Dialogue from './Dialogue.vue'
import * as vue from 'vue'

const plugin = {
	install(app: any, options: any) {
		const Component = app.component('Dialogue', Dialogue) // ???
		// console.log(Component)
		const container = document.createElement('div')
		const Component1 = app.component('Dialogue') // [Vue warn]: Invalid VNode type: – undefined – "(undefined)"
		const vnode = vue.h(Component1)
		vue.render(vnode, container)
		// Console.log(vnode.component?.exposed?.dialogVisible)
		document.body.appendChild(container)
		app.config.globalProperties.$showDialogue = ({
			_title = '',
			_msg = ''
		} = {
			_title: '',
			_msg: ''
		}) => {
			// 可以解构么？【可以，虽然ts会报lint】
			// const { dialogVisible, title, msg} = vnode.component?.exposed
			const dialogVisible = vnode.component?.exposed?.dialogVisible
			const title = vnode.component?.exposed?.title
			const msg = vnode.component?.exposed?.msg
			// Vnode.component?.exposed?.dialogVisible =  （x）不能直接赋值：“赋值表达式的左侧不能是可选属性访问”
			dialogVisible.value = true
			title.value = _title
			msg.value = _msg
		}
		// App.config.globalProperties.$showDialogue = () => {
		// console.log(typeof vue.createVNode, typeof vue.render)
		// const vnode = h('div', {}, 'a')
		// console.log(vnode.props, app.render)
		// console.log(typeof Component.render)
		// Component.render
		// console.log(Component)
		// Component.data.dialogVisible = true
		// const container = document.createElement("div");
		// const vnode = vue.h('div', { class: 'test' }, ['123'])
		// const Component = app.component('Dialogue') // [Vue warn]: Invalid VNode type: – undefined – "(undefined)"
		// const vnode = vue.h(Component)
		// vue.render(Component, container)
		// vue.render(vnode, container)
		// document.body.appendChild(container)
		// }
		// app.config.globalProperties.$isshow = true
	}
}

export default plugin
