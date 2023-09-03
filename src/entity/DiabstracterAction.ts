
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

function action_move2fb(params: SkillParams) { // 移动
	const {
		subject,
		payload,
		hooks
	} = params

	const {
		polygons,
		speed,
		response
	} = subject

	const speedResult = speed * response

	const {
		translate
	} = payload

	if (isFunction(hooks.start)) {
		hooks.start()
	}

	polygons.forEach((polygon, index) => {
		if (index === 0) {
			polygon.move2fb(translate, {
				end() {
					hooks.end()
				}
			})
		} else {
			polygon.move2fb(translate)
		}
	})
}

function action_move2lr(params: SkillParams) { // 移动
	const {
		subject,
		payload,
		hooks
	} = params

	const {
		polygons,
		speed,
		response
	} = subject

	const speedResult = speed * response

	const {
		translate
	} = payload

	if (isFunction(hooks.start)) {
		hooks.start()
	}

	polygons.forEach((polygon, index) => {
		if (index === 0) {
			polygon.move2lr(translate, {
				end() {
					hooks.end()
				}
			})
		} else {
			polygon.move2lr(translate)
		}
	})
}

function action_rotate(params: SkillParams) { // 转向
	const {
		subject,
		payload,
		hooks
	} = params

	const {
		polygons,
		rotateSpeed: speed,
		response
	} = subject

	const angle = payload.angle as number

	const speedResult = speed * response

	if (isFunction(hooks.start)) {
		hooks.start()
	}

	polygons.forEach((polygon, index) => {
		if (index === 0) {
			polygon.rotate(angle, {
				end() {
					subject.currentRotateAngle += angle
					hooks.end()
				}
			})
		} else {
			polygon.rotate(angle)
		}
	})
}

function action_attackPlayer() { //

}

export {
	action_move2fb,
	action_move2lr,
	action_rotate,
	action_attackPlayer
}
