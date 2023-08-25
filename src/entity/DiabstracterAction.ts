
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/naming-convention */

import Cursor from './Cursor'
import anime from 'animejs/lib/anime.es.js'
import * as SAT from 'sat'
import {isFunction} from 'lodash-es'

import type {
	DiabstracterInterface,
	PartsSATPolygon
} from './Diabstracter'

// 能力/行动，单独分离出来

type SkillParams = {
	subject: DiabstracterInterface;
	payload?: any;
	hooks: Record<string, (result?: any) => void>;
}

function action_discoverPlayer(params: SkillParams) { // 发现玩家。能力：可获取到玩家（鼠标）的位置
	const {
		hooks
	} = params

	const {update} = hooks

	const cursor = new Cursor() // cursor可以用单例模式

	cursor.subscribeMouseEvent(position => {
		if (isFunction(update)) {
			update(position)
		}
	})
}

function action_checkCollision(params: SkillParams) {
	const {
		payload,
		hooks
	} = params

	const {polygon, targetPosition} = payload
	const {success, fail} = hooks

	// 目标坐标
	const targetX = targetPosition[0]
	const targetY = targetPosition[1]

	console.log(targetPosition)

	// 创建圆形对象，代表被碰撞点
	const circle = new SAT.Circle(new SAT.Vector(targetX, targetY), 4)

	// 检测碰撞
	const response = new SAT.Response()
	const isColliding = SAT.testPolygonCircle(polygon, circle, response)

	// 处理碰撞结果
	if (isColliding) {
		console.log('成功碰撞')
		// eslint-disable-next-line no-alert
		alert('1111')
		if (isFunction(success)) {
			success([targetX, targetY]) // 返回碰撞点
		}
	} else {
		const aaa = 1
		console.log('未碰撞...')
		if (isFunction(fail)) {
			fail()
		}
	}
}

