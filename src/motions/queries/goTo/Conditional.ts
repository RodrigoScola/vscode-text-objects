import { QuerySelector } from '../../commands';
import conditionals from '../select/Conditional';

function C(): QuerySelector {
	return conditionals.C();
}

function cpp(): QuerySelector {
	return conditionals.cpp();
}
function csharp(): QuerySelector {
	return conditionals.csharp();
}
function go(): QuerySelector {
	return conditionals.go();
}
function java(): QuerySelector {
	return conditionals.java();
}
function javascript(): QuerySelector {
	return conditionals.javascript();
}
function lua(): QuerySelector {
	return conditionals.lua();
}

function python(): QuerySelector {
	return conditionals.python();
}
function rust(): QuerySelector {
	return conditionals.rust();
}
function typescript(): QuerySelector {
	return conditionals.typescript();
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
