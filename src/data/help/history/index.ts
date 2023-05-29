import type {Clue} from '@/types/system/clue'
import {ClueType} from '@/types/system/clue'

const clues: Clue[] = [
	{
		id: 60001,
		type: ClueType.history,
		title: '玉',
		content: '有些圆润感和光泽的珍贵矿物，常被认为蕴含超自然的神秘力量，自古为人们所崇拜。先民们常认为，玉并不是单纯的石头死物，而是一种拥有生命力的活物。',
		extraContent: '古人对玉有着诸多猜想，一说玉是神的使者，代表着神明及帝王，能够增进神与人之间的交流，传达上天的信息和意志，是天地宇宙和人间祸福的主宰。一说玉是九天的精华所成。一说玉具有能使人长寿的功能，通过佩玉、食玉等方式可以实现永驻青春。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 60002,
		type: ClueType.history,
		title: '炼丹术',
		content: '古代追求抵达“仙人”之境、获得永恒的神秘技术。分为依靠物理手段的“外丹术”，以及依靠精神修炼的“内丹术”。',
		extraContent: '外丹术是依靠炼成实体丹药服用，从而成“仙”的方法。这对平日为琐事所扰乱心绪、无暇进行精神训练的帝王们来说，是再合适不过的捷径。其所需的原料无所不包，矿物、动植物甚至人体分泌物都包含在内，但是据说其中一种最有效的原料之一，是“玉乡”所产的珍玉。这种食用非凡之物的行为，大概是对“仙人”的模仿吧？毕竟，超人的生命形态，必定会有着非人的生存方式。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 60003,
		type: ClueType.history,
		title: '羽人',
		content: '也被称为天人，传说中身长羽毛或披羽毛外衣能飞翔的人。最早出现在《山海经》，称羽民。一说来自天外，一说由人修化而成。',
		extraContent: '亦是“仙人”形象的起源，先民把修炼成“仙”称之为“羽化”。据说“仙人”不需要依靠任何食物便可存活，且永生不死。古代文献中有着诸多有关“仙人”以及其美妙国度的记载，那种永恒且完美的境界不仅为文人们所倾慕，甚至历代帝王也不禁耗费诸多心思去追求。但人类化为“仙人”后，终究会踏入非人之道。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 60004,
		type: ClueType.history,
		title: '羽衣',
		content: '古人认为是神仙所著之衣，据说是其用于飞天之物，如同鸟之羽翼，故称之为羽衣。也有说穿上之后可化为飞鸟而升天。亦被称为天衣。',
		extraContent: '这种神秘装束的构成材料未知，但古人多认为是用非人间之物所制成。据说此种装束严丝紧密，如磐石般牢固永恒，故古籍中有“天衣无缝”之记载。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 60100,
		type: ClueType.history,
		title: '超大型暴雨',
		content: '根据地质学考究，在上古时代，玉晶桥镇地区曾降下一场大雨，引发了滔天洪水。',
		extraContent: '据说，位于此地的原初文明因此而毁灭。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 60101,
		type: ClueType.history,
		title: '陨石坑',
		content: '根据洛父的地质研究推断，上古时期曾有陨石降临玉晶桥镇。',
		extraContent: '综合线索来看，这颗陨石的撞击形成了天坑和环形山。后来又有一场超大型暴雨将天坑填满了水，形成了如今的玉湖。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 60102,
		type: ClueType.history,
		title: '夔牛',
		content: '一说如牛，一脚。一说如龙，一脚。大抵是种似牛似龙的生物。',
		extraContent: '据说夔牛可以呼唤来狂风暴雨。据记载：蚩尤一族铜头铁额，以石为食，飞空走险无所不能。黄帝以夔牛皮为鼓，九击而阻止，蚩尤族不能飞走，遂杀之。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	}
]

export default clues
