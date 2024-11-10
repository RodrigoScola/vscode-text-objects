import { QuerySelector } from '../../commands';
import innerRhs from '../select/innerRhs';

function C(): QuerySelector {
	return innerRhs.C();
}

function cpp(): QuerySelector {
	return innerRhs.cpp();
}
function csharp(): QuerySelector {
	return innerRhs.csharp();
}
function go(): QuerySelector {
	return innerRhs.go();
}
function java(): QuerySelector {
	return innerRhs.java();
}
function javascript(): QuerySelector {
	return innerRhs.javascript();
}

function json(): QuerySelector {
	return innerRhs.json();
}

function lua(): QuerySelector {
	return innerRhs.lua();
}

function python(): QuerySelector {
	return innerRhs.python();
}
function rust(): QuerySelector {
	return innerRhs.rust();
}

function toml(): QuerySelector {
	return innerRhs.toml();
}

function typescript(): QuerySelector {
	return innerRhs.typescript();
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
