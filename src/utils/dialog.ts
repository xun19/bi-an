import app from '../utils/app'

export default ({
	title = '',
	msg = ''
} = {
	title: '',
	msg: ''
}) => {
	app.config.globalProperties.$showDialogue({_title: title, _msg: msg})
}

// Export default app.config.globalProperties.$showDuihua 别的地方引入时会报错：Cannot access uninitialized variable
