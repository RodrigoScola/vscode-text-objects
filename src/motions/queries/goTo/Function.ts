import { QuerySelector } from '../../commands';
import functions from '../select/Function';

function C(): QuerySelector {
	return functions.C();
}

function cpp(): QuerySelector {
	return functions.cpp();
}
function csharp(): QuerySelector {
	return functions.csharp();
}
function go(): QuerySelector {
	return functions.go();
}
function java(): QuerySelector {
	return functions.java();
}
function javascript(): QuerySelector {
	return functions.javascript();
}
function lua(): QuerySelector {
	return functions.lua();
}

function python(): QuerySelector {
	return functions.python();
}
function rust(): QuerySelector {
	return functions.rust();
}
function typescript(): QuerySelector {
	return functions.typescript();
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
