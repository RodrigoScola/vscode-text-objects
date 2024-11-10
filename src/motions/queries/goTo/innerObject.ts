import { QuerySelector } from '../../commands';
import innerObject from '../select/Array';

function C(): QuerySelector {
	return innerObject.C();
}

function cpp(): QuerySelector {
	return innerObject.cpp();
}
function csharp(): QuerySelector {
	return innerObject.csharp();
}
function go(): QuerySelector {
	return innerObject.go();
}
function java(): QuerySelector {
	return innerObject.java();
}
function javascript(): QuerySelector {
	return innerObject.javascript();
}

function json(): QuerySelector {
	return innerObject.json();
}

function lua(): QuerySelector {
	return innerObject.lua();
}

function python(): QuerySelector {
	return innerObject.python();
}
function rust(): QuerySelector {
	return innerObject.rust();
}

function toml(): QuerySelector {
	return innerObject.toml();
}

function typescript(): QuerySelector {
	return innerObject.typescript();
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
