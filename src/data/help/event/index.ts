import type {Clue} from '@/types/system/clue'
import {ClueType} from '@/types/system/clue'

const clues: Clue[] = [
	{
		id: 10006,
		type: ClueType.event,
		title: '系统',
		content: '',
		extraContent: '',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 10004,
		type: ClueType.event,
		title: '稳定值',
		content: '',
		extraContent: '',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 10001,
		type: ClueType.event,
		title: '白色元素块',
		content: '使用【增长】组件的能力，在页面里制造的一个白块。能够将位于其上的页面要素“顶起”。',
		extraContent: '再次点击它，可以将其消除❌。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 10002,
		type: ClueType.event,
		title: '灰色元素块',
		content: '分布在页面里的脆弱元素。',
		extraContent: '可以使用【炸弹】组件将其摧毁💥。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 10003,
		type: ClueType.event,
		title: '红色元素块',
		content: '分布在页面里的松动元素。',
		extraContent: '可以使用【】组件对其进行移动 ➡️。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 10005,
		type: ClueType.event,
		title: '恶意程序',
		content: '蒲家的人似乎都有着一种味觉失灵的遗传症，无法感觉到盐的咸味。',
		extraContent: '',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 10006,
		type: ClueType.event,
		title: '鼠标类型',
		content: '蒲家的人似乎都有着一种味觉失灵的遗传症，无法感觉到盐的咸味。',
		extraContent: '',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	}
]

export default clues
