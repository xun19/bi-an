import type {SystemVersion} from '@/types/system/system'
import {defineStore} from 'pinia'
import type {SystemMsg} from '@/types/system/message'
import {SystemMsgType} from '@/types/system/message'
import totalMsgList from '@/data/msgs'
import lodash from 'lodash-es'

type State = {
	needReadNum: number;
	systemMsgList: SystemMsg[];
	sendMsgCount: number;
}

export default defineStore('systemMsgStore', {
	state: (): State => ({
		systemMsgList: totalMsgList, // [],
		needReadNum: 0,
		sendMsgCount: 10000 // 10000以上的id用作发送类型的消息id
	}),
	actions: {
		recerveMsg(id: number) {
			const msg = lodash.cloneDeep(totalMsgList.find(msg => msg.id === id))
			if (msg) {
				this.systemMsgList.push(msg)
				this.needReadNum += 1
			}
		},
		sendMsg(msg: SystemMsg) {
			if (msg.type === SystemMsgType.send) {
				this.systemMsgList.push(msg)
			}
		},
		initSendMsgId() {
			this.sendMsgCount += 1
			return this.sendMsgCount
		},
		// updateMsg() {} 应该用不到
		// delMsg() {} 应该用不到
		getMsgDetail(id: number) {
			return this.systemMsgList.find(msg => msg.id === id)
		},
		updateReadStatus(id: number) {
			const msg = this.getMsgDetail(id)
			if (msg) {
				msg.hasRead = true
				this.updateNeedReadNum()
			}
		},
		updateNeedReadNum() {
			const num = this.systemMsgList.filter(msg => !msg.hasRead).length
			this.needReadNum = num
		}
	}
})
