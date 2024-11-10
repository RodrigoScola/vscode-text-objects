import { QuerySelector } from '../../commands';
import innerClass from '../select/innerClass';

function C(): QuerySelector {
	return innerClass.C();
}

function cpp(): QuerySelector {
	return innerClass.cpp();
}
function csharp(): QuerySelector {
	return innerClass.csharp();
}
function go(): QuerySelector {
	return innerClass.go();
}
function java(): QuerySelector {
	return innerClass.java();
}
function javascript(): QuerySelector {
	return innerClass.javascript();
}

function python(): QuerySelector {
	return innerClass.python();
}
function rust(): QuerySelector {
	return innerClass.rust();
}

function typescript(): QuerySelector {
	return innerClass.typescript();
}

export default {
	C,
	cpp,
	csharp,
	go,
	java,
	javascript,
	python,
	rust,
	typescript,
};
