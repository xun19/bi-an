// TODO：尽量把游戏体验放到剧情上（毕竟定位成是文字解密类型），也就是通过文字（配置）来实现。而不要过多去刁钻各种技术
// TODO: Affix挺有意思（虽然不知道实际会这种需求么？更像是娱乐用的）

import type {CluePoint} from './clue'

export type Blog = {
	id: number;
	authorId: number;
	authorName: string;
	title: string;
	date: string; // 里边的世界是存在时间的流动的。不同的时间段会触发发表不同的博客
	content: string; // Html
	images: string[];
	darkValue: number; // 暗化值触发
	like: number;
	unlike: number;
}

export type Eye = Record<string, unknown>

export type Watcher = {
	eyes: Eye[];
}

export type Advertising = { // 应该还是没法模版化。最多只能封装成组件
	images: string[];
}

// 第一个成员被初始化时，后续成员自动+1
// 第一个成员未初始化时，则它自动为0，后续成员自动+1
export enum AccessoryType {
	watcher = 1,
	advertising // 2

}

export type Accessory = {
	id: number;
	type: AccessoryType;
	darkValue: number; // 交互后引发的暗化值（+/-）
	hasInteracted: boolean; // 进度就是与这些组件的交互、以及收集线索
}

export type Level = {
	blog: Blog;
	accessories: Accessory[];
	cluePoints: CluePoint[];
}

