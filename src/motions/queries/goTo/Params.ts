import { QuerySelector } from '../../commands';
import params from '../select/Params';

function C(): QuerySelector {
	return params.C();
}

function cpp(): QuerySelector {
	return params.cpp();
}
function csharp(): QuerySelector {
	return params.csharp();
}
function go(): QuerySelector {
	return params.go();
}
function java(): QuerySelector {
	return params.java();
}
function javascript(): QuerySelector {
	return params.javascript();
}

function lua(): QuerySelector {
	return params.lua();
}

function python(): QuerySelector {
	return params.python();
}
function rust(): QuerySelector {
	return params.rust();
}

function typescript(): QuerySelector {
	return params.typescript();
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
