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

function b() {
	console.log('');
}

function c() {}

a(3, 'asdfadf');

export class M {}