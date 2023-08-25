/* eslint-disable @typescript-eslint/naming-convention */

import * as SAT from 'sat'

import {
	type State,
	State_Initial,
	State_SearchPlayer,
	State_DiscoverPlayer,
	State_LosePlayerPosition
	// State_Move
} from './DiabstracterState'

import {EntityTypeEnum, EntityManager} from './Entity'
import type {Entity} from './Entity'

import type {EntitiesMsg, EntitiesMsgInterface} from './Msg'
import {MsgDispatcher} from './Msg'

enum EmotionalStateEnum {
	calm, // 平静。也是初始状态
	patrol, // 巡逻/游走(无目的)
	searching, // 搜寻（有目的）
	watchfulness, // 警觉
	doubt // 疑惑
}

type PartsPolygonPoints = number[]
type PartsSATPolygon = SAT.Polygon

type OccupancyArea = {
	width: number;
	height: number;
}

type DiabstracterInitalParams = {
	HP: number;
	HP_TOTAL: number;

	ATK: number;
	ATK_TOTAL: number;

	DEF: number;
	DEF_TOTAL: number;

	coreCount: number;
	coreTotal: number;

	speed: number; // to do：速度的方向与x、y不一致，那大小也会有偏差
	rotateSpeed: number;
	response: number;

	center: [number, number];
	occupancyArea: { // 也是表示其实体的svg的宽高？
		width: number;
		height: number;
	};
}

type DiabstracterInterface = {
	viewRange: number;

	emotionalState: EmotionalStateEnum;

	currentPosition: [number, number]; // left, top // 貌似用不上了？
	currentRotateAngle: number;

	currentTargetPosition: [number, number]; // 运动目标

	// 以多边形点来表示其实体轮廓（即模型）
	svg: SVGSVGElement;
	partsPolygonPointsList: PartsPolygonPoints[]; // 其实没啥用，后面这些数值不会变更
	partsSATPolygons: PartsSATPolygon[]; // 要取到变化后的坐标，还是得从polygon对象这里取，它们的坐标是同步更新的
	svgEleIds: string[]; // svg内部各部件多边形元素的id

	currentState: State_Initial;

	startState: () => void;

	changeState: (state: State) => void;

	_initBasicInfo: (params: DiabstracterInitalParams) => void;
	_initPosition: (params: DiabstracterInitalParams) => void;

	_defineOccupancyArea: (params: OccupancyArea) => void;
	_updateOccupancyArea: (params: OccupancyArea) => void;

	_setEntitySVG: () => void;
	_addPartsPolygon: (partsPolygonPoints: PartsPolygonPoints) => void;
	_createPartsSATPolygon: (partsPolygonPoints: PartsPolygonPoints) => void;
	_createPartsSVGPath: (partsPolygonPoints: PartsPolygonPoints) => void;

	_updateEmotionalState: (state: EmotionalStateEnum) => void;
	_createEmotionalStateLabel: () => void;
	_updateEmotionalStateLabel: (state: EmotionalStateEnum) => void;
} & Entity & DiabstracterInitalParams

class Diabstracter implements DiabstracterInterface {
	entityId = 0
	entityType = EntityTypeEnum.Diabstracter
	EntityManager = new EntityManager()
	MsgDispatcher = new MsgDispatcher()

	HP = 1
	HP_TOTAL = 1

	ATK = 1 // 当前攻击力
	ATK_TOTAL = 1 // 攻击力上限

	DEF = 1 // 当前防御力
	DEF_TOTAL = 1 // 防御力上限

	coreCount = 1
	coreTotal = 1

	emotionalState = EmotionalStateEnum.calm

	speed = 0
	rotateSpeed = 0
	response = 0 // 反应力系数。会对行动的时间进行延长（大于1）或者缩短（小于1）。默认为1（正常水平，无延长、缩短）

	viewRange = 400 // 视野范围

	center = [0, 0] as [number, number] // 指的是其中心点
	occupancyArea = {
		width: 0,
		height: 0
	}

	// 耐力
	// 存活状态

	currentTargetPosition = [0, 0] as [number, number]
	currentPosition = [0, 0] as [number, number]
	currentRotateAngle = 0

	svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
	partsPolygonPointsList: PartsPolygonPoints[] = []
	partsSATPolygons: PartsSATPolygon[] = []
	svgEleIds: string[] = []

	currentState = new State_Initial()

	constructor(params: DiabstracterInitalParams) {
		this._initBasicInfo(params)
		this._initPosition(params)
		this._setEntitySVG()
		this._createEmotionalStateLabel()
	}

