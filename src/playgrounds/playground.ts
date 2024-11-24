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

let g = {
	db: 3,
};

g = {
	db: 5,
};

function b() {
	console.log('');
}

function c() {}

a(3, 'asdfadf');

export class M {
	public static asopidfj = 34;
}

interface S {
	asdf: string;
	sdf: string;
}

type Sa = {
	asdf: string;
};
enum SB {
	asdf = 'asdf',
}

type FGJ<T> = {
	dfj: T;
};
