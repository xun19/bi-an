<template>
	<!-- <h3>DOUBLE</h3>
    <div>speed: <span :style="{color}">{{cursorSpeed}}</span> / 100</div>
    <div style="font-size:20px;">HP: <span style="color: red;">{{hp}}</span> / 100</div>
    <div v-if="isProtected">保护期中...</div> -->
	<div style="font-size:20px;position:absolute; top: 300px;">collison: <span style="color: red;">{{hp}}</span> / 100</div>
    <svg id="SvgContainer" width="100" height="100" style="position:absolute">
		<defs>
		<linearGradient id="Gradient1">
			<stop class="stop1" offset="0%" />
			<stop class="stop2" offset="50%" />
			<stop class="stop3" offset="100%" />
		</linearGradient>
		<linearGradient id="Gradient2" x1="1" x2="0" y1="0" y2="0">
			<stop offset="0%" stop-color="red" />
			<stop offset="50%" stop-color="black" stop-opacity="0" />
			<stop offset="100%" stop-color="blue" />
		</linearGradient>
		</defs>
	</svg>
	<svg id="SvgContainer2" width="100" height="100" style="position:absolute">
		<defs>
		<linearGradient id="Gradient1">
			<stop class="stop1" offset="0%" />
			<stop class="stop2" offset="50%" />
			<stop class="stop3" offset="100%" />
		</linearGradient>
		<linearGradient id="Gradient2" x1="1" x2="0" y1="0" y2="0">
			<stop offset="0%" stop-color="red" />
			<stop offset="50%" stop-color="black" stop-opacity="0" />
			<stop offset="100%" stop-color="blue" />
		</linearGradient>
		</defs>
	</svg>
</template>
<script lang="ts" setup>
import {ref, computed, onMounted} from 'vue'
import Cursor from '@/entity/Cursor'
import {Diabstracter} from '@/entity/Diabstracter'
import {ExtendedPolygon} from '@/entity/Polygon'

const hp = ref(100)
const isProtected = ref(true)
setTimeout(() => {
	isProtected.value = false
}, 3000)

const cursorSpeed = ref(0)
const color = computed(() => cursorSpeed.value > 100 ? 'red' : 'blue')

const cursor: any = new Cursor()
cursor.subscribeComputingMouseSpeed((speed: number) => {
	cursorSpeed.value = Math.ceil(speed)
})
cursor.subscribeCollisonEvent(() => {
	// if (!isProtected.value) {
	hp.value -= 1
	// 	isProtected.value = true
	// 	setTimeout(() => {
	// 		isProtected.value = false
	// 	}, 3000)
	// }

	if (hp.value <= 0) {

		// alert('you lose!')
	}
})

onMounted(() => {
	const polygon = new ExtendedPolygon({
		points: [[0, 0], [100, 0], [100, 100], [0, 100]],
		svgPoints: [[0, 0], [100, 0], [100, 100], [0, 100]],
		center: [100, 50],
		absCenter: [100, 50],
		satCenter: [50, 50],
		position: [0, 0],
		svgContainer: 'SvgContainer'
	})
	const polygon2 = new ExtendedPolygon({
		points: [[100, 0], [200, 0], [200, 100], [100, 100]],
		svgPoints: [[0, 0], [100, 0], [100, 100], [0, 100]],
		center: [0, 50],
		absCenter: [100, 50],
		satCenter: [150, 50],
		position: [100, 0],
		svgContainer: 'SvgContainer2'
	})

	diabstracter._addPolygon(polygon)
	diabstracter._addPolygon(polygon2)
	diabstracter.startState()
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

	viewRange: 1000,

	center: [50, 50],
	occupancyArea: {
		width: 100,
		height: 100,
	}
})

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
