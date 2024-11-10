import { QuerySelector } from '../../commands';
import rhs from '../select/Rhs';

function C(): QuerySelector {
	return rhs.C();
}

function cpp(): QuerySelector {
	return rhs.cpp();
}
function csharp(): QuerySelector {
	return rhs.csharp();
}
function go(): QuerySelector {
	return rhs.go();
}
function java(): QuerySelector {
	return rhs.java();
}
function javascript(): QuerySelector {
	return rhs.javascript();
}

function json(): QuerySelector {
	return rhs.json();
}

function lua(): QuerySelector {
	return rhs.lua();
}

function python(): QuerySelector {
	return rhs.python();
}
function rust(): QuerySelector {
	return rhs.rust();
}

function toml(): QuerySelector {
	return rhs.toml();
}

function typescript(): QuerySelector {
	return rhs.typescript();
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
