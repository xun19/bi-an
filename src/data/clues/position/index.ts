import type {Clue} from '@/types/system/clue'
import {ClueType} from '@/types/system/clue'

const clues: Clue[] = [
	{
		id: 20001,
		type: ClueType.position,
		title: '玉晶桥镇',
		content: '位于龙陵东南的小镇，由位于中央的玉乡、以及周围环形地带的晶桥乡构成。原本是独立的两个乡，大概一百年前，“玉”、“晶桥”两乡被归并为一镇，合为“玉晶桥镇”，镇制被沿用至今。',
		extraContent: '两乡地形都十分奇特，玉乡的中心是一个圆形大湖，晶桥乡则是围绕着大湖的环形山脉。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 20002,
		type: ClueType.position,
		title: '晶桥乡',
		content: '玉晶桥镇的两个乡之一，自古矿产丰富、冶炼业发达。据说这些矿物是上古时期地形剧变带来的结果。',
		extraContent: '“晶桥”之名自古流传至今，但渊源已无可说清。据最早的地方志说法，“晶”指的便是矿产，大概也暗指当地矿业发达。至于“桥”之说，则毫无头绪，因为当地从未出现过能显眼到能充当地名的大桥的记录，如若存在，那大概是一座“无形之桥”。另，晶桥除了明面上是一座矿业之乡，但暗地里它还为方士们提供了炼丹术的大量原料，甚至某位古代有名的大诗人也曾造访过此地。如果多加留意，可从其诗中发现与矿物、炼丹相关的不少蛛丝马迹，所以有人据此猜测，那位诗人还有着炼丹术士兼原料商人的另一重身份。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 20003,
		type: ClueType.position,
		title: '玉乡',
		content: '玉晶桥镇的两个乡之一，自古玉料丰富、玉产业发达。与别处的玉不同，此处的玉并非出于山中或地下，而是产自乡中央的大湖，因此也有“水玉”之称。据说这是上古时期地形剧变带来的结果。',
		extraContent: '“玉乡”之名大抵来源于此地多产玉，与其外环的“晶桥乡”多产矿相对。自古以来这里的玉就为人们所喜好，视为极品，后甚至成为皇家的贡品。但是也有坊间传闻，这些玉料到了皇家并未被制成装饰佩戴，而是用作食用，因此也有“玉食”之说。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 20004,
		type: ClueType.position,
		title: '玉湖',
		content: '位于玉乡中心的圆形大湖，占据了整个乡的大部分面积。湖内出产玉，故名“玉湖”。',
		extraContent: '以湖为中心散布着诸多古老的新石器时代上古文明遗迹，以出土了大量的玉制品而闻名于世，反映了当地先民对玉的执念般的热爱。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 20005,
		type: ClueType.position,
		title: '洛织的家',
		content: '位于小镇的一座小山丘上，从这里可以眺望整个玉湖，是个绝佳的观景台。',
		extraContent: '除此之外，还是一处不错的天文观测点。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 20006,
		type: ClueType.position,
		title: '晶桥？星桥？',
		content: '由“晶”、“星”本为一字这一点可知，“晶桥”的意思其实就是“星桥”。',
		extraContent: '所谓“星桥”，在古代指的便是星星之间的连线，也暗指星星之间的联系。不过，这背后也许还另有一层深意。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 20007,
		type: ClueType.position,
		title: '小镇地标.天车塔',
		content: '是一种古人矗立在盐井井口的“A字形”塔式木制井架，高耸入云，由几百根圆杉木连结，竹篾绳捆扎而成巨大的支架，竖于井口，悬挂天辊（滑轮）提取井下的卤水。非常显眼壮观，可谓是小镇的地标性建筑。',
		extraContent: '也说明了玉晶桥镇是个产盐的地方。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 20008,
		type: ClueType.position,
		title: '废弃瞭望台',
		content: '位于南部山丘上的一座瞭望台，已被废弃。曾是玉晶桥镇附近最高的建筑。',
		extraContent: '那里多年来早已无人问津，不知道目前的情况是如何。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	}
]

export default clues
