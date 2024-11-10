import { QuerySelector } from '../../commands';
import innerLoop from '../select/innerLoop';

function C(): QuerySelector {
	return innerLoop.C();
}

function cpp(): QuerySelector {
	return innerLoop.cpp();
}
function csharp(): QuerySelector {
	return innerLoop.csharp();
}
function go(): QuerySelector {
	return innerLoop.go();
}
function java(): QuerySelector {
	return innerLoop.java();
}
function javascript(): QuerySelector {
	return innerLoop.javascript();
}
function lua(): QuerySelector {
	return innerLoop.lua();
}

function python(): QuerySelector {
	return innerLoop.python();
}
function rust(): QuerySelector {
	return innerLoop.rust();
}
function typescript(): QuerySelector {
	return innerLoop.typescript();
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
