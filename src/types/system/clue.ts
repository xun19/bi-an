// 时间、地点、人物、事件（起因、经过、结果） [某人某时在某地由于某种原因做了某事出现了某种结果]
export enum ClueType {
	event,
	position,
	person,
	discourse,
	fingerprint,
	history,
	others // 窥测到的暗网组织的情报（如监视者）
}

export type Clue = {
	id: number;
	type: ClueType;
	title: string;
	content: string;
	extraContent: string;
	investigationPoint: number;
	hasOwned: boolean; // 已经拥有的提示“已搜寻过该线索”
	hasRead: boolean;
}

export type CluePoint = {
	clues: Clue[];
	position: string;
}
