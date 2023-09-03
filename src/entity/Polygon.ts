/* eslint-disable no-mixed-operators */

/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/naming-convention */
import * as SAT from 'sat'
import Cursor from './Cursor'
import type {EntitiesMsgInterface} from './Msg'
import {MsgDispatcher, EntitiesMsg, EntitiesMsgTypeEnum} from './Msg'
import type {Entity} from './Entity'
import {EntityManager, EntityTypeEnum} from './Entity'

type Point = [number, number]

type InitPolygonParams = {
	points: Point[];
	absCenter: Point;
	position: Point;
	svgContainer?: string;
}

type ActionCallbacks = {
	start?: () => void;
	update?: () => void;
	end?: () => void;
}

type ExtendedPolygonInterface = {
	id: string;
	eleId: string;
	msgDispatcher: MsgDispatcher;
	EntityManager: EntityManager;
	checkPointCollisionListeners: Array<{receiver: Entity; point: Point}>;
	checkMouseCollisionListeners: Entity[];
	checkedCollisionPoints: Point[];
	svgContainerId: string;
	svgContainer: HTMLElement | null;
	animationQueue: Array<() => void>;
	currentAnimation: any;
	points: Point[];
	cssOrigin: Point;
	absCenter: Point;
	currentPosition: [number, number];
	translateX: number;
	translateY: number;
	rotatedAngle: number;
	polygonInstanceOnSatJs: SAT.Polygon;
	polygonInstanceOnSVG: SVGPolygonElement;
	polygonCssStyle: any;
	_initBaseInfo: (params: InitPolygonParams) => void;
	_setInitalCenterPoint: (point: Point) => void; // 只在初始化时使用
	_setInitalPosition: (point: Point) => void; // // 只在初始化时使用
	_createPolygonInstanceOnSatJs: (points: Point[]) => void;
	_createPolygonInstanceOnSVG: (points: Point[]) => void;
	_translateXOnSatJs: (translateX: number) => void;
	_translateYOnSatJs: (translateX: number) => void;
	_rotateAroundPointOnSatJs: (angleNumer: number, originPoint: Point) => void;
	_rotateAroundCenterOnSatJs: (angleNumer: number) => void;
	_handleMoveXEnd: (translateX: number) => void; // 移动结束后进行参数更新
	_handleMoveYEnd: (translateY: number) => void;
	_translateOnX: (translateX: number) => void;
	_translateOnY: (translateY: number) => void;
	_rotate: (angleNumer: number) => void;
	move2lr: (value: number, callbacks?: ActionCallbacks) => void;
	move2fb: (value: number, callbacks?: ActionCallbacks) => void;
	rotate: (angleNumer: number, callbacks?: ActionCallbacks) => void;
	updateAnimation: () => void;
	checkPointCollision: (point: Point) => boolean;
	checkPointsCollision: () => void;
	checkMouseCollision: () => boolean;
	addCheckPointCollisionListen: (entity: Entity, point: Point) => void;
	addCheckMouseCollisionListen: (entity: Entity) => void;
	publishCheckPointCollision: (point: Point) => void;
	publishCheckMouseCollision: () => void;
	addToSVG: (svgContainerId: string) => void;
} & Entity

class ExtendedPolygon implements ExtendedPolygonInterface {
	id = ''
	eleId = ''
	entityId = 0
	entityType = EntityTypeEnum.Polygon
	EntityManager = new EntityManager()
	msgDispatcher = new MsgDispatcher()
	checkPointCollisionListeners = [] as Array<{receiver: Entity; point: Point}>
	checkMouseCollisionListeners = [] as Entity[]
	checkedCollisionPoints = [] as Point[]
	svgContainerId = ''
	svgContainer = null as any
	animationQueue = [] as Array<() => void>
	currentAnimation = null as any
	points = [] as Point[]
	svgPoints = [] as Point[]
	cssOrigin = [0, 0] as Point
	absCenter = [0, 0] as Point
	currentPosition = [0, 0] as [number, number]
	translateX = 0
	translateY = 0
	rotatedAngle = 0
	polygonInstanceOnSatJs = new SAT.Polygon()
	polygonInstanceOnSVG = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
	polygonCssStyle = {
		'transform-origin': 'center center',
		transform: 'rotate(0deg) translateX(0px) translateY(0px)',
		position: 'absolute',
		left: '0px',
		top: '0px'
	}

	constructor(params: InitPolygonParams) {
		this._initBaseInfo(params)
		this._createPolygonInstanceOnSatJs(params.points)
		this._setInitalPosition(params.position)
		this._setInitalCenterPoint(params.absCenter)
		this._createPolygonInstanceOnSVG(params.points)
	}