function action_move(params: SkillParams) { // 移动。能力：向着指定坐标移动
	const {
		subject,
		payload,
		hooks
	} = params

	const {
		partsSATPolygons: polygons,
		svgEleIds,
		speed,
		response
	} = subject

	const {
		isCheckCollision,
		targetPosition,
		translate
	} = payload

	if (isFunction(hooks.start)) {
		hooks.start()
	}

	const translateX = translate.x as number
	const translateY = translate.y as number
	let movedDisance = 0

	let isAnimationFinished = false

	// const translateX = 2000
	const fps = 60
	// const duration = 100000 // 10000 // 2000 这么快也是也可以的
	// const speed = (2000 / ((duration / 1000) * fps)) // 5px/ms 差不多了
	const duration = ((Math.abs(translateX) / (speed * fps)) * 1000) * response // 速度的每单位是帧，而不是秒、毫秒
	let frame = 0

	// console.log('translate:', translate, 'duration:', duration)

	// const polygon = new SAT.Polygon(new SAT.Vector(0, 0), [
	// 	new SAT.Vector(0, 0), // 左上角 // todo: p.map(...)
	// 	new SAT.Vector(100, 0), // 右上角
	// 	new SAT.Vector(100, 100), // 右下角
	// 	new SAT.Vector(0, 100) // 左下角
	// ])

	const handleMoveEnd = (translate: [number, number], targetElement: any) => {
		const [translateX, translateY] = translate
		const [centerX, centerY] = subject.center
		const [currentLeft, currentTop] = subject.currentPosition

		// 已知向量的移动距离和角度（弧度）
		const distance = Math.sqrt((translateX ** 2) + (translateY ** 2))
		const totalAngle = subject.currentRotateAngle // 已累计旋转角度
		const angle = Math.PI * (totalAngle / 180) // 弧度表示

		// 向量在 x 轴上的分量
		const xComponent = distance * Math.cos(angle)

		// 向量在 y 轴上的分量
		const yComponent = distance * Math.sin(angle)

		// console.log('X Component:', xComponent)
		// console.log('Y Component:', yComponent)
		// console.log((xComponent ** 2) + (yComponent ** 2))

		// targetElement.style.transformOrigin = `${centerX + xComponent}px ${centerY + yComponent}px`
		const resultLeft = currentLeft + xComponent
		const resultTop = currentTop + yComponent

		// 重置样式，使得与最后样式状态一致，并且便于进行下一次动画
		targetElement.style.left = resultLeft
		targetElement.style.top = resultTop
		targetElement.style.transform = `rotate(${totalAngle}deg) translateX(0px) translateY(0px)`

		// 记录变更后的位置(left、top)和中心点
		subject.currentPosition = [resultLeft, resultTop]
		subject.center = [centerX + xComponent, centerY + yComponent]
	}

	const movePolygon = (polygon: PartsSATPolygon) => {
		if (isAnimationFinished) { // TO DO：只用一个参数能控制所有多边形的停止么？
			return
		}

		polygon.translate(speed, 0) // (x, y)

		movedDisance += speed
		// subject.center += // 中心位置也要更新

		// 是否在移动过程中检测碰撞
		if (isCheckCollision) {
			action_checkCollision({
				subject,
				payload: {
					targetPosition,
					polygon
				},
				hooks: {
					success() {
						// anime.set('#polygon2', {
						// 	fill: 'red'
						// })
						// animation.pause()
						// alert('您遭受了一点伤害')
					},
					fail() {
						// console.log('未发生碰撞')
						// anime.set('#polygon2', {
						// 	fill: 'blue'
						// })
					}
				}
			})
		}
	}

	const playAnimation = (index: number) => {
		const polygon = polygons[index]
		const svgEleId = svgEleIds[index]
		// eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
		const targetElement = document.querySelector(svgEleId) as HTMLElement

		// console.log(subject.currentRotateAngle)
		const animetion = anime({
			targets: targetElement,
			position: 'absolute',
			// rotate: {
			// 	value: `${subject.currentRotateAngle}deg` // 旋转度数
			// },
			translateX: `${translateX}px`,
			translateY: `${translateY}px`,
			// left: `${resultX}px`,
			// top: `${resultY}px`,
			// begin() {
			// 	if (targetElement) {
			// 		// const [x, y] = subject.center
			// 		// targetElement.style.transformOrigin = `${x}px ${y}px`
			// 		targetElement.style.transform = 'none'
			// 	}
			// },
			duration,
			easing: 'linear', // 'easeInOutQuad', // 必须线性移动，update回调里的progress才能用得上
			autoplay: false,
			// direction: 'alternate',
			// loop: true,
			update(current: any) {
				// const {progress} = current

				frame += 1

				movePolygon(polygon)

				if (isFunction(hooks.update) && index === 0) { // 只在第一个元素的动画里执行回调，防止多次重复回调
					hooks.update(current)
				}
			},
			complete() {
				if (index === 0) {
					handleMoveEnd([translateX, translateY], targetElement)

					isAnimationFinished = true // 只在第一个元素的动画里变更即可

					if (isFunction(hooks.end)) { // 只在第一个元素的动画里执行回调，防止多次重复回调
						hooks.end()
					}
				}
			}
		})
		animetion.play()
	}

	const update = () => {
		polygons.forEach((polygon, index) => {
			playAnimation(index)
		})
	}

	update()
}

