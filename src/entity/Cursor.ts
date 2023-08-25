
/* eslint-disable @typescript-eslint/naming-convention */

import {EntityTypeEnum, EntityManager} from './Entity'
import type {Entity} from './Entity'

import type {EntitiesMsgInterface} from './Msg'
import {EntitiesMsg, MsgDispatcher, EntitiesMsgTypeEnum} from './Msg'

import {isUndefined} from 'lodash-es'
import searchCursorImg from '@/assets/cursor/search.svg'

// type FightStyle = 'pounce' | 'stealth' | 'stable'
// const FIGHTING_STYLE: FightStyle[] = ['pounce', 'stealth', 'stable']// 模式/风格
enum FIGHTING_STYLE {
	pounce,
	stealth,
	stable
}// 模式/风格

// type CursorOperationType = 'default' | 'click' | 'text' | 'search' | 'attack'
// const CURSOR_OPERATION: CursorOperations = [{
// 	name: 'click',
// 	cssCursorUrl: '/click.png' // import ImgUrl from '@/assets/...'
// }, {
// 	name: 'text',
// 	cssCursorUrl: '/text.png'
// }, {
// 	name: 'search',
// 	cssCursorUrl: searchCursorImg
// }, {
// 	name: 'attack',
// 	alias: 'shoot',
// 	cssCursorUrl: '/attack.png'
// }]
enum CURSOR_OPERATION {
	default,
	click,
	text,
	search,
	attack
}
// 鼠标可进行操作
const CURSOR_IMG_URLS: Record<CURSOR_OPERATION, string> = { // 属性会变化、增加。但是为了方便又实用了对象关键字
	[CURSOR_OPERATION.default]: '',
	[CURSOR_OPERATION.click]: '',
	[CURSOR_OPERATION.text]: '',
	[CURSOR_OPERATION.search]: searchCursorImg,
	[CURSOR_OPERATION.attack]: '' // 攻击还分为多种操作？
}

// 对命名拿不准、害怕有修改，是英文水平问题，其实不是编程方面的问题

class Cursor implements Entity {
	static instance: Cursor // 静态属性 instance

	entityId = 0
	entityType = EntityTypeEnum.Cursor
	EntityManager = new EntityManager()
	MsgDispatcher = new MsgDispatcher()

	CURSOR_IMG_URLS = CURSOR_IMG_URLS
	CURSOR_OPERATION = CURSOR_OPERATION
	currentOperation = CURSOR_OPERATION.default

	FIGHTING_STYLE = FIGHTING_STYLE
	currentFightStyle = FIGHTING_STYLE.stable // 默认风格：平稳
	fightStyleUpdatedTime = 0
	fightStyleUpdatedTimeIntervalFlag = null as any

	isDamaged = false
	isCollision = false
	mousePosition = {
		x: 0,
		y: 0
	}

	computeMouseSpeedIntervalFlag = null as any
	deltaTimeOnComputeMouseSpeed = 100 // 100ms 越小越能迅速检测，也更接近瞬时速度
	computeMouseSpeedTmpRecord = {
		isComputeAgain: true,
		startX: 0,
		startY: 0,
		startTime: 0,
		endX: 0,
		endY: 0,
		endTime: 0
	}

	subscribeMouseMoveEventList: Array<(position: number[]) => void> = []
	subscribeComputingMouseSpeedList: Array<(speed?: number) => void> = []

	constructor() {
		if (!Cursor.instance) {
			// 初始化单例对象
			this._init()
			this._bindMouseMoveEvent()
			this._computeMouseMoveSpeed()
			this._updateCollisionState(false)
			this._updateDamagedState(false)
			Cursor.instance = this
		}

		// 在编写类的构造函数时，通常不需要显式地使用 return 语句来返回实例对象。这是因为在构造函数中，实例对象是隐式地返回的。
		// 即隐式返回 return this
		// eslint-disable-next-line no-constructor-return
		return Cursor.instance
	}

