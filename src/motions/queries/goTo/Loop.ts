import { QuerySelector } from '../../commands';
import array from '../select/Loop';

function C(): QuerySelector {
	return array.C();
}

function cpp(): QuerySelector {
	return array.cpp();
}
function csharp(): QuerySelector {
	return array.csharp();
}
function go(): QuerySelector {
	return array.go();
}
function java(): QuerySelector {
	return array.java();
}
function javascript(): QuerySelector {
	return array.javascript();
}
function lua(): QuerySelector {
	return array.lua();
}

function python(): QuerySelector {
	return array.python();
}
function rust(): QuerySelector {
	return array.rust();
}
function typescript(): QuerySelector {
	return array.typescript();
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
