import { QuerySelector } from '../../commands';
import innerParams from '../select/innerParams';

function C(): QuerySelector {
	return innerParams.C();
}

function cpp(): QuerySelector {
	return innerParams.cpp();
}
function csharp(): QuerySelector {
	return innerParams.csharp();
}
function go(): QuerySelector {
	return innerParams.go();
}
function java(): QuerySelector {
	return innerParams.java();
}
function javascript(): QuerySelector {
	return innerParams.javascript();
}

function lua(): QuerySelector {
	return innerParams.lua();
}

function python(): QuerySelector {
	return innerParams.python();
}
function rust(): QuerySelector {
	return innerParams.rust();
}

function typescript(): QuerySelector {
	return innerParams.typescript();
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
