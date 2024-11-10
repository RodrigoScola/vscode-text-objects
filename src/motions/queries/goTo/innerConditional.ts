import { QuerySelector } from '../../commands';
import innerConditional from '../select/innerConditional';

function C(): QuerySelector {
	return innerConditional.C();
}

function cpp(): QuerySelector {
	return innerConditional.cpp();
}
function csharp(): QuerySelector {
	return innerConditional.csharp();
}
function go(): QuerySelector {
	return innerConditional.go();
}
function java(): QuerySelector {
	return innerConditional.java();
}
function javascript(): QuerySelector {
	return innerConditional.javascript();
}
function lua(): QuerySelector {
	return innerConditional.lua();
}

function python(): QuerySelector {
	return innerConditional.python();
}
function rust(): QuerySelector {
	return innerConditional.rust();
}
function typescript(): QuerySelector {
	return innerConditional.typescript();
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
