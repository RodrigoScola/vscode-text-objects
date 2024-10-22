function a(b: number, c: string) {
	function d() {
		console.log('this');
		function e() {
			console.log('this');
		}
	}
	console.log('this');
}

function b() {
	console.log('');
}

function c() {}

a(3, 'asdfadf');
