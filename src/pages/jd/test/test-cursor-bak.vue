<template>
    <div>speed: <span :style="{color}">{{cursorSpeed}}</span> / 100</div>
    <!-- <div>progress:{{ progress }}</div>
    <div>diff: {{ progress - prevProgress }}</div>
    <div id="ele"></div> -->
    <!-- <svg width="1000" height="1000">
        <polygon points="0 0 100 0 100 100 0 100" id="polygon" fill="red" @mousemove="aaa">
            <animateTransform attributeName="transform" attributeType="XML"
            type="rotate" from="0" to="360" dur="3s" repeatCount="indefinite"/>
            <animateTransform attributeName="transform" attributeType="XML"
            type="translate" from="0 0" to="50 50" dur="1.5s" repeatCount="indefinite" begin="0s"/>
        </polygon>
    </svg> -->
    <!-- <svg width="200" height="200">
  <rect x="0" y="0" width="100" height="100" fill="red" id="polygon">
    <animateTransform attributeName="transform" attributeType="XML"
      type="rotate" from="0" to="360" dur="3s" repeatCount="indefinite"/>
    <animateTransform attributeName="transform" attributeType="XML"
      type="translate" from="0 0" to="50 50" dur="1.5s" repeatCount="indefinite" begin="0s"/>
  </rect>
</svg>  -->
</template>
<script lang="ts" setup>
import {ref, computed, onMounted} from 'vue'
import Cursor from '@/entity/Cursor'
import {Diabstracter} from '@/entity/Diabstracter'
// import anime from 'animejs'
const cursorSpeed = ref(0)
const color = computed(() => cursorSpeed.value > 100 ? 'red' : 'blue')

const cursor: any = new Cursor()
cursor._bindMouseMoveEvent()
cursor._computeMouseMoveSpeed()
cursor.subscribeComputingMouseSpeed((speed: number) => {
	cursorSpeed.value = Math.ceil(speed)
})

const diabstracter = new Diabstracter({
	HP: 0,
	HP_TOTAL: 0,
	ATK: 0,
	ATK_TOTAL: 0,
	DEF: 0,
	DEF_TOTAL: 0,

	coreCount: 0,
	coreTotal: 0,

	speed: 2, // 6,
	rotateSpeed: 1, // 4,
	response: 1,

	center: [50, 50],
	occupancyArea: {
		width: 100,
		height: 100,
	}
})

diabstracter._addPartsPolygon([0, 0, 0, 100, 100, 100, 100, 0])
diabstracter.startState()

// const progress = ref(0)
// const prevProgress = ref(0)

// anime({
// 	targets: '#ele',
// 	translateX: '200px',
// 	duration: 10000,
// 	easing(t: any) {
// 		console.log(t, t * t)
// 		return xat * t
// 	},
// 	update(anim) {
// 		if (anim.progress > 0) {
// 			prevProgress.value = progress.value
// 			progress.value = anim.progress // 假设元素每帧移动 200px
// 			// console.log('Distance moved:', distance)
// 		}
// 	}
// })

// const aaa = () => {
// 	console.log('多边形移动到鼠标上了！mousemove')
// }

// const update = () => {
// 	const [mouseX, mouseY] = mouseArr

// 	// 获取需要移动的 SVG 多边形元素
// 	const polygon = document.getElementById('polygon')
// 	// 创建一个 SVG 点对象
// 	const point = polygon.ownerSVGElement.createSVGPoint()
// 	point.x = mouseX
// 	point.y = mouseY

// 	// 判断鼠标是否在多边形上
// 	const isPointInPolygon = polygon.isPointInFill(point)

// 	console.log(isPointInPolygon, point)
// 	// 如果鼠标在多边形上
// 	if (isPointInPolygon) {
// 		// 元素移动到鼠标上时的操作
// 		console.log('多边形移动到鼠标上了！')
// 	}
// }

// const mouseArr = [0, 0]
// onMounted(() => {
// 	// 监听鼠标移动事件
// 	document.addEventListener('mousemove', event => {
// 	// 获取鼠标的坐标
// 		const mouseX = event.clientX
// 		const mouseY = event.clientY

// 		mouseArr[0] = mouseX
// 		mouseArr[1] = mouseY
// 	})

// 	setInterval(() => {
// 		update()
// 	}, 200)

// anime({
// 	targets: '#polygon',
// 	position: 'absolute',
// 	rotate: {
// 		value: `${45}deg` // 旋转度数
// 	},
// 	translateX: `${100}px`,
// 	translateY: `${0}px`,
// 	duration: 2000,
// 	easing: 'linear', // 'easeInOutQuad', // 必须线性移动，update回调里的progress才能用得上
// 	loop: true,
// 	autoplay: false,
// 	update() {
// 		const [mouseX, mouseY] = mouseArr

// 		// 获取需要移动的 SVG 多边形元素
// 		const polygon = document.getElementById('polygon')
// 		// 创建一个 SVG 点对象
// 		const point = polygon.ownerSVGElement.createSVGPoint()
// 		point.x = mouseX
// 		point.y = mouseY

// 		// 判断鼠标是否在多边形上
// 		const isPointInPolygon = polygon.isPointInFill(point)

// 		// 如果鼠标在多边形上
// 		if (isPointInPolygon) {
// 			// 元素移动到鼠标上时的操作
// 			console.log('多边形移动到鼠标上了！')
// 		}
// 	}
// })
// })
</script>

<style>
</style>
