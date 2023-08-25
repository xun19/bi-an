import type {EntitiesMsgInterface} from './Msg'

enum EntityTypeEnum {
	Cursor,
	Diabstracter
}

type Entity = {
	entityId: number;
	entityType: EntityTypeEnum;
	handleMsg: (msg: EntitiesMsgInterface) => void;
	destroy: () => void;
}

class EntityManager {
	static instance: EntityManager
	entityList: Entity[] = []
	constructor() {
		if (!EntityManager.instance) {
			EntityManager.instance = this
		}

		// eslint-disable-next-line no-constructor-return
		return EntityManager.instance
	}

	createNewId() {
		return Math.ceil(Math.random() * 100000000)
	}

	addEntity(entity: Entity) {
		if (!(this.entityList.find(item => item.entityId === entity.entityId))) {
			this.entityList.push(entity)
		}
	}

	queryEntity(entityId: number) {
		return this.entityList.find(item => item.entityId === entityId)
	}

	getAllEntities() {
		return this.entityList
	}

	getFilteredEntities(fn: (item: Entity) => boolean) {
		return this.entityList.filter(fn)
	}

	removeEntity(entity: Entity) {
		const index = this.entityList.findIndex(item => item.entityId === entity.entityId)
		this.entityList.splice(index, 1)
		entity.destroy()
	}
}

export {
	type Entity,
	EntityTypeEnum,
	EntityManager
}
