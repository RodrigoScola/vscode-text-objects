import { QuerySelector } from '../../commands';
import innerArrays from '../select/innerArray';

function C(): QuerySelector {
	return innerArrays.C();
}

function cpp(): QuerySelector {
	return innerArrays.cpp();
}
function csharp(): QuerySelector {
	return innerArrays.csharp();
}
function go(): QuerySelector {
	return innerArrays.go();
}
function java(): QuerySelector {
	return innerArrays.java();
}
function javascript(): QuerySelector {
	return innerArrays.javascript();
}

function json(): QuerySelector {
	return innerArrays.json();
}

function lua(): QuerySelector {
	return innerArrays.lua();
}

function python(): QuerySelector {
	return innerArrays.python();
}
function rust(): QuerySelector {
	return innerArrays.rust();
}

function toml(): QuerySelector {
	return innerArrays.toml();
}

function typescript(): QuerySelector {
	return innerArrays.typescript();
}

export default {
	C,
	cpp,
	csharp,
	go,
	java,
	javascript,
	json,
	toml,
	lua,
	python,
	rust,
	typescript,
};