function action_rotate(params: SkillParams) { // 转向。能力：向着角度坐标移动
	const {
		subject,
		payload,
		hooks
	} = params

	const {
		partsSATPolygons: polygons,
		svgEleIds,
		rotateSpeed: speed,
		response
	} = subject

	const {
		isCheckCollision,
		targetPosition,
		angle,
		direction
	} = payload

	let rotatedAngle = 0 // 以数字形式来记录

	if (isFunction(hooks.start)) {
		hooks.start()
	}

	let isAnimationFinished = false

	// const translateX = 2000
	const fps = 60
	// const duration = 100000 // 10000 // 2000 这么快也是也可以的
	// const speed = (2000 / ((duration / 1000) * fps)) // 5px/ms 差不多了
	const duration = Math.abs(((angle / (speed * fps)) * 1000) * response) // 速度的每单位是帧，而不是秒、毫秒
	let frame = 0

	// const polygon = new SAT.Polygon(new SAT.Vector(0, 0), [
	// 	new SAT.Vector(0, 0), // 左上角 // todo: p.map(...)
	// 	new SAT.Vector(100, 0), // 右上角
	// 	new SAT.Vector(100, 100), // 右下角
	// 	new SAT.Vector(0, 100) // 左下角
	// ])

	const rotatePolygonAroundPoint = (params: any) => {
		const {polygon, center, rotationAngle} = params

		// 指定旋转中心点的坐标
		const rotationCenter = new SAT.Vector(center[0], center[1])

		// 平移到旋转中心点的位置
		polygon.translate(rotationCenter.x, rotationCenter.y)

		// 进行旋转
		polygon.rotate(rotationAngle)

		// 将多边形平移回原来的位置
		polygon.translate(-rotationCenter.x, -rotationCenter.y)
	}

	const rotatePolygon = (polygon: PartsSATPolygon): any => {
		if (isAnimationFinished) {
			return
		}

		rotatePolygonAroundPoint({
			polygon,
			rotationAngle: Math.PI * (speed / 180), // 以弧度为单位
			center: subject.center
		})

		rotatedAngle += speed

		// 是否在移动过程中检测碰撞
		if (isCheckCollision) {
			action_checkCollision({
				subject,
				payload: {
					targetPosition,
					polygon
				},
				hooks: {
					success() {
						// anime.set('#polygon2', {
						// 	fill: 'red'
						// })
						// animation.pause()
						// alert('您遭受了一点伤害')
					},
					fail() {
						// console.log('未发生碰撞')
						// anime.set('#polygon2', {
						// 	fill: 'blue'
						// })
					}
				}
			})
		}
	}

	const playAnimation = (index: number) => {
		const polygon = polygons[index]
		const svgEleId = svgEleIds[index]
		// eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
		const targetElement = document.querySelector(svgEleId) as HTMLElement
		const resultAngle = subject.currentRotateAngle + Number(angle)

		// console.log(svgEleId, `${Number(angle)}deg`, direction, duration)
		const animetion = anime({
			targets: svgEleId,
			rotate: {
				value: `${resultAngle}deg`, // 旋转度数
				// 'normal'：表示顺时针方向旋转
				// 'reverse'：表示逆时针方向旋转
				// 'alternate'：表示交替地在顺时针和逆时针方向之间旋转
				// 'alternate-reverse'：表示交替地在逆时针和顺时针方向之间旋转
				direction // 时针方向
			},
			begin() {
				if (targetElement) {
					targetElement.style.transformOrigin = 'center center'
				}
			},
			// begin() {
			// 	if (targetElement) {
			// 		// const [x, y] = subject.center
			// 		// targetElement.style.transformOrigin = `${x}px ${y}px`
			// 		targetElement.style.transform = 'none'
			// 	}
			// },
			duration,
			easing: 'linear', // 'easeInOutQuad', // 必须线性移动，update回调里的progress才能用得上
			autoplay: false,
			// loop: true,
			update(current: any) {
				// const {progress} = current

				frame += 1

				rotatePolygon(polygon)

				if (isFunction(hooks.update) && index === 0) { // 只在第一个元素的动画里执行回调，防止多次重复回调
					hooks.update(current)
				}
			},
			complete() {
				if (index === 0) {
					subject.currentRotateAngle = resultAngle
					isAnimationFinished = true // 只在第一个元素的动画里变更即可

					if (isFunction(hooks.end)) { // 只在第一个元素的动画里执行回调，防止多次重复回调
						hooks.end()
					}
				}
			}
		})

		animetion.play()
	}

	const update = () => {
		polygons.forEach((polygon, index) => {
			playAnimation(index)
		})
	}

	update()
}

function action_attackPlayer() { // 攻击玩家。能力：向着玩家方向移动

}

export {
	action_discoverPlayer,
	action_checkCollision,
	action_move,
	action_rotate,
	action_attackPlayer
}
