/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/naming-convention */

import type {
	DiabstracterInterface} from './Diabstracter'
import {
	EmotionalStateEnum
} from './Diabstracter'

import Cursor from './Cursor'

import {
	action_discoverPlayer,
	action_checkCollision,
	action_move,
	action_rotate,
	action_attackPlayer
} from './DiabstracterAction'

type State = {
	enter: (target: DiabstracterInterface) => void;

	update: (target: DiabstracterInterface) => void;

	exit: (target: DiabstracterInterface) => void;
}

class State_Initial implements State {
	enter(target: DiabstracterInterface) {}

	update(target: DiabstracterInterface) {}

	exit(target: DiabstracterInterface) {}
}

let a = 0
class State_SearchPlayer implements State {
	enter(target: DiabstracterInterface) {
		console.log('State_SearchPlayer')
		target._updateEmotionalState(EmotionalStateEnum.searching)
	}

	update(target: DiabstracterInterface) {
		const cursor = new Cursor()
		const {x: playerX, y: playerY} = cursor.mousePosition
		const [selfX, selfY] = target.center
		const distance = Math.sqrt(((selfX - playerX) ** 2) + ((selfY - playerY) ** 2))
		// console.log(distance, target.viewRange)
		if (distance <= target.viewRange) {
			// 发现玩家
			target.changeState(new State_DiscoverPlayer())
		} else {
			// 继续搜寻
			const {speed, response} = target
			// if (a >= 1) {
			// 	return
			// }

			action_rotate({
				subject: target,
				payload: {
					isCheckCollision: true,
					targetPosition: [playerX, playerY],
					angle: ceateRandomMovingRotate(target),
					direction: 'normal'
				},
				hooks: {
					end() {
						a++

						// console.log('action_rotate end')
						action_move({
							subject: target,
							payload: {
								isCheckCollision: true,
								targetPosition: [playerX, playerY],
								translate: {
									x: ceateRandomMovingPath().x, // 如何设定盲目状态下的移动范围？
									y: ceateRandomMovingPath().y // 设计一个得到随机路径的方法
								}
							},
							hooks: {
								end() {
									// console.log('action_move end')
									target.currentTargetPosition = [selfX + 100, selfY + 0]
									target.changeState(new State_SearchPlayer())
								}
							}
						})
					}
				}
			})
		}
	}

	exit(target: DiabstracterInterface) {}
}

class State_DiscoverPlayer implements State {
	enter(target: DiabstracterInterface) {
		console.log('State_DiscoverPlayer')
		target._updateEmotionalState(EmotionalStateEnum.watchfulness)
	}

	update(target: DiabstracterInterface) {
		// action_discoverPlayer({
		// 	subject: target,
		// 	hooks: {
		// 		update(position) {
		const cursor = new Cursor()
		const {x: playerX, y: playerY} = cursor.mousePosition
		// 将玩家位置作为自己的行动目的地
		target.currentTargetPosition = [playerX, playerY]
		const [selfX, selfY] = target.center
		const distance = Math.sqrt(((selfX - playerX) ** 2) + ((selfY - playerY) ** 2))
		const translate = {x: distance, y: 0}
		const angle = createRotateToPAangle([selfX, selfY], [playerX, playerY]) - target.currentRotateAngle

		if (distance > target.viewRange) {
			// 丢失玩家视野
			target.changeState(new State_LosePlayerPosition())
			return
		}

		action_rotate({
			subject: target,
			payload: {
				isCheckCollision: true,
				targetPosition: [playerX, playerY],
				angle,
				direction: 'normal'
			},
			hooks: {
				end() {
					action_move({
						subject: target,
						payload: {
							isCheckCollision: true,
							targetPosition: [playerX, playerY],
							translate
						},
						hooks: {
							end() {
								target.changeState(new State_DiscoverPlayer()) // 重复发现玩家的状态行为，直到丢失玩家视野
							}
						}
					})
				}
			}
		})
		// 		}
		// 	}
		// })
	}

	exit(target: DiabstracterInterface) {}
}

class State_LosePlayerPosition implements State {
	enter(target: DiabstracterInterface) {
		console.log('State_LosePlayerPosition')
		target._updateEmotionalState(EmotionalStateEnum.doubt)
	}

	update(target: DiabstracterInterface) {
		target.currentTargetPosition = [-999999, -999999] // 设置一个临界值表示丢失玩家视野

		// 发呆一会儿
		setTimeout(() => {
			// 再次搜寻
			target.changeState(new State_SearchPlayer())
		}, 3000)
	}

	exit(target: DiabstracterInterface) {}
}

// class State_Move implements State {
// 	enter(target: DiabstracterInterface) {
// 		console.log('1')
// 	}

// 	update(target: DiabstracterInterface) {
// 		console.log('2')
// 	}

// 	exit(target: DiabstracterInterface) {
// 		console.log('3')
// 	}
// }

function ceateRandomMovingRotate(target: any) {
	const flag = target.currentRotateAngle >= 90
		? -1
		: target.currentRotateAngle <= 0 ? 1
			: Math.random() >= 0.5
				? 1
				: -1

	const angle = Math.ceil(Math.random() * 90)
	return flag * angle
}

function createRotateToPAangle(point1: [number, number], point2: [number, number]) {
	// 获取两个点的坐标
	const [x1, y1] = point1
	const [x2, y2] = point2

	// 计算两个点之间的水平和垂直距离
	const deltaX = x2 - x1
	const deltaY = y2 - y1
	// 计算连线与垂直线之间的角度（弧度）
	const angleRad = Math.atan2(deltaY, deltaX)

	// 将弧度转换为角度
	let angleDeg = angleRad * (180 / Math.PI)

	// 角度范围调整为0到360度
	if (angleDeg < 0) {
		angleDeg += 360
	}

	return angleDeg
}

function ceateRandomMovingPath() {
	const x = Math.ceil(Math.random() * 300)
	return {
		x,
		y: 0
	}
}

// 玩家负面状态：可以从cursor的能力入手，进行增加改，就形成了新的状态效果

export {
	type State,
	State_Initial,
	State_SearchPlayer,
	State_DiscoverPlayer,
	State_LosePlayerPosition
	// State_Move
}