	_init() {
		this.entityId = this.EntityManager.createNewId()
		this.EntityManager.addEntity(this)
	}

	_bindMouseMoveEvent() {
		document.body.addEventListener('mousemove', event => {
			this.mousePosition.x = event.clientX
			this.mousePosition.y = event.clientY

			// 发布订阅
			this._publishMouseEvent([this.mousePosition.x, this.mousePosition.y])

			// 向所有实体广播
			this._broadcastToAllEntitiesMouseMoving([this.mousePosition.x, this.mousePosition.y])
		})
	}

	getMousePosition() {
		return this.mousePosition
	}

	subscribeMouseEvent(callback: (position: number[]) => void) {
		this.subscribeMouseMoveEventList.push(callback)
	}

	_publishMouseEvent(position: number[]) {
		this.subscribeMouseMoveEventList.forEach((callback: (position: number[]) => void) => {
			callback(position)
		})
	}

	_broadcastToAllEntitiesMouseMoving(position: number[]) {
		const entityList = this.EntityManager.getFilteredEntities(item => item.entityId !== this.entityId) // 刨除自己
		const msg = new EntitiesMsg({
			sender: this,
			type: EntitiesMsgTypeEnum.Cursor_Moving,
			payload: position
		})
		this.MsgDispatcher.send(msg, entityList)
	}

	_computeMouseMoveSpeed() {
		this.computeMouseSpeedIntervalFlag = setInterval(() => {
			if (this.computeMouseSpeedTmpRecord.isComputeAgain) {
				this.computeMouseSpeedTmpRecord.startX = this.mousePosition.x
				this.computeMouseSpeedTmpRecord.startY = this.mousePosition.y
				this.computeMouseSpeedTmpRecord.startTime = Date.now()
				this.computeMouseSpeedTmpRecord.isComputeAgain = false
				return
			}

			// 记录鼠标结束位置和时间
			this.computeMouseSpeedTmpRecord.endX = this.mousePosition.x
			this.computeMouseSpeedTmpRecord.endY = this.mousePosition.y
			this.computeMouseSpeedTmpRecord.endTime = Date.now()

			// 计算鼠标的位移距离
			const distanceX = this.computeMouseSpeedTmpRecord.endX - this.computeMouseSpeedTmpRecord.startX
			const distanceY = this.computeMouseSpeedTmpRecord.endY - this.computeMouseSpeedTmpRecord.startY

			// 计算时间间隔
			const deltaTime = (this.computeMouseSpeedTmpRecord.endTime - this.computeMouseSpeedTmpRecord.startTime) / 1000
			// const deltaTime = this.deltaTimeOnComputeMouseSpeed / 1000

			// 计算鼠标的平均移动速度
			const speedX = distanceX / deltaTime
			const speedY = distanceY / deltaTime
			// eslint-disable-next-line no-mixed-operators
			const speed = Math.sqrt(speedX ** 2 + speedY ** 2) // 100以下为低速度 100以上为高速度？

			// console.log('速度:', speed, 'X轴速度:', speedX, 'Y轴速度:', speedY)

			// 发布订阅
			this._publishComputingMouseSpeed(speed)

			// 向所有实体广播
			this._broadcastToAllEntitiesMouseSpeedUpdated(speed)

			// 重置
			this.computeMouseSpeedTmpRecord.isComputeAgain = true
		}, this.deltaTimeOnComputeMouseSpeed)
	}

	_stopComputingMouseMoveSpeed() {
		clearInterval(this.computeMouseSpeedIntervalFlag)
	}

	subscribeComputingMouseSpeed(callback: (speed?: number) => void) {
		this.subscribeComputingMouseSpeedList.push(callback)
	}

	_publishComputingMouseSpeed(speed: number) {
		this.subscribeComputingMouseSpeedList.forEach((callback: (speed: number) => void) => {
			callback(speed)
		})
	}

