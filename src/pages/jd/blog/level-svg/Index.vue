<template>
	<div>
		<div>count: {{ count }}</div>
		<div>frame: {{ frame }}</div>
		<svg id="svg" width="1000" height="1000">
			<polygon
				id="polygon"
				points="50, 160 55, 180 70, 180 60, 190 65, 205 50, 195 35, 205 40, 190 30, 180 45, 180"
				fill="blue"
			/>
		</svg>
		<svg id="svg2" width="1500" height="1000" style="position:absolute;left:0;top:0;">
			<!-- <image :href="yanjiangImg" x="50" y="50" width="300" height="300" /> -->
			<defs>
				<pattern id="image" x="0" y="0" width="100%" height="100%">
					<image :href="bg" width="100" height="100" />
				</pattern>
			</defs>
			<polygon
				id="polygon2"
				points="0 0, 100 0, 100 100, 0 100"
				fill="url(#image)"
			/>
		</svg>
		<svg width="400" height="400">
			<defs>
				<pattern id="image" x="0" y="0" width="100%" height="100%">
					<image :href="yanjiangImg" width="100" height="100" />
				</pattern>
			</defs>
			<polygon points="50,0 100,100 0,100" fill="url(#image)"></polygon>
		</svg>
		<svg width="400" height="400">
			<polygon points="50,0 100,100 0,100" fill="linear-gradient(to right, transparent 50%, rgba(255, 0, 0, 0.5) 50%) 10px 0"></polygon>
		</svg>
	</div>
</template>
<script lang="ts" setup>
import {ref, onMounted} from 'vue'
import anime from 'animejs/lib/anime.es.js'
import * as SAT from 'sat'
import yanjiangImg from '@/assets/1.gif'

import bg1 from '@/assets/岩浆/1.png'
import bg2 from '@/assets/岩浆/2.png'
import bg3 from '@/assets/岩浆/3.png'
import bg4 from '@/assets/岩浆/4.png'
import bg5 from '@/assets/岩浆/5.png'
import bg6 from '@/assets/岩浆/6.png'
import bg7 from '@/assets/岩浆/7.png'
import bg8 from '@/assets/岩浆/8.png'
import bg9 from '@/assets/岩浆/9.png'
import bg10 from '@/assets/岩浆/10.png'
import bg11 from '@/assets/岩浆/11.png'
import bg12 from '@/assets/岩浆/12.png'

const bgs = ['', bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11, bg12]
const bg = ref(bg1)
let bgCount = 1
setInterval(() => {
	bg.value = bgs[bgCount]
	bgCount += 1
	if (bgCount > 12) {
		bgCount = 1
	}
}, 100)

/*
以下是一些可能的调整方法：

1. 调整多边形的位置和大小：尝试调整<polygon>元素的points属性，以确保多边形的边界与图像的边界完全匹配。你可以尝试微调多边形的顶点坐标，使其与图像的边界对齐。

2. 调整图像的大小：尝试调整<image>元素的width和height属性，以确保图像的大小与多边形的大小相匹配。你可以尝试增大或减小图像的尺寸，使其完全覆盖多边形。

3. 调整图案的大小和位置：尝试调整<pattern>元素的x、y、width和height属性，以确保图案的大小和位置与多边形完全匹配。你可以尝试微调图案的位置和尺寸，使其与多边形的边界对齐。

通过尝试以上调整方法，你可以调整多边形和图像的位置、大小和对齐方式，以确保图像完全覆盖多边形，消除空隙的出现。

希望这些调整方法对你有帮助！如果你有任何其他问题，请随时提问。

 */

/*

以下是<animate>元素的基本用法：

1. 将<animate>元素添加到SVG元素内部，作为要动画的属性的子元素。
2. 使用attributeName属性指定要动画的属性名称，如fill, stroke, opacity等。
3. 使用from属性指定动画的起始值。
4. 使用to属性指定动画的结束值。
5. 使用dur属性指定动画的持续时间，单位可以是秒（s）或毫秒（ms）。
6. 使用repeatCount属性指定动画的重复次数，可以是具体的次数或indefinite表示无限次重复。
7. 使用begin属性指定动画的开始时间，可以是具体的时间值或click、mouseover等事件触发。

以下是一个示例代码，展示了如何使用<animate>元素创建一个简单的形状变换动画：
<svg width="400" height="400">
<rect x="50" y="50" width="100" height="100" fill="blue">
<animate attributeName="width" from="100" to="200" dur="1s" repeatCount="indefinite" />
</rect>
</svg>

在上述代码中，我们创建了一个矩形，并将其填充颜色设置为蓝色。然后，我们在矩形内部添加了一个<animate>元素，用于将矩形的宽度从100变化到200，持续时间为1秒，并无限次重复动画。

通过类似的方式，你可以使用<animate>元素来创建其他类型的动画效果，如颜色变化、位置移动等。

*/

const mousePosition = {
	x: 99999,
	y: 99999
}

document.body.addEventListener('mousemove', event => {
	mousePosition.x = event.clientX
	mousePosition.y = event.clientY
})

