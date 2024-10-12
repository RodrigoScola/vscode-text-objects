export function closerToZero(a: number, b: number) {
	if (Math.abs(a) < Math.abs(b)) {
		return a;
	} else if (Math.abs(b) < Math.abs(a)) {
		return b;
	} else {
		return a; // or return b, since they are equally close to zero
	}
}
