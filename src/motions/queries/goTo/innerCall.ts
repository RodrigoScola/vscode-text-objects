import { QuerySelector } from '../../commands';
import innercall from '../select/innerCall';

function C(): QuerySelector {
	return innercall.C();
}

function cpp(): QuerySelector {
	return innercall.cpp();
}
function csharp(): QuerySelector {
	return innercall.csharp();
}
function go(): QuerySelector {
	return innercall.go();
}
function java(): QuerySelector {
	return innercall.java();
}
function javascript(): QuerySelector {
	return innercall.javascript();
}

function lua(): QuerySelector {
	return innercall.lua();
}

function python(): QuerySelector {
	return innercall.python();
}
function rust(): QuerySelector {
	return innercall.rust();
}

function typescript(): QuerySelector {
	return innercall.typescript();
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