	_initBaseInfo(params: InitPolygonParams) {
		const {points, svgContainer} = params
		this.points = points
		this.id = String(Math.ceil(Math.random() * 100000000))
		this.eleId = `ExtendedPolygon-${this.id}`
		this.svgContainerId = svgContainer ?? '' // 在 TypeScript（TS）中，?? 是一个空值合并运算符（Nullish Coalescing Operator）。它用于处理可能为 null 或 undefined 的值，并提供一个默认值
		this.entityId = this.EntityManager.createNewId()
		this.EntityManager.addEntity(this)
	}

	_setInitalPosition(point: Point) {
		this.currentPosition = point
	}

	_setInitalCenterPoint(point: Point) {
		this.absCenter = point
		this.cssOrigin = [
			point[0] - this.currentPosition[0],
			point[1] - this.currentPosition[1]
		]
	}

	_createPolygonInstanceOnSatJs(points: Point[]) {
		this.polygonInstanceOnSatJs = new SAT.Polygon(
			new SAT.Vector(),
			points.map(([x, y]) => new SAT.Vector(x, y))
		)
	}

	_createPolygonInstanceOnSVG(points: Point[]) {
		const svgPoints = points.map(point => ([
			point[0] - this.currentPosition[0],
			point[1] - this.currentPosition[1]
		]))
		const pointsString = svgPoints.flat().join(' ')
		this.polygonInstanceOnSVG.setAttribute('id', this.eleId)
		this.polygonInstanceOnSVG.setAttribute('points', pointsString)
		const s = 'url(#Gradient2)' // this.currentPosition[0] === 100 ? 'url(#Gradient2)' : '#f1f1f1'
		this.polygonInstanceOnSVG.setAttribute('fill', s) // 'url(#Gradient2)')
		// to do: 绑定mousemove事件
		if (this.svgContainerId) {
			this.addToSVG(this.svgContainerId)
		}
	}

	addToSVG(svgContainerId: string) { // 得主动加了
		const svg = document.getElementById(svgContainerId)
		if (svg) {
			svg.appendChild(this.polygonInstanceOnSVG)
			this.svgContainer = svg
			this.polygonCssStyle = this.svgContainer.style
			this.polygonCssStyle.position = 'absolute'
			const [x, y] = this.currentPosition
			this.polygonCssStyle.left = `${x}px`
			this.polygonCssStyle.top = `${y}px`
			const [cssOriginX, cssOriginY] = this.cssOrigin
			this.polygonCssStyle['transform-origin'] = `${cssOriginX}px ${cssOriginY}px`
		}
	}

	_translateXOnSatJs(translateX: number) {
		const translateY = 0

		// 已知向量的移动距离和角度（弧度）
		const distance = Math.sqrt((translateX ** 2) + (translateY ** 2))
		const totalAngle = this.rotatedAngle // 已累计旋转角度
		const angle = Math.PI * (totalAngle / 180) // 弧度表示

		// 向量在 x 轴上的分量
		const xComponent = distance * Math.cos(angle)

		// 向量在 y 轴上的分量
		const yComponent = distance * Math.sin(angle)

		const resultX = (translateX < 0 ? -1 : 1) * xComponent
		const resultY = (translateX < 0 ? -1 : 1) * yComponent

		this.polygonInstanceOnSatJs.translate(resultX, resultY)
	}

	_translateYOnSatJs(translateY: number) {
		const translateX = 0

		// 已知向量的移动距离和角度（弧度）
		const distance = Math.sqrt((translateX ** 2) + (translateY ** 2))
		const totalAngle = this.rotatedAngle // 已累计旋转角度
		const angle = -1 * Math.PI * (totalAngle / 180) // 弧度表示

		// 向量在 x 轴上的分量
		const xComponent = distance * Math.sin(angle)

		// 向量在 y 轴上的分量
		const yComponent = distance * Math.cos(angle)

		const resultX = (translateY < 0 ? -1 : 1) * xComponent
		const resultY = (translateY < 0 ? -1 : 1) * yComponent

		this.polygonInstanceOnSatJs.translate(resultX, resultY)
	}

	_rotateAroundCenterOnSatJs(angleNumer: number) {
		this._rotateAroundPointOnSatJs(angleNumer, this.absCenter)
	}

	_rotateAroundPointOnSatJs(angleNumer: number, originPoint: Point) {
		// 定义多边形
		const polygon = this.polygonInstanceOnSatJs

		// 定义旋转函数
		function rotatePoint(point: SAT.Vector, angle: number, origin: SAT.Vector) {
			const rotatedX = Math.cos(angle) * (point.x - origin.x) - Math.sin(angle) * (point.y - origin.y) + origin.x
			const rotatedY = Math.sin(angle) * (point.x - origin.x) + Math.cos(angle) * (point.y - origin.y) + origin.y
			return new SAT.Vector(rotatedX, rotatedY)
		}

		// 定义旋转的角度和中心点
		const angle = Math.PI * (angleNumer / 180) // 弧度表示 // Math.PI / 4 // 45 度
		const [originX, originY] = originPoint
		const origin = new SAT.Vector(originX, originY)

		// 将多边形的所有顶点相对于某点进行旋转
		const newPoints = polygon.points.map(point => rotatePoint(point, angle, origin))

		// 更新多边形的位置
		polygon.setPoints(newPoints)
	}

