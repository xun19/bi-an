import {SystemMsgType} from '@/types/system/message'
import type {SystemMsg} from '@/types/system/message'

const totalMsgList: SystemMsg[] = [
	{
		id: 1,
		type: SystemMsgType.receive,
		title: '你好，新人',
		content: '111',
		author: '"Q"先生',
		date: '2022-9-15',
		hasRead: false,
		annexs: []
	},
	{
		id: 2,
		type: SystemMsgType.receive,
		title: '你好呀，新人～',
		content: '111',
		author: '分析员"M"',
		date: '2022-9-15',
		hasRead: false,
		annexs: []
	}
]

export default totalMsgList
