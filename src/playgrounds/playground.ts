export function a(b: number, c: string) {
	console.log(b);
	function d() {
		console.log(b);
		function e() {
			console.log(c);
		}
	}
	console.log('this');
}

export const d = function () {};

function b() {
	console.log('');
}

function c() {}

a(3, 'asdfadf');

export class M {
	private thign = 34;
	things = 4;
	static other = 4;
	#o = 4;
}
