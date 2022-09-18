import type {Clue} from './clue'

export enum SystemMsgType {
	receive,
	send
}

export enum Annextype {
	clue
}

export type Annex = {
	id: number;
	type: Annextype;
	content: Clue | 'other';
}

export type SystemMsg = {
	id: number;
	type: SystemMsgType;
	title: string;
	content: string;
	author: string;
	date: string;
	hasRead: boolean;
	annexs: Annex[];
}