	_initBasicInfo(params: DiabstracterInitalParams) {
		this.entityId = this.EntityManager.createNewId()
		this.EntityManager.addEntity(this)

		this.HP = params.HP
		this.HP_TOTAL = params.HP_TOTAL
		this.ATK = params.ATK
		this.ATK_TOTAL = params.ATK_TOTAL
		this.DEF = params.DEF
		this.DEF_TOTAL = params.DEF_TOTAL

		this.coreCount = params.coreCount
		this.coreTotal = params.coreTotal

		this.speed = params.speed
		this.rotateSpeed = params.rotateSpeed
		this.response = params.response
	}

	_initPosition(params: DiabstracterInitalParams) {
		this.center = params.center
		this.occupancyArea.width = params.occupancyArea.width
		this.occupancyArea.height = params.occupancyArea.height
	}

	_defineOccupancyArea(params: OccupancyArea) {
		this.occupancyArea.width = params.width
		this.occupancyArea.height = params.height
	}

	_updateOccupancyArea(params: OccupancyArea) {
		this.occupancyArea.width = params.width
		this.occupancyArea.height = params.height
	}

	_setEntitySVG() {
		this.svg.setAttribute('id', `EntitySvg-${this.entityId}`)
		this.svg.setAttribute('width', String(this.occupancyArea.width))
		this.svg.setAttribute('height', String(this.occupancyArea.height))
		this.svg.style.position = 'absolute'
		this.svg.style.left = '0px'
		this.svg.style.top = '0px'
		// 将 SVG 元素添加到文档中
		document.body.appendChild(this.svg)
	}

	_addPartsPolygon(partsPolygon: PartsPolygonPoints) {
		this.partsPolygonPointsList.push(partsPolygon)
		this._createPartsSVGPath(partsPolygon)
	}

	_createPartsSATPolygon(partsPolygon: PartsPolygonPoints) {
		console.log(partsPolygon)
	}

	_createPartsSVGPath(partsPolygon: PartsPolygonPoints) {
		// 创建多边形元素
		const id = 'svgPolygonEleId'
		const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
		const points = partsPolygon.join(' ')
		// polygon.setAttribute('id', id)
		this.svg.setAttribute('id', id)
		polygon.setAttribute('points', points)
		polygon.setAttribute('fill', '#f1f1f1')

		// 将多边形元素添加到 SVG 元素中
		this.svg.appendChild(polygon)

		this.svgEleIds.push(`#${id}`)
		this.partsSATPolygons.push(new SAT.Polygon(new SAT.Vector(0, 0), [[0, 0], [0, 100], [100, 100], [100, 0]].map(([x, y]) => new SAT.Vector(x, y))))
	}

	_updateEmotionalState(state: EmotionalStateEnum) {
		this.emotionalState = state
		this._updateEmotionalStateLabel(state)
	}

	_createEmotionalStateLabel() {
		// const polygonElement = document.querySelector(this.svgEleIds[0])
		// const textElement = document.createElement('text')
		// textElement.textContent = 'Hello, World!' // 设置文本内容
		// textElement.setAttribute('x', '50') // 设置 x 坐标
		// textElement.setAttribute('y', '50') // 设置 y 坐标
		// if (polygonElement) {
		// 	polygonElement.innerHTML = ''
		// 	polygonElement.appendChild(textElement)
		// }
		console.log('_createEmotionalStateLabel()')
	}

	_updateEmotionalStateLabel(state: EmotionalStateEnum) {
		let text = ''
		if (state === EmotionalStateEnum.calm) {
			text = '~'
		}// 平静。也是初始状态

		if (state === EmotionalStateEnum.patrol) {
			text = '&@'
		}// 巡逻/游走(无目的)

		if (state === EmotionalStateEnum.searching) {
			text = '...'
		}// 搜寻（有目的）

		if (state === EmotionalStateEnum.watchfulness) {
			text = '!'
		}// 警觉

		if (state === EmotionalStateEnum.doubt) {
			text = '?'
		}// 疑惑

		const polygonElement = document.querySelector(this.svgEleIds[0])
		const textElement = document.createElement('p')
		textElement.innerHTML = text // 设置文本内容
		// textElement.setAttribute('x', '50') // 设置 x 坐标
		// textElement.setAttribute('y', '50') // 设置 y 坐标
		// if (polygonElement) {
		// polygonElement.innerHTML = ''
		// document.body.prepend(textElement)
		// }
	}

	startState() { // 状态执行函数
		this.changeState(new State_SearchPlayer())
	}

	changeState(state: State) {
		this.currentState.exit(this)
		this.currentState = state
		this.currentState.enter(this)
		this.currentState.update(this)
	}

	handleMsg(msg: EntitiesMsgInterface) {
		// console.log(msg)
	}

	destroy() {
		console.log('destory')
	}
}

export {
	EmotionalStateEnum,
	type DiabstracterInterface,
	Diabstracter,
	type PartsSATPolygon
}
