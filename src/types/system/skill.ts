import type {SystemVersion} from './system'

export enum SkillType {
	action, // 主动 （调查、狙击、监视、窃听、人脸、指纹、定位、星解）
	passive, // 被动 （消息、解锁隐藏信息（解密）、警告、buff类）
	covert // 隐秘 （删除（炸弹）、注毒、救助、移动）
}

export type Skill = {
	id: number;
	type: SkillType;
	name: string;
	description: string;
	icon: string;
	cursor: string;
	actionAlias: string; // 若为action类型
	needVersion: SystemVersion;
	hasOwned: boolean;
}
