import { QuerySelector } from '../../commands';
import lhs from '../select/Lhs';

function C(): QuerySelector {
	return lhs.C();
}

function cpp(): QuerySelector {
	return lhs.cpp();
}
function csharp(): QuerySelector {
	return lhs.csharp();
}
function go(): QuerySelector {
	return lhs.go();
}
function java(): QuerySelector {
	return lhs.java();
}
function javascript(): QuerySelector {
	return lhs.javascript();
}

function json(): QuerySelector {
	return lhs.json();
}

function lua(): QuerySelector {
	return lhs.lua();
}

function python(): QuerySelector {
	return lhs.python();
}
function rust(): QuerySelector {
	return lhs.rust();
}
function toml(): QuerySelector {
	return lhs.toml();
}

function typescript(): QuerySelector {
	return lhs.typescript();
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
