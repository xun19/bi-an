const createNumber = (amount: number) => new Array(amount)
	.fill(null)
	.map(() => Math.ceil(Math.random() * 10) - 1)

type Behaver = {
	name: string;
	innerSpeed: number;
	outterSpeed: number;
	greed: number;
	attack: number;
}

type Virus = {
	id: any;
	name: any;
	type: any;
	behaver: Behaver;
}

export {
	createNumber
}