const count = ref(0)
const frame = ref(0)
// const move = (event => {
// 	console.log('move')
// }

const p = [
	{x: 0, y: 0},
	{x: 100, y: 0},
	{x: 100, y: 100},
	{x: 0, y: 100}
]

let animation = null as any
let isAnimationFinished: boolean = false
const fps = 60
const duration = 100000 // 10000 // 2000 这么快也是也可以的
const speed = (2000 / ((duration / 1000) * fps)) // 5px/ms 差不多了
console.log('speed:', speed)

const polygon = new SAT.Polygon(new SAT.Vector(0, 0), [
	new SAT.Vector(0, 0), // 左上角 // todo: p.map(...)
	new SAT.Vector(100, 0), // 右上角
	new SAT.Vector(100, 100), // 右下角
	new SAT.Vector(0, 100) // 左下角
])
const checkCollision = (keyframePoints: any[]) => {
	if (isAnimationFinished) {
		return
	}

	// const center = {x: keyframePoints[0].x + 50, y: keyframePoints[0].y + 50}
	// const {x} = center
	// const {y} = center
	// const w = 100
	// const h = 100
	// const vectors = [
	// 	new SAT.Vector((x - w) / 2, (y - h) / 2), // 左上角
	// 	new SAT.Vector((x + w) / 2, (y - h) / 2), // 右上角
	// 	new SAT.Vector((x + w) / 2, (y + h) / 2), // 右下角
	// 	new SAT.Vector((x - w) / 2, (y + h) / 2) // 左下角
	// ]

	polygon.translate(speed, 0)

	const time = new Date().getTime()

	// 获取鼠标的坐标
	const mouseX = mousePosition.x
	const mouseY = mousePosition.y

	// 创建多边形对象
	// const pos = new SAT.Vector(center.x, center.y)

	// 创建圆形对象，代表鼠标
	const circle = new SAT.Circle(new SAT.Vector(mouseX, mouseY), 4)
	// const mouse = new SAT.Vector(mouseX, mouseY)

	// 检测碰撞
	const response = new SAT.Response()
	const isColliding = SAT.testPolygonCircle(polygon, circle, response)
	// const response2 = new SAT.Response()
	// const isColliding2 = SAT.testCirclePolygon(circle, polygon, response2)

	count.value += 1

	// console.log('t:', new Date().getTime() - time, isColliding, polygon, circle)
	// console.log([x, y], [mouseX, mouseY])
	// 处理碰撞结果
	if (isColliding) {
		// console.log('发生碰撞')
		// console.log()
		// console.log('碰撞响应：', response)
		anime.set('#polygon2', {
			fill: 'red'
		})
		animation.pause()
		// alert('您遭受了一点伤害')
		// console.log(keyframePoints)
	} else {
		// console.log('未发生碰撞')
		// anime.set('#polygon2', {
		// 	fill: 'blue'
		// })
	}
}

onMounted(() => {
	const translateX = 2000
	animation = anime({
		targets: '#polygon2',
		position: 'relative',
		translateX: `${translateX}px`,
		duration,
		// translateX: [
		// 	{value: '500px', duration: 1000},
		// 	{value: '500px', duration: 1000},
		// 	{value: '500px', duration: 1000},
		// 	{value: '500px', duration: 1000}
		// ],
		easing: 'linear', // 'easeInOutQuad', // 必须线性移动，anim.progress才能用得上
		autoplay: false,
		// direction: 'alternate',
		// loop: true,
		update(anim: any) {
			// console.log(typeof anim.progress)
			// 获取每一帧的关键坐标点
			// console.log(anim.progress)
			const keyframePoints = p.map(point => ({
				x: point.x + (translateX * (anim.progress / 100)),
				y: point.y + (0 * (anim.progress / 100))
			}))
			frame.value += 1

			// 处理每一帧的关键坐标点
			// console.log('关键坐标点：', keyframePoints)
			// if (frame.value % 15 !== 0) {
			// 	return
			// }

			// setTimeout(() => {
			checkCollision(keyframePoints)
			// }, 0)
		},
		complete() {
			isAnimationFinished = true
		}
	})
	// const animation2 = anime({
	// 	targets: '#polygon2',
	// 	// 对于SVG的<polygon>元素，设置background属性是无效的，因为background属性是用于HTML元素的样式设置。
	// 	// 要改进上述实现，你可以使用SVG的fill属性来设置<polygon>元素的背景颜色
	// 	fill: [
	// 		{value: 'linear-gradient(to right, transparent 50%, rgba(255, 0, 0, 0.5) 50%)'},
	// 		{value: 'linear-gradient(to right, transparent 50%, rgba(255, 0, 0, 0.5) 50%) 10px 0'}
	// 	],
	// 	easing: 'linear',
	// 	duration: 1000,
	// 	loop: true
	// })

	animation.play()
	// animation2.play()
})

</script>
<style lang="less" scoped>
.wall {
  display: inline-block;
  height: 100px;
  width: 50px;
  background-color: #fff;
}
</style>