	// 调用translate并非下达动作指令，而是得到《基于最初起点》变换后的最后状态/结果。
	// 即并非《基于上一次变换》
	// 要使得变换是基于上一次变换，并且把这些有关联的状态/结果串联起来，才是在视觉上形成动画
	// 因此动作指令需要编写额外方法来表达

	_moveOnSVG(translateX: number, translateY: number) {
		this.polygonCssStyle.transform = `rotate(${this.rotatedAngle}deg) translateX(${translateX}px) translateY(${translateY}px)`
	}

	_rotateOnSVG() {
		this.polygonCssStyle.transform = `rotate(${this.rotatedAngle}deg) translateX(0px) translateY(0px)`
	}

	_handleMoveXEnd(translateX: number) {
		const translateY = 0
		const [centerX, centerY] = this.absCenter
		const [currentLeft, currentTop] = this.currentPosition

		// 已知向量的移动距离和角度（弧度）
		const distance = Math.sqrt((translateX ** 2) + (translateY ** 2))
		const totalAngle = this.rotatedAngle // 已累计旋转角度
		const angle = Math.PI * (totalAngle / 180) // 弧度表示

		// 向量在 x 轴上的分量
		const xComponent = distance * Math.cos(angle)

		// 向量在 y 轴上的分量
		const yComponent = distance * Math.sin(angle)

		const resultLeft = currentLeft + ((translateX < 0 ? -1 : 1) * xComponent)
		const resultTop = currentTop + ((translateX < 0 ? -1 : 1) * yComponent)

		// 重置样式，使得与最后样式状态一致，并且便于进行下一次动画
		this.polygonCssStyle.left = `${resultLeft}px`
		this.polygonCssStyle.top = `${resultTop}px`
		this.polygonCssStyle.transform = `rotate(${this.rotatedAngle}deg) translateX(0px) translateY(0px)`

		// 记录变更后的位置(left、top)和中心点
		this.currentPosition = [resultLeft, resultTop]
		this.absCenter = [centerX + xComponent, centerY + yComponent]
		this.cssOrigin = [
			this.absCenter[0] - this.currentPosition[0],
			this.absCenter[1] - this.currentPosition[1]
		]
	}

	_handleMoveYEnd(translateY: number) {
		const translateX = 0
		const [centerX, centerY] = this.absCenter
		const [currentLeft, currentTop] = this.currentPosition

		// 已知向量的移动距离和角度（弧度）
		const distance = Math.sqrt((translateX ** 2) + (translateY ** 2))
		const totalAngle = this.rotatedAngle // 已累计旋转角度
		const angle = -1 * Math.PI * (totalAngle / 180) // 弧度表示

		// 向量在 x 轴上的分量
		const xComponent = distance * Math.sin(angle)

		// 向量在 y 轴上的分量
		const yComponent = distance * Math.cos(angle)

		const resultLeft = currentLeft + ((translateY < 0 ? -1 : 1) * xComponent)
		const resultTop = currentTop + ((translateY < 0 ? -1 : 1) * yComponent)

		// 重置样式，使得与最后样式状态一致，并且便于进行下一次动画
		this.polygonCssStyle.left = `${resultLeft}px`
		this.polygonCssStyle.top = `${resultTop}px`
		this.polygonCssStyle.transform = `rotate(${this.rotatedAngle}deg) translateX(0px) translateY(0px)`

		// 记录变更后的位置(left、top)和中心点
		this.currentPosition = [resultLeft, resultTop]
		this.absCenter = [centerX + xComponent, centerY + yComponent]
		this.cssOrigin = [
			this.absCenter[0] - this.currentPosition[0],
			this.absCenter[1] - this.currentPosition[1]
		]
	}

	_translateOnX(translateX: number) {
		this._translateXOnSatJs(translateX)
		this._moveOnSVG(translateX, 0)
		this._handleMoveXEnd(translateX)
		this.checkMouseCollision()
		this.checkPointsCollision()
	}

	_translateOnY(translateY: number) {
		this._translateYOnSatJs(translateY)
		this._moveOnSVG(0, translateY)
		this._handleMoveYEnd(translateY)
		this.checkMouseCollision()
		this.checkPointsCollision()
	}

