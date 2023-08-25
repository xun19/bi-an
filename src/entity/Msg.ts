import type {Entity} from './Entity'
import {
	EntityTypeEnum,
	EntityManager
} from './Entity'

enum EntitiesMsgTypeEnum {
	Cursor_Moving,
	Cursor_SpeedUpdated,
	aaa,
	bbb
}

type EntitiesMsgInterface = {
	type: EntitiesMsgTypeEnum;
	payload?: any;
	sender: Entity;
}

class EntitiesMsg implements EntitiesMsgInterface {
	type
	payload = {}
	sender

	constructor(params: EntitiesMsgInterface) {
		this.type = params.type
		this.payload = params.payload
		this.sender = params.sender
	}
}

class MsgDispatcher {
	static instance: MsgDispatcher // 单例模式

	constructor() {
		if (!MsgDispatcher.instance) {
			MsgDispatcher.instance = this
		}

		// eslint-disable-next-line no-constructor-return
		return MsgDispatcher.instance
	}

	send(msg: EntitiesMsg, entities: Entity[], payload?: any) {
		entities.forEach(entity => {
			entity.handleMsg(msg)
		})
	}
}

export {
	EntitiesMsgTypeEnum,
	type EntitiesMsgInterface,
	EntitiesMsg,
	MsgDispatcher
}

