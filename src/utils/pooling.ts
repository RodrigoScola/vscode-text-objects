export class NodePool<T> {
	private nodes: T[];
	private createFunc: () => T;
	constructor(createFunc: () => T) {
		this.nodes = [];
		this.createFunc = createFunc;
	}
	get(): T {
		const node = this.nodes.pop();

		if (!node) {
			return this.createFunc();
		}
		return node;
	}
	retrieve(point: T) {
		this.nodes.push(point);
	}
}