	_rotate(angleNumer: number) { // to do:绕着某点旋转？
		this.rotatedAngle += angleNumer
		this._rotateAroundCenterOnSatJs(angleNumer)
		this._rotateOnSVG()
		this.checkMouseCollision()
		this.checkPointsCollision()
	}

	move2lr(value: number, callbacks?: ActionCallbacks) {
		callbacks?.start?.()
		const animation = () => {
			let count = 0
			const flag = setInterval(() => {
				count += 1
				if (count <= Math.abs(value)) {
					callbacks?.update?.()
					this._translateOnY(value < 0 ? -1 : 1)
				} else {
					clearInterval(flag)
					callbacks?.end?.()
					this.endAnimation()
				}
			}, 50)
		}

		this.animationQueue.push(animation)
		this.updateAnimation()
	}

	move2fb(value: number, callbacks?: ActionCallbacks) {
		callbacks?.start?.()
		const animation = () => {
			let count = 0
			const flag = setInterval(() => {
				count += 1
				if (count <= Math.abs(value)) {
					callbacks?.update?.()
					this._translateOnX(value < 0 ? -1 : 1)
				} else {
					clearInterval(flag)
					callbacks?.end?.()
					this.endAnimation()
				}
			}, 50)
		}

		this.animationQueue.push(animation)
		this.updateAnimation()
	}

	rotate(value: number, callbacks?: ActionCallbacks) { // to do:绕着某点旋转？
		callbacks?.start?.()
		const animation = () => {
			let count = 0
			const flag = setInterval(() => {
				count += 1
				if (count <= Math.abs(value)) {
					callbacks?.update?.()
					this._rotate(value < 0 ? -1 : 1)
				} else {
					clearInterval(flag)
					callbacks?.end?.()
					this.endAnimation()
				}
			}, 50)
		}

		this.animationQueue.push(animation)
		this.updateAnimation()
	}

	// addAnimation(callback: () => void) {
	// 	const animation = () => {
	// 		let count = 0
	// 		const flag = setInterval(() => {
	// 			count += 1
	// 			if (count <= Math.abs(value)) {
	// 				callback()
	// 			} else {
	// 				clearInterval(flag)
	// 				this.endAnimation()
	// 			}
	// 		}, 10)
	// 	}

	// 	this.animationQueue.push(animation)
	// 	this.updateAnimation()
	// }

	updateAnimation() {
		const flag = setInterval(() => {
			if (this.animationQueue.length > 0 && typeof this.animationQueue[0] === 'function' && this.currentAnimation === null) {
				this.currentAnimation = this.animationQueue[0]
				this.animationQueue[0]()
				clearInterval(flag)
			}
		}, 3)
	}

	endAnimation() {
		this.animationQueue.shift()
		this.currentAnimation = null
	}

	checkPointCollision(point: Point) {
		// 创建圆形对象，代表点
		const [x, y] = point
		const circle = new SAT.Circle(new SAT.Vector(x, y), 0.5)

		// 检测碰撞
		const response = new SAT.Response()
		const isColliding = SAT.testPolygonCircle(this.polygonInstanceOnSatJs, circle, response)
		if (isColliding) {
			this.publishCheckPointCollision(point)
		}

		return isColliding
	}

	checkPointsCollision() {
		this.checkedCollisionPoints.forEach(point => {
			this.checkPointCollision(point)
		})
	}

	checkMouseCollision() {
		const cursor = new Cursor()
		const {x, y} = cursor.mousePosition
		const result = this.checkPointCollision([x, y])
		if (result) {
			this.publishCheckMouseCollision()
		}

		return result
	}

	addCheckPointCollisionListen(entity: Entity, point: Point) {
		this.checkPointCollisionListeners.push({
			receiver: entity,
			point
		})
		this.checkedCollisionPoints.push(point)
	}

	addCheckMouseCollisionListen(entity: Entity) {
		this.checkMouseCollisionListeners.push(entity)
	}

	publishCheckPointCollision(point: Point) {
		const receivers = this.checkPointCollisionListeners
			.filter(item => item.point[0] === point[0] && item.point[1] === point[1])
			.map(item => item.receiver)
		if (receivers.length !== 0) {
			const msg = new EntitiesMsg({
				type: EntitiesMsgTypeEnum.Point_Collision,
				payload: point
			})
			this.msgDispatcher.send(msg, receivers)
		}
	}

	publishCheckMouseCollision() {
		const msg = new EntitiesMsg({
			type: EntitiesMsgTypeEnum.Cursor_Collision,
			payload: {
				polygonEntityId: this.entityId
			}
		})
		this.msgDispatcher.send(msg, this.checkMouseCollisionListeners)
	}

	handleMsg(msg: EntitiesMsgInterface) {
		// console.log(msg)
	}

	destroy() {
		console.log('destory')
	}
}

export {
	type Point,
	type ExtendedPolygonInterface,
	ExtendedPolygon
}
