import { QuerySelector } from '../../commands';
import innerString from '../select/innerString';

function C(): QuerySelector {
	return innerString.C();
}

function cpp(): QuerySelector {
	return innerString.cpp();
}
function csharp(): QuerySelector {
	return innerString.csharp();
}
function go(): QuerySelector {
	return innerString.go();
}
function java(): QuerySelector {
	return innerString.java();
}
function javascript(): QuerySelector {
	return innerString.javascript();
}

function json(): QuerySelector {
	return innerString.json();
}

function lua(): QuerySelector {
	return innerString.lua();
}

function python(): QuerySelector {
	return innerString.python();
}
function rust(): QuerySelector {
	return innerString.rust();
}

function toml(): QuerySelector {
	return innerString.toml();
}

function typescript(): QuerySelector {
	return innerString.typescript();
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
