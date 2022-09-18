/**
 * 核心：中心圆元素
 * 功能：能够读取鼠标移动坐标，并进行位移
 * 状态：隐藏状态、关闭状态、监视状态
 */

const boxDom = document.querySelector('.box')

document.onmousemove = function (event) {
	const evt = event || window.event
	boxDom.style.left = evt.clientX - boxDom.offsetWidth / 2 + 'px'
	boxDom.style.top = evt.clientY - boxDom.offsetHeight / 2 + 'px'
}

// https://developer.mozilla.org/zh-CN/docs/web/css/cursor
