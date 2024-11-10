import { QuerySelector } from '../../commands';
import strings from '../select/String';

function C(): QuerySelector {
	return strings.C();
}

function cpp(): QuerySelector {
	return strings.cpp();
}
function csharp(): QuerySelector {
	return strings.csharp();
}
function go(): QuerySelector {
	return strings.go();
}
function java(): QuerySelector {
	return strings.java();
}
function javascript(): QuerySelector {
	return strings.javascript();
}

function json(): QuerySelector {
	return strings.json();
}

function lua(): QuerySelector {
	return strings.lua();
}

function python(): QuerySelector {
	return strings.python();
}
function rust(): QuerySelector {
	return strings.rust();
}

function toml(): QuerySelector {
	return strings.toml();
}

function typescript(): QuerySelector {
	return strings.typescript();
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
