import { QuerySelector } from '../../commands';
import innerFunction from '../select/Function';

function C(): QuerySelector {
	return innerFunction.C();
}

function cpp(): QuerySelector {
	return innerFunction.cpp();
}
function csharp(): QuerySelector {
	return innerFunction.csharp();
}
function go(): QuerySelector {
	return innerFunction.go();
}
function java(): QuerySelector {
	return innerFunction.java();
}
function javascript(): QuerySelector {
	return innerFunction.javascript();
}
function lua(): QuerySelector {
	return innerFunction.lua();
}

function python(): QuerySelector {
	return innerFunction.python();
}
function rust(): QuerySelector {
	return innerFunction.rust();
}
function typescript(): QuerySelector {
	return innerFunction.typescript();
}

export default {
	C,
	cpp,
	csharp,
	go,
	java,
	javascript,
	lua,
	python,
	rust,
	typescript,
};