	_broadcastToAllEntitiesMouseSpeedUpdated(speed: number) {
		const entityList = this.EntityManager.getFilteredEntities(item => item.entityId !== this.entityId) // 刨除自己
		const msg = new EntitiesMsg({
			sender: this,
			type: EntitiesMsgTypeEnum.Cursor_SpeedUpdated,
			payload: speed
		})
		this.MsgDispatcher.send(msg, entityList)
	}

	_changeFightStyle(style: FIGHTING_STYLE) {
		this.currentFightStyle = style
		this._handleFightStyleUpdated()
	}

	_handleFightStyleUpdated() { // 与动作切换逻辑重合？风格与动作的关系
		// 公共逻辑
		this._updateCursorCss({
			operation: this.currentOperation
		})

		if (this.currentFightStyle === this.FIGHTING_STYLE.pounce) {
			console.log(1)
		} else if (this.currentFightStyle === this.FIGHTING_STYLE.stealth) {
			this._handleStealthStyle()
		} else {
			console.log(1)
		}
	}

	_startStyleUpdatedTime(callback: (time: number, stop: () => void) => void) { // 简化命名？FightStyle -> Style
		if (this.fightStyleUpdatedTimeIntervalFlag === null) {
			console.error('fightStyleUpdatedTime 已在被计时了')
			return
		}

		const LIMIT_TIME = 20000 // 设置一个超时上限
		const stop = () => {
			clearInterval(this.fightStyleUpdatedTimeIntervalFlag)
			this.fightStyleUpdatedTime = 0
		}

		this.fightStyleUpdatedTimeIntervalFlag = setInterval(() => {
			this.fightStyleUpdatedTime += 1
			callback(this.fightStyleUpdatedTime, stop)

			this.fightStyleUpdatedTime += 1

			if (this.fightStyleUpdatedTime >= LIMIT_TIME) {
				stop()
			}
		}, 100)
	}

	_changeOperationType(operation: CURSOR_OPERATION) {
		this.currentOperation = operation
		this._handleOperationTypeUpdated()
	}

	_handleOperationTypeUpdated() {
		// 公共逻辑
		this._updateCursorCss({
			operation: this.currentOperation
		})

		// 动作分别处理
		if (this.currentOperation === this.CURSOR_OPERATION.click) {
			console.log(1)
		} else if (this.currentOperation === this.CURSOR_OPERATION.attack) {
			console.log(1)
		} else {
			console.log(1)
		}
	}

	_handleStealthStyle() {
		this._startStyleUpdatedTime((t, stop) => {
			if (t >= 3000) {
				stop()
				this._setCursorOpacity(0.5)
			}
		})
	}

	_updateCollisionState(state: boolean) {
		this.isCollision = state
	}

	_updateDamagedState(state: boolean) {
		this.isDamaged = state
		if (state) {
			this._playDamagedAnimation()
		}
	}

	_playDamagedAnimation() {
		console.log()
	}

	_updateCursorCss(params: {operation: CURSOR_OPERATION; opacity?: number}) {
		const {operation, opacity} = params
		document.body.style.cursor = this._computeCSSCursorVal({
			operation,
			opacity: isUndefined(opacity) && (!isUndefined(opacity) && opacity > 1)
				? 1 : opacity
		})
	}

	_computeCSSCursorVal(params: {operation: CURSOR_OPERATION; opacity?: number}) {
		return `url(${this.CURSOR_IMG_URLS[params.operation]}) 16 16,auto` // 责任外抛
	}

	_setCursorOpacity(value: number) { // cursor属性本身并不支持设置透明度
		this._updateCursorCss({
			operation: this.currentOperation,
			opacity: value
		})
	}

	handleMsg(msg: EntitiesMsgInterface) {
		// console.log(msg)
	}

	destroy() {
		console.log('destory')
	}
}

export default Cursor
