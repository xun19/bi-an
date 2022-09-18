import type {Clue} from '@/types/system/clue'
import {ClueType} from '@/types/system/clue'

const clues: Clue[] = [
	{
		id: 30001,
		type: ClueType.person,
		title: '新人调查员(你)',
		content: '新加入特侦司情报科的调查员。被委任调查玉晶桥镇的一起失踪案件，这也是他接手的第一件案件。',
		extraContent: '你好新人，往后请多多指教咯～',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 30002,
		type: ClueType.person,
		title: '"Q"先生',
		content: '特侦司情报科的一位高级成员，也是调查员（你）的上司。由于情报科的保密性关系，真实身份成谜，只知道他的代号名是"Q"。',
		extraContent: '⚠️我建议...你还是不要继续追查他的身份为好。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 30003,
		type: ClueType.person,
		title: '分析员"M"',
		content: '特侦司情报科的分析员，负责把调查员提交的线索信息进行进一步挖掘，提供更加有深度的“追加分析”。真实身份成谜，只知道代号名是"M"，从其分析报告的语气来看，似乎是位女性。',
		extraContent: '明天下午喝红茶好呢，还是黑咖啡呢......',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 30004,
		type: ClueType.person,
		title: '蒲伊（失踪者）',
		content: '本次案件的失踪者，蒲家的三女，龙陵市明夷高中的高二学生。喜欢研究超自然现象，在校是新闻部的成员。',
		extraContent: '虽然出身于以记载“异史”闻名的蒲氏一族，但是却因弟弟过于优秀，而被夺走了记录（写入文献库）的权力，对此心有不甘，因此以个人身份在博客网上更新着自己的异闻记录。阅读了大量的“异史”。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 30006,
		type: ClueType.person,
		title: '蒲牵（报案者）',
		content: '蒲家的长子,也是失踪者蒲伊的哥哥。这次案件的报案人便是他。龙陵大学种植业毕业生。对“异史”毫无兴趣，热衷于种植业，毕业后在家内庭院里研究种植蒲菜，也研究用蒲草制作更健康自然的编织品。',
		extraContent: '是个不错的帅哥呢......咳咳，蒲菜',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{

		id: 30007,
		type: ClueType.person,
		title: '蒲逊',
		content: '蒲家的三子，龙陵市明夷附属中学的初三学生。沉着冷静，继承了最优良的异史观察和研究天赋，年纪虽轻，却已被家族赋予了能够正式记录异史的权力。',
		extraContent: '这便是所谓的天才么？真是令人羡慕呢～',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false

	},
	{
		id: 30008,
		type: ClueType.person,
		title: '洛织',
		content: '龙陵大学天文系大三的学生。父亲是龙陵地质所的研究员，母亲是龙陵天文研究所驻在玉晶桥镇的天文观测员，因此也自小就居住在玉晶桥镇。',
		extraContent: '冰山美人一枚。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 30009,
		type: ClueType.person,
		title: '兰绮',
		content: '兰氏一族的女儿。与蒲逊、葛帆是同学。这次来到玉晶桥镇，主要是为家族探访当地的矿物香料。',
		extraContent: '好可爱的小妹妹，就连我也是喜欢得不得了呢。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	// {
	// 	id: 30010,
	// 	type: ClueType.person,
	// 	title: '葛帆',
	// 	content: '葛氏一族的成员，与蒲逊、兰绮是同学。炼丹术的天才，年纪轻轻便已深通一族的技艺。来到玉晶石桥镇寻找炼丹原料。',
	// 	extraContent: '⚠️新人，要小心了！这个家伙非常危险。',
	// 	investigationPoint: 0,
	// 	hasOwned: false,
	// 	hasRead: false
	// },
	{
		id: 30010,
		type: ClueType.person,
		title: '邋遢的大叔',
		content: '蒲伊在路上遇到的身穿奇装异服的奇怪男子，疯疯癫癫，已经记不清自己是谁。',
		extraContent: '',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	}
]

export default clues
