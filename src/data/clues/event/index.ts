import type {Clue} from '@/types/system/clue'
import {ClueType} from '@/types/system/clue'

const clues: Clue[] = [
	{
		id: 10001,
		type: ClueType.event,
		title: '失踪案',
		content: '一名返回故乡的高中生蒲伊失踪了。报案人是她的哥哥蒲牵。',
		extraContent: '根据从警厅收到的消息，目前玉晶桥镇已经累计有十名少女失踪。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 10002,
		type: ClueType.event,
		title: '奇怪的牛雕像',
		content: '长着一只脚的古怪的牛形雕像，有着龙的一些特征。内部似乎有着非常精密的结构。发着嗡嗡怪鸣，向周围弥漫出水气，让蒲伊感到有点恶心。',
		extraContent: '外表看上去是由青铜所制成，纹路很奇特，年代应该十分久远，不知是何人所造。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 10003,
		type: ClueType.event,
		title: '天女',
		content: '镇上流传着出现了"天女"的传闻。蒲伊返乡的主要原因是想要调查这一超自然现象，从而一举成名，并重新获得家族的青睐。',
		extraContent: '',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 10004,
		type: ClueType.event,
		title: '难吃的饭菜',
		content: '蒲伊觉得哥哥做的饭菜酸味不够，难以下口。',
		extraContent: '据说在一些缺盐的地方，有以酸作为替代品的习俗。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 10005,
		type: ClueType.event,
		title: '味觉失灵',
		content: '蒲家的人似乎都有着一种味觉失灵的遗传症，无法感觉到盐的咸味。',
		extraContent: '',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	}
]

export default clues
