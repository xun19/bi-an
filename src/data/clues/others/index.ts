import type {Clue} from '@/types/system/clue'
import {ClueType} from '@/types/system/clue'

const clues: Clue[] = [
	{
		id: 70001,
		type: ClueType.others,
		title: '特侦司',
		content: '全称是“特别侦查司”。是龙陵市警厅为了侦查非人引发的事件而设立的特别部门。龙陵是被各种怪异笼罩的重灵地，因此自古就有应对这类事件的机关，即使到了现代也不例外。作为警方应对怪异的战力，特侦司的成员都不是泛泛之辈。情报科、一科都是隶属于其下的部门。',
		extraContent: '⚠️权限受限，无法进一步分析',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 70002,
		type: ClueType.others,
		title: '异闻博客网',
		content: '一家以超自然博文吸引用户的网站，在圈子范围内似乎有着不小的名气。',
		extraContent: '总感觉他们背后隐藏着一些不可告人的秘密？',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 70003,
		type: ClueType.others,
		title: '异史',
		content: '指的是与明面历史不同的文献记录，也即所谓被隐秘的历史。',
		extraContent: '',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 70004,
		type: ClueType.others,
		title: '星星',
		content: '星星指的是肉眼可见的宇宙中的天体。对这些天体的研究对人类生活有很大的实际意义，古代天文学家通过观测星星，能够确定时间、方向、历法，甚至记录事件。',
		extraContent: '向你补充一个冷知识——表示星星的字其实本来是“晶”，甲骨文“晶”用三个圆形表示天上发光的星体。后来因为“晶”被借作“形容光亮”（如“晶莹”）、“结晶”和水晶矿物用，于是另造了一个“星”字用来表示星星。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 70005,
		type: ClueType.others,
		title: '天关客星',
		content: '古代星名。所谓“客星”，是中国古代对新星和超新星的称谓。在北宋年间，此星突然出现在天空中，散发出异常强烈的光芒。史书中的描述是这样的：这颗突然出现的“客星”，“昼见如太白，芒角四出，色赤白”（它的亮度很高，在白天也能看见它；它像金星一样，光芒四射，星光呈红白色）。这样的星象持续了23天，后来它的亮度渐渐降低，将近2年后才逝去。',
		extraContent: '这颗星因为在夜空中过于耀眼，因此当时的绝大多数人都注意到了这个异象，想必应该留下了不少与之有关的记录吧。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 70006,
		type: ClueType.others,
		title: '北极星',
		content: '北极星，又称北辰、紫微星，是最靠近北天极的一颗星。位于地轴的北端，在北斗七星中的天璇与天枢连线的五倍延长线上。因地球的自转，而北极星又处于天球转动的轴上，所以相对其它恒星静止不动。',
		extraContent: '北极星是古代商旅、航海、野外活动辨认方向的一个重要航标，由于北极星最靠近正北的方位，千百年以来人们都是靠着它的星光来导航的。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 70007,
		type: ClueType.others,
		title: '分野',
		content: '分野，指将天上星空区域与地上的国、州互相对应。我国古代的天文学说，把天象中十二星辰的位置与人间社会的地分野结合在一起。这种理论，就天文学来说，被称为分星；就地理来说，则被称为分野。',
		extraContent: '可以这么简单理解——天上的星星与地上的各处是存在关系的，地上的某处必然有着天上的某星与之对应。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	// {
	// 	id: 70008,
	// 	type: ClueType.others,
	// 	title: '启明',
	// 	content: '分野，指将天上星空区域与地上的国、州互相对应。我国古代的天文学说，把天象中十二星辰的位置与人间社会的地分野结合在一起。这种理论，就天文学来说，被称为分星；就地理来说，则被称为分野。',
	// 	extraContent: '可以这么简单理解——天上的星星与地上的各处是存在关系的，地上的某处必然有着天上的某星与之对应。',
	// 	investigationPoint: 0,
	// 	hasOwned: false,
	// 	hasRead: false
	// },
	// {
	// 	id: 70009,
	// 	type: ClueType.others,
	// 	title: '大火',
	// 	content: '分野，指将天上星空区域与地上的国、州互相对应。我国古代的天文学说，把天象中十二星辰的位置与人间社会的地分野结合在一起。这种理论，就天文学来说，被称为分星；就地理来说，则被称为分野。',
	// 	extraContent: '可以这么简单理解——天上的星星与地上的各处是存在关系的，地上的某处必然有着天上的某星与之对应。',
	// 	investigationPoint: 0,
	// 	hasOwned: false,
	// 	hasRead: false
	// },
	{
		id: 70010,
		type: ClueType.others,
		title: '星期',
		content: '现在常用来指连续七天排列的周而复始的作息日期。但在古代，它原指农历七月七,即牛郎星与织女星相会之日。后亦指男女成婚之日。',
		extraContent: '可以这么简单理解——天上的星星与地上的各处是存在关系的，地上的某处必然有着天上的某星与之对应。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	{
		id: 70011,
		type: ClueType.others,
		title: '七曜',
		content: '指日、月、火、水、木、金、土七星。',
		extraContent: '这七星存在着顺序，其排列并不能随意颠倒。',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
	},
	// 星解：名字、颜色、事件、方位、时间、顺序、星宿、古籍、数量
	{
		id: 70012,
		type: ClueType.others,
		title: '步天歌',
		content: '《步天歌》为一部以诗歌形式介绍古代全天星官的著作，据说为隋朝一位不知姓名的，号曰丹元子的隐者所著。最初作为皇家垄断的技术，只在宫廷钦天监和观象台中口传，不向民间公开，并被用于占星。',
		extraContent: '',
		investigationPoint: 0,
		hasOwned: false,
		hasRead: false
		// 牛：六星近在河岸头，头上虽然有两角，腹下从来欠一脚。牛下九黑是天田，田下三三九坎连，牛上直建三河鼓，鼓上三星号织女。
		// 女：四星如箕主嫁娶，十二诸侯在下陈，
		// 先从越国向东论，东西两周次二秦。雍州南下双雁门，代国向西一晋伸，韩魏各一晋北轮，楚之一国魏西屯，楚城南畔独燕军，燕西一郡是齐邻，齐北两邑平原君，欲知郑在越下存
		// 斗：天籥柄前八黄精，狗国四方鸡下生，天渊十星鳖东边，更有两狗斗魁前，农家丈人斗下眠，天渊十黄狗色玄
		// 天市宫：河中河间晋郑周，秦连巴蜀细搜求，十一星属十一国，梁楚韩邦在尽头。魏赵九河与中山，齐越吴徐东海间，燕连南海尽属宋，请君熟记有何难
		// 井：四渎横列南河里，南河下头是军市，军市团圆十三星，中有一个野鸡精。孙子丈人市下列，各立两星从东说，阙丘两个南河东，邱下一狼光蓬茸。左畔九个弯弧弓，一矢拟射顽狼胸，有个老人南极中，春秋出入寿无穷。
	}	// 女宿十二国：https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.doubanio.com%2Fview%2Fnote%2Fl%2Fpublic%2Fp45006082.jpg&refer=http%3A%2F%2Fimg2.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666017751&t=10650449d008bef06bab76c54829ef46
	// 十二国分别为越、赵、周、齐、郑、楚、秦、魏、燕、代、韩、晋。除赵、周、秦、代各有二星外，其余只得一星
]

export default clues
