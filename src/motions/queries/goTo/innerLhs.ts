import { QuerySelector } from '../../commands';
import innerLhs from '../select/innerLhs';

function C(): QuerySelector {
	return innerLhs.C();
}

function cpp(): QuerySelector {
	return innerLhs.cpp();
}
function csharp(): QuerySelector {
	return innerLhs.csharp();
}
function go(): QuerySelector {
	return innerLhs.go();
}
function java(): QuerySelector {
	return innerLhs.java();
}
function javascript(): QuerySelector {
	return innerLhs.javascript();
}

function json(): QuerySelector {
	return innerLhs.json();
}

function lua(): QuerySelector {
	return innerLhs.lua();
}

function python(): QuerySelector {
	return innerLhs.python();
}
function rust(): QuerySelector {
	return innerLhs.rust();
}

function toml(): QuerySelector {
	return innerLhs.toml();
}

function typescript(): QuerySelector {
	return innerLhs.typescript();
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
